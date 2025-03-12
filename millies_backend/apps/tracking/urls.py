from django.urls import path
from .views import get_tracking_info

urlpatterns = [
    path('<str:tracking_number>/', get_tracking_info, name='tracking-info'),
]
