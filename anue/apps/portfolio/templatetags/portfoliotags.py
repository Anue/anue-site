from django import template
from django.conf import settings

from portfolio.models import Client


register = template.Library()

@register.inclusion_tag('portfolio/portfolio.html')
def render_portfolio():
    return {
        'clients': Client.objects.all(),
        'MEDIA_URL': settings.MEDIA_URL,
        'STATIC_URL': settings.STATIC_URL
    }
