from django.urls import path
from list import views      

urlpatterns = [
    path('task_list/', views.task_list),
]