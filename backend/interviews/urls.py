from django.urls import path
from . import views

urlpatterns = [
    # path('api/similarity/', views.Similarity, name='interview'),

    path('api/getQuestion',views.getQuestion),
    path('api/saveNotes/<int:id>',views.saveNotes),
]
