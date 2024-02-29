from django.db import models
from django.contrib.auth.models import User
import datetime
# Create your models here.

class Comment(models.Model):
    author = models.ForeignKey(to=User, on_delete=models.CASCADE, default=User, null=False)
    property_id = models.PositiveIntegerField(default = 0, null=False, blank=False)
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    rating = models.PositiveIntegerField(default=3, null=False, blank=False)

class CommentForUser(models.Model):
    author = models.ForeignKey(to=User, on_delete=models.CASCADE,)
    recipient = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    rating = models.PositiveIntegerField(default=3, null=False, blank=False)
    
    
    
