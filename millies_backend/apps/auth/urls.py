from django.urls import path
from .views import sendcloud_auth, checkout_auth

urlpatterns = [
    path('', sendcloud_auth, name='sendcloud_auth'),         
    path('checkout/', checkout_auth, name='checkout_auth'),  
]
