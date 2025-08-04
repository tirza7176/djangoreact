
from rest_framework.response import Response
from core.auth import get_token_for_user
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User
from api.permissions import CommentOwnerOrReadOnly
from .serializers import (UserSerializer, PostSerializer,
                           UserProfileSerializer, CommentSerializer,
                           TagSerializer, PostUserLikesSerializer)

from .models import Tag, UserProfile, Post, Comment, PostUserLikes

from rest_framework.permissions import IsAdminUser,IsAuthenticatedOrReadOnly

from .permissions import (CommentOwnerOrReadOnly, PostsPermission, IsAdmin,
                          TagsPermission, UserLikesPermission, UserProfilePermission)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]


class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [TagsPermission]


class PostUserLikesViewSet(ModelViewSet):
    queryset = PostUserLikes.objects.all()
    serializer_class = PostUserLikesSerializer
    permission_classes = [UserLikesPermission]


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [PostsPermission]

    @action(detail=True, methods=['get', 'post'], url_path='comments', permission_classes=[IsAuthenticatedOrReadOnly])
    def comments(self, request, pk=None):
        post = self.get_object()

        if request.method == 'GET':
            comments = post.comments.all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)

        elif request.method == 'POST':
            data = request.data.copy()
            data['post'] = post.id
            serializer = CommentSerializer(data=data, context={'request': request})
            if serializer.is_valid():
                serializer.save(author=request.user.userprofile)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [UserProfilePermission]


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,CommentOwnerOrReadOnly]
  

   
# checks the username and password against the database:


class AuthViewSet(ViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


    @action(methods=['post'], detail=False, permission_classes=[AllowAny])
    def register(self, request):
        serializer = UserSerializer(data=request.data)
        # validation by our rules in UserSerializer and in User:
        # example check that password has at least 8 characters
        serializer.is_valid(raise_exception=True)

        user = serializer.save()  # calls the create method
        jwt = get_token_for_user(user)

        # יוצר פרופיל למשתמש אוטומטית בעת ההרשמה
        UserProfile.objects.get_or_create(user = user)
        return Response({'message': 'Registered successfully', 'user':serializer.data, **jwt},201)



    def list(self, request):
        return Response({
            'login': 'http://127.0.0.1:8000/api/auth/login',
            'register': 'http://127.0.0.1:8000/api/auth/register',
        })
    
    @action(methods=['post'], detail=False, permission_classes=[AllowAny])
    def login(self, request):

        # create the serializer object
        serializer = AuthTokenSerializer(
            data=request.data, context={'request': request}
        )

        # if password!=password -> throw
        serializer.is_valid(raise_exception=True)  # 401

        # get the user from the serializer:
        user = serializer.validated_data['user']

        jwt = get_token_for_user(user)

        return Response(jwt)