from django.shortcuts import render

# Create your views here.
import requests
from django.http import JsonResponse
from django.conf import settings

def sendcloud_auth(request):
    url = "https://sendcloud.public-api/auth"
    headers = {"Authorization": f"Bearer {settings.SENDCLOUD_API_KEY}"}
    response = requests.get(url, headers=headers)
    return JsonResponse(response.json())

def checkout_auth(request):
    url = "https://sendcloud.public-api/checkout/auth"
    headers = {"Authorization": f"Bearer {settings.SENDCLOUD_API_KEY}"}
    response = requests.get(url, headers=headers)
    return JsonResponse(response.json())


urlpatterns += [ # type: ignore
    path("checkout-auth/", checkout_auth, name="checkout-auth"), # type: ignore
]
