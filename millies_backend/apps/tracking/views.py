from django.shortcuts import render

# Create your views here.
import requests
from django.http import JsonResponse
from django.conf import settings

def get_tracking_info(request, tracking_number):
    url = f"https://sendcloud.public-api/tracking/{tracking_number}"
    headers = {"Authorization": f"Bearer {settings.SENDCLOUD_API_KEY}"}
    response = requests.get(url, headers=headers)
    return JsonResponse(response.json())