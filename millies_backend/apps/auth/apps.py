from django.apps import AppConfig

class AuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'millies_backend.apps.auth'
    label = 'custom_auth'  