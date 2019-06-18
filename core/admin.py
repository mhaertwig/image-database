from django.contrib import admin
from core.models import Page, Tag, Image

def make_approved(modeladmin, request, queryset):
    queryset.update(approved=True)
make_approved.short_description = 'Approve selected images'


class ImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'image_tag', 'approved')
    actions = [make_approved]


# Register your models here.
admin.site.register(Page, admin.ModelAdmin)
admin.site.register(Tag, admin.ModelAdmin)
admin.site.register(Image, ImageAdmin)
