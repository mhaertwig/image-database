from rest_framework import filters, viewsets
from core import serializers, models


class ImageViewSet(viewsets.ModelViewSet):
    queryset = models.Image.objects.filter(approved=True)
    serializer_class = serializers.ImageSerializer
    detail_serializer_class = serializers.ImageDetailSerializer

    filter_backends = (filters.SearchFilter,)
    search_fields = ('title', 'description', 'tags__name')
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            if hasattr(self, 'detail_serializer_class'):
                return self.detail_serializer_class

        return super(ImageViewSet, self).get_serializer_class()


class PageViewSet(viewsets.ModelViewSet):
    queryset = models.Page.objects.all()
    serializer_class = serializers.PageSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer
    search_fields = ('name',)
