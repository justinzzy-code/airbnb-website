# Generated by Django 4.1.7 on 2023-04-14 04:48

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("property", "0003_alter_property_description"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="property", options={"ordering": ["-created_at"]},
        ),
        migrations.AddField(
            model_name="property",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
    ]