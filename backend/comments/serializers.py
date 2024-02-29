from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, CharField, DateTimeField, IntegerField
from comments.models import Comment, CommentForUser

class CommentSerializer(ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Comment
        fields = ['author', 'property_id', 'name', 'title', 'date', 'content', 'rating',]

class AllCommentListSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'author', 'property_id', 'name', 'title', 'date', 'content', 'rating',]


class CommentUpdateSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ['title','date', 'content', 'rating',]


class CommentDeleteSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ['author','title','date', 'content',]


class CommentListSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields =  ['id', 'author', 'property_id', 'name', 'title', 'date', 'content', 'rating',]







class CommentForUserSerializer(ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = CommentForUser
        fields = ['author', 'recipient', 'name', 'title', 'date', 'content', 'rating',]

class AllCommentForUserListSerializer(ModelSerializer):
    class Meta:
        model = CommentForUser
        fields = ['id', 'author', 'recipient', 'name', 'title', 'date', 'content', 'rating',]


class CommentForUserUpdateSerializer(ModelSerializer):
    class Meta:
        model = CommentForUser
        fields = ['title','date', 'content', 'rating',]


class CommentForUserDeleteSerializer(ModelSerializer):
    class Meta:
        model = CommentForUser
        fields = ['author','title','date', 'content',]


class UserCommentListSerializer(ModelSerializer):
    class Meta:
        model = CommentForUser
        fields =  ['id', 'author', 'recipient', 'name', 'title', 'date', 'content', 'rating',]