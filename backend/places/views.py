from rest_framework import generics, permissions
from .models import Video
from .serializers import VideoFeedSerializer

class VideoFeedView(generics.ListAPIView):
    queryset = Video.objects.all().order_by("-created_at")  # latest first
    serializer_class = VideoFeedSerializer
    permission_classes = [permissions.AllowAny]  # public feed

