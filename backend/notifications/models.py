from django.contrib.auth.models import User
from django.db import models
import datetime

STATUS_CHOICES = (("HOST","HOST"),
                  ("GUEST","GUEST"),)

class Notifications(models.Model):
    description = models.CharField(max_length=1000, null=False)
    type = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE, default=User, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ('-created_at',)

