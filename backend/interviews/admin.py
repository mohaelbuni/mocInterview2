from django.contrib import admin
from .models import Interview, Feedback, Question

admin.site.register(Interview)
admin.site.register(Question)
admin.site.register(Feedback)
