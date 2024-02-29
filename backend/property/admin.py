from django.contrib import admin
# Register your models here.

from django.contrib import admin
from .models import Property, ReservationRequest, AllImage

# Register your models here.
admin.site.register(Property)
admin.site.register(ReservationRequest)
admin.site.register( AllImage)

