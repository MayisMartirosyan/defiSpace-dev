# Generated by Django 5.0.3 on 2025-04-19 08:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0021_alter_tagrating_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='rating',
        ),
    ]
