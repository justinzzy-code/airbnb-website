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
from property.models import *
from property.serializers import *
from rest_framework import filters
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import get_user
from rest_framework.fields import empty
from .pagination import CustomPagination
from rest_framework.authentication import TokenAuthentication, BasicAuthentication, SessionAuthentication
from notifications.models import *
from notifications.serializers import *
import json
import datetime 

class CheckPropertyExist(APIView, permissions.BasePermission):
    message = 'Property does not exist for user'

    def has_permission(self, request, view):
        all = property.models.Property.objects.filter(owner=request.user.id)
        if all:
            return True
        else:
            return False


class PropertyGetDetails(RetrieveAPIView): #Shows Details of a single property
    serializer_class = AllPropertyListSerializer

    def get_object(self):
        return get_object_or_404(Property, id=self.kwargs['id'])


class UserPropertyList(ListAPIView): #Shows OWNED PROPERTIES BY USER
    serializer_class = UserPropertyListSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['id', "name", "location", "number_of_guests", "number_of_beds", "area", "avaliability"]
    ordering_fields = ["number_of_guests", "number_of_beds"]
    def get_queryset(self):
        return property.models.Property.objects.filter(owner=self.request.user.id)


class AllPropertyFilterView(ListAPIView): #Display every property created
    queryset = Property.objects.all()
    pagination_class = CustomPagination
    serializer_class = AllPropertyListSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['id', "name", "location", "number_of_guests", "number_of_beds", "area", "avaliability"]
    ordering_fields = ["number_of_guests", "number_of_beds"]

     
class PropertyCreate(ListCreateAPIView): #CREATE PROPERTY
    serializer_class = PropertyCreateSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    pagination_class = CustomPagination

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    
    def get_queryset(self):
        return property.models.Property.objects.filter(owner=self.request.user.id)


class PropertyUpdate(RetrieveUpdateAPIView):
    serializer_class = PropertyUpdateSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, CheckPropertyExist]

    def get_object(self):
        user_id = self.request.user.id
        try:
            all = property.models.Property.objects.get(id=self.kwargs['id'])
        except:
            raise NotFound('ERROR: NOT FOUND')
        
        if all:
            if user_id != all.owner.id:
                raise NotFound("ERROR: PERMISSION DENIED")
            return all
        else:
            raise NotFound('ERROR: NOT FOUND')


class PropertyDelete(RetrieveDestroyAPIView):
    serializer_class = PropertyDeleteSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, CheckPropertyExist]
    
    def get_object(self):
        user_id = self.request.user.id
        try:
            all = property.models.Property.objects.get(id=self.kwargs['id'])
        except:
            raise NotFound('ERROR: NOT FOUND')
        
        if all:
            if user_id != all.owner.id:
                raise NotFound("ERROR: PERMISSION DENIED")
            return all
        else:
            raise NotFound('ERROR: NOT FOUND')
       

class UserPropertyAvaliableToReserve(ListAPIView): #Get property rented out to others by user
    serializer_class = UserPropertyAvaliableToReserveSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["name", "location", "number_of_guests", "number_of_beds"]
    ordering_fields = ["number_of_guests", "number_of_beds"]

    def get_queryset(self):
        rented_houses = property.models.Property.objects.filter(owner=self.request.user.id, avaliable_to_reserve=True)
        if not rented_houses:
            raise NotFound('ERROR: YOU DID NOT RENT OUT ANY PROPERTY')
        return rented_houses


class GetAllReservations(ListAPIView): #GET ALL PROPERTYS THAT ARE AVALIABLE TO RENT
    queryset = property.models.Property.objects.filter(avaliable_to_reserve=True)
    serializer_class = GetAllReservationsList
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["name", "location", "number_of_guests", "number_of_beds", "area", "avaliability"]
    ordering_fields = ["number_of_guests", "number_of_beds", "avaliability"]

    def get_serializer(self, instance=None, data=empty, many=False, partial=False):
        return super(GetAllReservations, self).get_serializer(instance=instance, data=data, many=True, partial=partial)


class ReservationCreate(ListCreateAPIView): #CREATE a reservation request
    serializer_class = CreateReservationRequest
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    pagination_class = CustomPagination
    
    def create(self, request, *args, **kwargs):

        request.data._mutable = True
        try:
            propid = request.data['property_id']
            start_date = request.data['start_date']
            end_date = request.data['end_date']

            requested_reservation  = property.models.Property.objects.get(avaliable_to_reserve=True, id = propid) #property_id = id of property
            if not requested_reservation:
                return Response('ERROR : Property is unavailable to reserved.')
            try:
                prop_end_date = requested_reservation.avaliability.strftime('%Y-%m-%dT%H:%M:%SZ')
                if prop_end_date > end_date:
                    return Response('ERROR : Property is not avaliable.')
            except Exception as e:
                print('datetime', e)

            current_list_of_reservations = property.models.ReservationRequest.objects.filter(user=self.request.user.id)
            id_list = [reservation.property_id for reservation in current_list_of_reservations]
        
            if int(propid) in id_list:
                already_reserved = property.models.ReservationRequest.objects.get(property_id = propid)
                if already_reserved.status == "CANCELLED":
                    owner_of_reservationrequested = property.models.Property.objects.get(id=propid).owner
                    string = "New reservation request for Property: " + str(propid)
                    notifications.models.Notifications.objects.create(owner = owner_of_reservationrequested,type = 'HOST', description =string)
                    return super().create(request, *args, **kwargs)
                else:
                    return Response('ERROR : You have already reserved this property')
        except:
            return Response('EXCEPT ERROR : Property is unavailable to be reserved')

        owner_of_reservationrequested = property.models.Property.objects.get(id=propid).owner
        string = "New reservation request for Property: " + str(propid)
        notifications.models.Notifications.objects.create(owner = owner_of_reservationrequested,type = 'HOST', description =string)

        return super().create(request, *args, **kwargs)
    
    def get_queryset(self):
        return property.models.ReservationRequest.objects.filter(user=self.request.user.id)
    
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    
class UserReservationsList(ListAPIView): #List of users's reservation requests 
    serializer_class = UserReservationListSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['start_date', 'end_date', 'property_id', 'status', ]

    def get_queryset(self):
        return property.models.ReservationRequest.objects.filter(user=self.request.user.id)

class UserReservationsDelete(RetrieveDestroyAPIView):
    serializer_class = UserReservationDeleteSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    
    def get_object(self):
        user_id = self.request.user.id
        try:
            all = property.models.ReservationRequest.objects.get(property_id=self.kwargs['propertyid'],user=self.request.user.id)
        except:
            raise NotFound('ERROR: NOT FOUND')
        if all:
            if user_id != all.user.id:
                raise NotFound("ERROR: PERMISSION DENIED")

            return all
        else:
            raise NotFound('ERROR: NOT FOUND')
        
    def delete(self, request, *args, **kwargs):
        #User cancells their reservation. Owner of reservation receives a notification.

        owner_of_property = property.models.Property.objects.get(id=self.kwargs['propertyid']).owner
        string = "Reservation has been deleted for Property "+str(self.kwargs['propertyid'])
        notifications.models.Notifications.objects.create(owner = owner_of_property, type = 'HOST', description =string)
        return super().delete(request, *args, **kwargs)


class HostViewReservationRequests(ListAPIView): #Get property rented out to others by user
    serializer_class = HostViewReservationRequestsSerializer
    pagination_class = CustomPagination
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'start_date', 'end_date', 'property_id', 'status', 'user']

    def get_queryset(self):
        rented_houses = property.models.Property.objects.filter(owner=self.request.user.id, avaliable_to_reserve=True)
        if not rented_houses:
            raise NotFound('ERROR: YOU DID NOT RENT OUT ANY PROPERTY')
        
        rented_houses_ids = [house.id for house in rented_houses]
        reservation_requests = property.models.ReservationRequest.objects.filter(property_id__in = rented_houses_ids)
        return reservation_requests
    

class HostUpdateReservationStatus(RetrieveUpdateAPIView):
    serializer_class = HostReservationUpdateSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]

    def get_object(self):

        rented_houses = property.models.Property.objects.filter(owner=self.request.user.id, avaliable_to_reserve=True)
        if not rented_houses:
            raise NotFound('ERROR: YOU DID NOT RENT OUT ANY PROPERTY')
        
        rented_houses_ids = [house.id for house in rented_houses]
        reservation_requests = property.models.ReservationRequest.objects.filter(property_id__in = rented_houses_ids)


        user_id = self.request.user.id
        reservations_made = property.models.ReservationRequest.objects.filter(user = user_id)
        reserved_houses = [res.id for res in reservations_made]
        try:
            all = property.models.ReservationRequest.objects.get(id=self.kwargs['resv_id'])
        except:
            raise NotFound('ERROR: NOT FOUND')
        req = json.loads(self.request.body.decode('utf-8')).get("status")
        if all:
            if all not in reservation_requests:
                if (all.id not in reserved_houses) or (req!="CANCELLED"):
                    raise NotFound("ERROR: PERMISSION DENIED")

            user_who_made_request = all.user
            string = "Reservation status changed to "+req+"." 
            notifications.models.Notifications.objects.create(owner = user_who_made_request,type = 'GUEST', description =string)
            return all
        else:
            raise NotFound('ERROR: NOT FOUND')

        

##TODO
##Delete property -> delete reservation requests for that property
#Property Avaliability change to available start date and end dates


class AllImageCreate(CreateAPIView): #CREATE Image
    serializer_class = AllImageSeralizer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    
class AllImageList(ListAPIView): #Shows images of property
    serializer_class = AllImageSeralizer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['property_id']

    def get_queryset(self):
        return property.models.AllImage.objects.all()