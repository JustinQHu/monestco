# Generated by Django 3.2.8 on 2021-11-13 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monest', '0006_auto_20211113_1701'),
    ]

    operations = [
        migrations.AddField(
            model_name='scores',
            name='short_text',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
