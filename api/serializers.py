from rest_framework import serializers


class ContentIdeaRequestSerializer(serializers.Serializer):
    """Validates the incoming request body."""
    idea = serializers.CharField(
        required=True,
        allow_blank=False,
        min_length=1,
        max_length=500,
        error_messages={
            'required': 'The "idea" field is required.',
            'blank': 'The "idea" field cannot be empty.',
            'min_length': 'The "idea" must be at least 1 character long.',
            'max_length': 'The "idea" must not exceed 500 characters.',
        }
    )


class ContentIdeaResponseSerializer(serializers.Serializer):
    """Serializes the generated content response."""
    caption = serializers.CharField()
    hashtags = serializers.ListField(child=serializers.CharField())
    hook = serializers.CharField()
    virality_score = serializers.IntegerField(min_value=0, max_value=100)
    suggestions = serializers.ListField(child=serializers.CharField())
