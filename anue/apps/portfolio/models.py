from django.db import models
from django.conf import settings


__all__ = ['Client']


class Client(models.Model):
    """A class representing a portfolio client."""
    name = models.CharField(max_length=64)
    description = models.TextField()
    url = models.URLField(blank=True)
    logo = models.ImageField(upload_to='portfolio', blank=True, null=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('name',)
