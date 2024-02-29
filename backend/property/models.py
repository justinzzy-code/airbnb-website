from django.contrib.auth.models import User
from django.db import models
import datetime


class AllImage(models.Model):
    image = models.ImageField(upload_to='uploads/', blank=True)
    property_id = models.PositiveIntegerField(default = 0, null=False, blank=False)


class Property(models.Model):
    name = models.CharField(max_length=200, null=False)
    location = models.CharField(max_length=200, null=False)
    description = models.CharField(max_length=1000, null=False)
    number_of_guests = models.PositiveIntegerField(default = 0, null=False)
    number_of_beds = models.PositiveIntegerField(default = 0, null=False)
    area = models.PositiveIntegerField(default = 0, null=False) #how big is the house
    avaliability = models.DateTimeField(max_length=200)
    avaliable_to_reserve = models.BooleanField(default=False) #Whether property is avaliable to rent out
    image = models.ImageField(upload_to='uploads/', blank=True)
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE, default=User, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']



STATUS_CHOICES = (("PENDING","PENDING"),
                  ("DENIED","DENIED"), 
                  ("APPROVED","APPROVED"), 
                  ("CANCELLED", "CANCELLED"),
                  ("TERMINATED","TERMINATED"),
                  ("COMPLETED","COMPLETED")
                )

class ReservationRequest(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    start_date = models.DateTimeField(max_length=200)
    end_date = models.DateTimeField(max_length=200)
    property_id = models.PositiveIntegerField(default = 0, null=False, blank=False) 
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')

    created_at = models.DateTimeField(auto_now_add=True)   
    class Meta:
        ordering = ['-created_at']