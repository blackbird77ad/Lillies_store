from django.apps import apps
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from apps.auth.views import sendcloud_auth
from apps.tracking.views import get_tracking_info
from apps.shipping.views import get_shipping_methods

urlpatterns = [
    path('i18n/', include('django.conf.urls.i18n')),
    path('admin/', admin.site.urls),
    path('', include(apps.get_app_config('oscar').urls[0])),
    # Local
    path("home/", include("apps.home.urls")),
    path("contactUs/", include("apps.contactUs.urls")),
    path("aboutUs/", include("apps.aboutUs.urls")),
    path("auth/", sendcloud_auth, name="sendcloud-auth"),
     path("tracking/<str:tracking_number>/", get_tracking_info, name="tracking-info"),
      path("shipping-methods/", get_shipping_methods, name="shipping-methods"),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
