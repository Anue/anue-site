# -*- coding: utf-8 -*-
from django.contrib import admin

from portfolio.models import Client


class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'url', 'logo')
    list_filter = ('name',)


admin.site.register(Client, ClientAdmin)
