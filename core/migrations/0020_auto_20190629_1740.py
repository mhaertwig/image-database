# Generated by Django 2.1 on 2019-06-29 17:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0019_auto_20190629_1117'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tag',
            old_name='name',
            new_name='title',
        ),
    ]
