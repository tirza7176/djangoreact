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
    class Meta:
        model = Comment
        fields = "__all__"
    
    # a helper method that returns the id of the author:
    def get_author_id(self, obj):
        return obj.author.id
        # fields = ['text', 'id']

class UserProfileSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    user_id = SerializerMethodField('get_user_id')
    # a helper method that returns the id of the user:

    def get_user_id(self, obj):
        return obj.user.id

    class Meta:
        model = UserProfile
        fields = "__all__"

class PostSerializer(ModelSerializer):
    author = HiddenField(default = CurrentProfileDefault())
    author_id = SerializerMethodField('get_author_id')
   
    def get_author_id(self, obj):
        return obj.author.id
    
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