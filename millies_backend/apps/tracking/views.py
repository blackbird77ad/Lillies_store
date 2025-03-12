import requests
from django.http import JsonResponse
from django.conf import settings

def get_tracking_info(request, tracking_number):
    url = f"https://api.sendcloud.com/v1/tracking/{tracking_number}"
    headers = {"Authorization": f"Bearer {settings.SENDCLOUD_API_KEY}"}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  
        return JsonResponse(response.json())
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)
