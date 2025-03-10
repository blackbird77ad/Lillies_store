import requests
from django.conf import settings

def get_auth_headers():
    """Generate headers for Sendcloud API authentication."""
    return {
        "Authorization": f"Basic {settings.SENDCLOUD_API_KEY}:{settings.SENDCLOUD_API_SECRET}",
        "Content-Type": "application/json"
    }

def authenticate_sendcloud():
    """Test authentication with Sendcloud."""
    url = settings.SENDCLOUD_BASE_URL + "auth"
    headers = get_auth_headers()
    
    response = requests.get(url, headers=headers)
    return response.json()
