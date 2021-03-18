from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = 'home-spese'),
    path('spese/', views.spese, name = 'lista-spese'),
    path('addSpesa/',views.addSpesa, name = 'add-spesa'),
    path('editSpesa/<int:pk>/',views.editSpesa, name = 'edit-spesa'),
    path('deleteSpesa/<int:pk>/',views.deleteSpesa, name = 'delete-spesa'),
]
 