from django.contrib import admin
from core.models import Page, Tag, Image

# Register your models here.
admin.site.register(Page, admin.ModelAdmin)
admin.site.register(Tag, admin.ModelAdmin)
admin.site.register(Image, admin.ModelAdmin)
