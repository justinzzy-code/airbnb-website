from rest_framework import serializers
import notifications.models
from rest_framework.serializers import ModelSerializer, CharField, DateTimeField, IntegerField


def required(value):
    if value is None:
        raise serializers.ValidationError('This field is required')
    
class NotificationCreateSerializer(ModelSerializer):
    class Meta:
        model = notifications.models.Notifications
        fields =    ["description", "type", "owner"]

class NotificationListSerializer(ModelSerializer):
    class Meta:
        model = notifications.models.Notifications
        fields =    ["id", "description", "type", "owner"]


class NotificationDeleteSerializer(ModelSerializer):
    class Meta:
        model = notifications.models.Notifications
        fields =    ["id", "description", "type", "owner"]

