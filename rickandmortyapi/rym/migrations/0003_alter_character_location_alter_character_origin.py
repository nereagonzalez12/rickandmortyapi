# Generated by Django 5.1.1 on 2024-09-05 14:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rym', '0002_alter_character_location_alter_character_origin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='character',
            name='location',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='location', to='rym.location'),
        ),
        migrations.AlterField(
            model_name='character',
            name='origin',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='origin', to='rym.location'),
        ),
    ]
