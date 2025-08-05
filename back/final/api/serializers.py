from rest_framework.serializers import ModelSerializer
from api.models import Comment, Post, PostUserLikes, Tag, UserProfile
from django.core.validators import RegexValidator
from rest_framework import serializers 
from django.contrib.auth.models import User
from rest_framework.fields import HiddenField, SerializerMethodField
from core.auth import CurrentProfileDefault, CurrentUserDefault 

class UserSerializer(ModelSerializer):
    password=serializers.CharField(
    write_only=True,
    validators=[RegexValidator(regex=r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$',
    message='Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.')])
    

    class Meta:

        model = User

        fields =['id', 'username', 'email', 'password']
        

    def create(self, validated_data):
        
        user = User.objects.create_user(**validated_data)

        return user

    def update(self, instance, validated_data):
      
        password = validated_data.pop('password', None)

        
        for key, value in validated_data.items():
            setattr(instance, key, value)

        if password:

            instance.set_password(password)

        instance.save()

        return instance



class CommentSerializer(ModelSerializer):
    # take the author from the jwt:
    author = HiddenField(default = CurrentProfileDefault())

    # add the author_id to the json:
    author_id = SerializerMethodField('get_author_id')
    author_username = SerializerMethodField('get_author_username')
    class Meta:
        model = Comment
        fields = "__all__"
    
    # a helper method that returns the id of the author:
    def get_author_id(self, obj):
        return obj.author.id
        # fields = ['text', 'id']
    def get_author_username(self, obj):
        return obj.author.user.username if obj.author and obj.author.user else None

class UserProfileSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    user_id = SerializerMethodField('get_user_id')
    
    def get_user_id(self, obj):
        return obj.user.id

    class Meta:
        model = UserProfile
        fields = "__all__"

class PostSerializer(ModelSerializer):
    author = HiddenField(default = CurrentProfileDefault())
    author_id = SerializerMethodField('get_author_id')
    author_username = SerializerMethodField('get_author_username')
    comments = CommentSerializer(many=True, read_only=True)
    tags=  SerializerMethodField()

    def get_author_id(self, obj):
        return obj.author.id
     
    def get_author_username(self, obj):
        return obj.author.user.username if obj.author and obj.author.user else None
    def get_tags(self, obj):
        return [tag.name for tag in obj.tags.all()]
    class Meta:
        model = Post
        fields = "__all__"

class TagSerializer(ModelSerializer):

    class Meta:

        model = Tag

        fields = "__all__"


class PostUserLikesSerializer(ModelSerializer):
    user = HiddenField(default=CurrentProfileDefault())
    user_id = SerializerMethodField('get_user_id')
    # a helper method that returns the id of the user:

    def get_user_id(self, obj):
        return obj.user.id

    class Meta:
        model = PostUserLikes
        fields = "__all__"