# Generated by Django 5.2.4 on 2025-07-28 23:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('places', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='age_group',
            field=models.CharField(blank=True, choices=[('0-12', 'Kid (0-12)'), ('13-19', 'Teen (13-19)'), ('20-29', 'Young Adult (20-29)'), ('30-44', 'Adult (30-44)'), ('45-59', 'Middle-aged (45-59)'), ('60+', 'Senior (60+)')], max_length=10, null=True),
        ),
    ]
