# Generated by Django 2.1 on 2019-06-29 10:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0016_auto_20190629_0955'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='tags',
        ),
    ]
