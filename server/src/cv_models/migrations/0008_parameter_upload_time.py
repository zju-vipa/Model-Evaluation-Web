# Generated by Django 4.2.11 on 2024-05-13 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cv_models', '0007_parameter_architecture_parameter_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='parameter',
            name='upload_time',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
