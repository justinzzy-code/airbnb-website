from django.urls import path
from . import views
from property.views import *
app_name="property"


urlpatterns = [
    path('userpropertylist/', views.UserPropertyList.as_view()),
    path('create_property/',views.PropertyCreate.as_view()),
    path('get_property/<int:id>/', views.PropertyGetDetails.as_view()),
    path('update_property/<int:id>/', views.PropertyUpdate.as_view()),
    path('delete_property/<int:id>/', views.PropertyDelete.as_view()),
    path('all_property/', AllPropertyFilterView.as_view()),
    path('user_reservations_host/', views.UserPropertyAvaliableToReserve.as_view()),
    path('allreservations/', views.GetAllReservations.as_view()),


    path('create_reservation/',views.ReservationCreate.as_view()), 
    path('user_reservations/',views.UserReservationsList.as_view()), 
    path('delete_user_reservations/<int:propertyid>/', views.UserReservationsDelete.as_view()),
    path('view_reservation_requests/', views.HostViewReservationRequests.as_view()),
    path('update_reservation_requests/<int:resv_id>/', views.HostUpdateReservationStatus.as_view()),

    path('allimagecreate/', views.AllImageCreate.as_view()),
    path('allimages/', views.AllImageList.as_view()),
]
