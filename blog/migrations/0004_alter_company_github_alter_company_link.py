# Generated by Django 5.0 on 2024-02-13 01:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_alter_company_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='github',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='company',
            name='link',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
