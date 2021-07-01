from django.db import models
from knox.models import AuthToken
from django.utils import timezone as _timezone
from django.contrib.auth.models import User


class Calendar(models.Model):
    """
    Stores info about calendars
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    start = models.DateTimeField(default=_timezone.now)
