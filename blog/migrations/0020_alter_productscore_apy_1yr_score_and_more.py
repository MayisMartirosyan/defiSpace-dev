# Generated by Django 5.0.3 on 2025-03-20 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0019_alter_comment_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productscore',
            name='apy_1yr_score',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='productscore',
            name='apy_5yr_score',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='productscore',
            name='performace_score',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='productscore',
            name='total_score',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='securityscore',
            name='asset_secured_score',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='securityscore',
            name='emission_limit_score',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='securityscore',
            name='liquidity_score',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='securityscore',
            name='total_score',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='teamscore',
            name='decentralized_score',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='teamscore',
            name='performace_score',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='teamscore',
            name='total_score',
            field=models.IntegerField(default=1),
        ),
    ]
