# Generated by Django 4.0.2 on 2022-09-03 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommendation', '0009_remove_product_created_at_alter_product_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='descr',
            field=models.CharField(blank=True, max_length=3000),
        ),
    ]