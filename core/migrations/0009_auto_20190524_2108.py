# Generated by Django 2.1 on 2019-05-24 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_merge_20190524_2004'),
    ]

    operations = [
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('icon_name', models.CharField(max_length=255)),
                ('content', models.TextField()),
            ],
        ),
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
