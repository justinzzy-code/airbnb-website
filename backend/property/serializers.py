from rest_framework import serializers
import property.models
from rest_framework.serializers import ModelSerializer, CharField, DateTimeField, IntegerField



def required(value):
    if value is None:
        raise serializers.ValidationError('This field is required')
    
class PropertyCreateSerializer(ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    image = serializers.ImageField(required=False)
    class Meta:
        model = property.models.Property
        fields =    ["name", "location", "description", "number_of_guests", "number_of_beds", "area", "avaliability", "image", "owner"]


class UserPropertyListSerializer(ModelSerializer):
    class Meta:
        model = property.models.Property
        fields =    ['id',"name", "location", "description", "number_of_guests", "number_of_beds", "area", "avaliability", "image", "avaliable_to_reserve", "owner"]


class PropertyUpdateSerializer(ModelSerializer):

    class Meta:
        model = property.models.Property
        fields =    ["name", "location", "description", "number_of_guests", "number_of_beds", "area", "avaliability", "avaliable_to_reserve"]


class PropertyDeleteSerializer(ModelSerializer):
    
    class Meta:
        model = property.models.Property
        fields =    ["name", "location", "description", "number_of_guests", "number_of_beds", "area", "avaliability", "owner"]


class AllPropertyListSerializer(ModelSerializer):
    class Meta:
        model = property.models.Property
        fields =    ['id', "name", "location", "description", "number_of_guests", "number_of_beds", "area", "avaliability", "avaliable_to_reserve", "image", "owner"]


class UserPropertyAvaliableToReserveSerializer(ModelSerializer): #Property you want to rent out
    class Meta:
        model = property.models.Property
        fields =    ['id', "name","avaliable_to_reserve", "owner", "location", "number_of_guests", "number_of_beds"]



class GetAllReservationsList(ModelSerializer):
    class Meta:
        model = property.models.Property
        fields =    ['id', "name", "location", "description", "number_of_guests", "number_of_beds", "area", "avaliability", "avaliable_to_reserve", "image", "owner"]


class CreateReservationRequest(ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    start_date = DateTimeField(validators=[required])
    end_date = DateTimeField(validators=[required])
    property_id = IntegerField(validators=[required])
    
    class Meta:
        model = property.models.ReservationRequest
        fields =    ['start_date', 'end_date', 'property_id', 'user']


class UserReservationListSerializer(ModelSerializer): #Property you want to rent out
    class Meta:
        model = property.models.ReservationRequest
        fields =    ['id','start_date', 'end_date', 'property_id', 'status']


class UserReservationDeleteSerializer(ModelSerializer):
    class Meta:
        model = property.models.ReservationRequest
        fields =    ['start_date', 'end_date', 'property_id', 'status', 'user']

class HostViewReservationRequestsSerializer(ModelSerializer):
    class Meta:
        model = property.models.ReservationRequest
        fields =   ['id', 'start_date', 'end_date', 'property_id', 'status', 'user']

class HostReservationUpdateSerializer(ModelSerializer):
    class Meta:
        model = property.models.ReservationRequest
        fields =   ['status']


class AllImageSeralizer(ModelSerializer):
    class Meta:
        model = property.models.AllImage
        fields = ['property_id', 'image']

# class AllImageCreateSeralizer(ModelSerializer):
#     class Meta:
#         model = property.models.AllImage
#         fields = ['property_id']