# Generated by Django 2.1 on 2019-06-29 17:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0021_image_thumbnail_medium'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tag',
            old_name='title',
            new_name='name',
        ),
    ]