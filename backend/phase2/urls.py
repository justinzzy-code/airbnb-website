"""
"""
from django.contrib import admin
from django.urls import path, include
#from django.conf import settings
from phase2 import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('property/', include('property.urls')),
    path('comments/', include('comments.urls')),
    path('accounts/', include('accounts.urls')),
    path('notifications/', include('notifications.urls')),
] 

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)