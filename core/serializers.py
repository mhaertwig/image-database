import json
from core import models
from rest_framework import serializers


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = ('pk', 'name',)


class ImageDetailSerializer(serializers.ModelSerializer):
    caption = serializers.CharField(source='title')
    tags = TagSerializer(many=True)

    class Meta:
        model = models.Image
        fields = ('caption', 'slug', 'src', 'description', 'tags', )


class ImageSerializer(serializers.ModelSerializer):
    tags = TagSerializer(read_only=True, many=True)
    caption = serializers.CharField(source='title')
    thumbnailWidth = serializers.IntegerField(source='thumbnail_width', required=False)
    thumbnailHeight = serializers.IntegerField(source='thumbnail_height', required=False)

    class Meta:
        model = models.Image
        lookup_field = 'slug'
        fields = ('caption', 'thumbnail', 'src', 'slug', 'thumbnailWidth', 'thumbnailHeight',
                  'tags', 'description',)

    def create(self, validated_data):
        tags_data = json.loads(self.context['request'].POST.get('tags'))
        image = models.Image.objects.create(**validated_data)

        for tag in tags_data:
            if tag:
                try:
                    t = models.Tag.objects.get(name=tag['name'])
                    t.save()
                except models.Tag.DoesNotExist:
                    t = models.Tag.objects.create(image=image, **tag)

                image.tags.add(t)

        return image


class PageSerializer(serializers.ModelSerializer):
    icon = serializers.CharField(source='icon_name')

    class Meta:
        model = models.Page
        exclude = ('icon_name',)
