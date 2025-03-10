from django.urls import path, re_path

from .views import *

urlpatterns = [path("", AboutUsView.as_view(), name="aboutUs")]
