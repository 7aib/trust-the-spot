from django.urls import path
from .views import VideoFeedView

urlpatterns = [
    path("feed/", VideoFeedView.as_view(), name="video-feed"),
]
