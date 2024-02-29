from django.urls import path
from . import views
from notifications.views import *
app_name="notifications"


urlpatterns = [
    path('createnotification/', views.NotifcationCreate.as_view()),
    path('view_all_notifications/', views.ViewAllNotifications.as_view()),
    path('view_host_notifications/', views.ViewHostNotification.as_view()),
    path('view_guest_notifications/', views.ViewGuestNotification.as_view()),
    path('delete_notifications/<int:id>/', views.NotificationDelete.as_view()),
    
]
