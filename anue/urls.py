from django.conf.urls.defaults import *
from django.conf import settings
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from contact.forms import ContactForm


admin.autodiscover()

if settings.DEBUG:
    urlpatterns = patterns('',
                           (r'^media/(?P<path>.*)$',
                            'django.views.static.serve',
                            {'document_root': settings.MEDIA_ROOT}))
    urlpatterns += staticfiles_urlpatterns()
else:
    urlpatterns = patterns("")


urlpatterns += patterns(
    '',
    url(r'^$', 'django.views.generic.simple.direct_to_template',
        {'template': 'base.html', 'extra_context': {'form': ContactForm()}},
        name='index'),
    url(r'^contact/', include('contact.urls')),
    (r'^admin/', include(admin.site.urls)),
)
