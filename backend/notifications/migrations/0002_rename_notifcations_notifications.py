# Generated by Django 4.1.2 on 2023-04-08 05:54

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('notifications', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Notifcations',
            new_name='Notifications',
        ),
    ]
