# Generated by Django 5.0.3 on 2025-01-18 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0014_alter_productscore_company_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='related_posts',
            field=models.ManyToManyField(blank=True, related_name='related_companies', to='blog.post'),
        ),
    ]
