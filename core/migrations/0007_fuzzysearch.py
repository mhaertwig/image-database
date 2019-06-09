from django.db import migrations
from django.contrib.postgres import operations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        operations.TrigramExtension(),
    ]
