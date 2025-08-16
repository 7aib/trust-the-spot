from rest_framework import serializers
from .models import Video

class VideoFeedSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    uploaded_by = serializers.StringRelatedField()  # shows username instead of ID
    place_name = serializers.CharField(source="place.name", read_only=True)

    class Meta:
        model = Video
        fields = [
            "id",
            "title",
            "url",
            "uploaded_by",
            "place_name",
            "created_at",
        ]

    def get_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.file.url)
