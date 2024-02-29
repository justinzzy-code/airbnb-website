# Generated by Django 4.1.7 on 2023-03-08 05:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('location', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=200)),
                ('number_of_guests', models.PositiveIntegerField(default=0)),
                ('number_of_beds', models.PositiveIntegerField(default=0)),
                ('area', models.PositiveIntegerField(default=0)),
                ('avaliability', models.DateTimeField(max_length=200)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
