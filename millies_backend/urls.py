from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.apps import apps

urlpatterns = [
    path('i18n/', include('django.conf.urls.i18n')),
    path('admin/', admin.site.urls),
    # Oscar catch-all route (if needed – ideally placed at the end)
    path('', include(apps.get_app_config('oscar').urls[0])),
    # Local custom apps
    path("home/", include("millies_backend.apps.home.urls")),
    path("contactUs/", include("millies_backend.apps.contactUs.urls")),
    path("aboutUs/", include("millies_backend.apps.aboutUs.urls")),
    path('auth/', include("millies_backend.apps.auth.urls")),         
    path('tracking/', include('millies_backend.apps.tracking.urls')),     
    path('shipping/', include("millies_backend.apps.shipping.urls")),   
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
