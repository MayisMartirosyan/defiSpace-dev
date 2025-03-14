# Generated by Django 5.0.3 on 2025-02-23 19:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0015_company_related_posts'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('comment', models.TextField()),
                ('rating', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='blog.company')),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='blog.comment')),
            ],
        ),
    ]
