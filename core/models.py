import os

from django.db import models
from django.conf import settings
from django.utils.timezone import now
from django.template.defaultfilters import slugify
from PIL import Image as PILImage
from io import BytesIO
from django.core.files.base import ContentFile
from django.utils.safestring import mark_safe
from ckeditor.fields import RichTextField


class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Image(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255, blank=True)
    src = models.ImageField()
    thumbnail = models.ImageField(upload_to='thumbs', editable=False, null=True)
    thumbnail_width = models.IntegerField(default=0, blank=True)
    thumbnail_height = models.IntegerField(default=0, blank=True)
    description = models.TextField(blank=True)
    date_added = models.DateTimeField(default=now)
    tags = models.ManyToManyField(Tag, null=True, blank=True)
    approved = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date_added']
        get_latest_by = 'date_added'

    def save(self, *args, **kwargs):
        self.make_thumbnail()
        self.slug = slugify('%s-%s' % (self.title, self.date_added,))
        super(Image, self).save(*args, **kwargs)

    def make_thumbnail(self):
        if not settings.CLIMAGE_THUMB_WIDTH:
            return False

        image = PILImage.open(self.src)
        width, height = image.size
        thumbnail_size = (
            settings.CLIMAGE_THUMB_WIDTH,
            height * settings.CLIMAGE_THUMB_WIDTH / width,
        )

        self.thumbnail_width, self.thumbnail_height = thumbnail_size
        image.thumbnail(thumbnail_size, PILImage.ANTIALIAS)
        thumb_name, thumb_extension = os.path.splitext(self.src.name)
        thumb_extension = thumb_extension.lower()
        thumb_filename = thumb_name + '_thumb' + thumb_extension

        if thumb_extension in ['.jpg', '.jpeg']:
            FTYPE = 'JPEG'
        elif thumb_extension == '.gif':
            FTYPE = 'GIF'
        elif thumb_extension == '.png':
            FTYPE = 'PNG'
        else:
            return False

        # Save thumbnail to in-memory file as StringIO
        temp_thumb = BytesIO()
        image.save(temp_thumb, FTYPE)
        temp_thumb.seek(0)

        # set save=False, otherwise it will run in an infinite loop
        self.thumbnail.save(thumb_filename, ContentFile(temp_thumb.read()), save=False)
        temp_thumb.close()

    def __str__(self):
        return self.title

    def image_tag(self):
        return mark_safe(
            '<img src="%s" width="170" />' % self.thumbnail.url)

    image_tag.short_description = 'Image'
    image_tag.allow_tags = True


class Page(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    icon_name = models.CharField(max_length=255)
    content = RichTextField()

    def __str__(self):
        return self.title
