# checks the username and password against the database:
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from core.auth import get_token_for_user
from rest_framework.response import Response
class AuthViewSet(ViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @action(methods=['post', 'get'], detail=False)
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