from django.shortcuts import render

# Create your views here.
import requests
from django.http import JsonResponse
from django.conf import settings

def get_shipping_methods(request):
    url = "https://sendcloud.public-api/shipping-methods"
    headers = {"Authorization": f"Bearer {settings.SENDCLOUD_API_KEY}"}
    response = requests.get(url, headers=headers)
    return JsonResponse(response.json())

def get_shipping_prices(request):
    url = "https://sendcloud.public-api/shipping-prices"
    headers = {"Authorization": f"Bearer {settings.SENDCLOUD_API_KEY}"}
    response = requests.get(url, headers=headers)
    return JsonResponse(response.json())
