from django.urls import path
from .views import get_shipping_methods  # Import the view

urlpatterns = [
    path('shipping-methods/', get_shipping_methods, name='shipping-methods'),
]