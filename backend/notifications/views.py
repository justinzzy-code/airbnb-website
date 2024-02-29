from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.exceptions import NotFound
# Create your views here.
from rest_framework.response import Response
from rest_framework import serializers, permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView, DestroyAPIView, ListCreateAPIView, RetrieveDestroyAPIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from notifications.models import *
from notifications.serializers import *
from rest_framework import filters
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import get_user
from rest_framework.fields import empty
from .pagination import CustomPagination
from rest_framework.authentication import TokenAuthentication, BasicAuthentication, SessionAuthentication


class NotifcationCreate(ListCreateAPIView): 
    serializer_class = NotificationCreateSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    pagination_class = CustomPagination

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    
    def get_queryset(self):
        return notifications.models.Notifications.objects.filter(owner=self.request.user.id)
    
class ViewHostNotification(ListAPIView): 
    serializer_class = NotificationListSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    def get_queryset(self):
        return notifications.models.Notifications.objects.filter(owner=self.request.user.id, type='HOST')

class ViewGuestNotification(ListAPIView): 
    serializer_class = NotificationListSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    def get_queryset(self):
        return notifications.models.Notifications.objects.filter(owner=self.request.user.id, type='GUEST')

class NotificationDelete(RetrieveDestroyAPIView):
    serializer_class = NotificationDeleteSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        user_id = self.request.user.id
        try:
            all = notifications.models.Notifications.objects.get(id=self.kwargs['id'])
        except:
            raise NotFound('ERROR: NOT FOUND')
        
        if all:
            if user_id != all.owner.id:
                raise NotFound("ERROR: PERMISSION DENIED")
            return all
        else:
            raise NotFound('ERROR: NOT FOUND')
        

class ViewAllNotifications(ListAPIView): 
    serializer_class = NotificationListSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    def get_queryset(self):
        return notifications.models.Notifications.objects.filter(owner=self.request.user.id)


