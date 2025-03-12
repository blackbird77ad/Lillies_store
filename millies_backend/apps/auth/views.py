import requests
from django.http import JsonResponse
from django.conf import settings

def sendcloud_auth(request):

    url = "https://api.sendcloud.dev/v2/auth"
   
    headers = {
        "Authorization": f"Basic {settings.SENDCLOUD_API_KEY}:{settings.SENDCLOUD_API_SECRET}"
    }
    response = requests.get(url, headers=headers)
    return JsonResponse({"message": "SendCloud Auth Successful"}, status=200)

def checkout_auth(request):
    url = "https://api.sendcloud.dev/v2/checkout/auth"
    headers = {
        "Authorization": f"Basic {settings.SENDCLOUD_API_KEY}:{settings.SENDCLOUD_API_SECRET}"
    }
    response = requests.get(url, headers=headers)
    return JsonResponse({"message": "Checkout Auth Successful"}, status=200)
