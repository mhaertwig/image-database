# Generated by Django 2.1 on 2019-05-24 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20190524_1935'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='thumbnail_height',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='image',
            name='thumbnail_width',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
