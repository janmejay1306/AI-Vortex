import random

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ContentIdeaRequestSerializer, ContentIdeaResponseSerializer


# ─── Mock Data Pools ─────────────────────────────────────────────────────────

CAPTIONS = [
    "Stay consistent and watch your {topic} transform 💪",
    "The secret to {topic} success nobody talks about 🔥",
    "This {topic} hack changed everything for me ✨",
    "Why most people fail at {topic} — and how you won't 🚀",
    "3 things I wish I knew about {topic} sooner 😤",
    "Your {topic} journey starts with this one step 🎯",
    "Stop overthinking. Start doing. {topic} 101 💯",
    "The truth about {topic} that nobody tells you 🤫",
    "One simple {topic} tip that gets real results 📈",
    "If you're struggling with {topic}, read this 👇",
]

HOOKS = [
    "No one talks about this {topic} truth...",
    "I tried this {topic} method for 30 days and here's what happened...",
    "Stop scrolling — this {topic} tip will change your life...",
    "Here's the {topic} mistake 99% of people make...",
    "POV: You finally cracked the {topic} code...",
    "This is the {topic} secret the pros don't share...",
    "What if I told you {topic} was easier than you think?",
    "Wait till the end — this {topic} trick is insane...",
    "The #1 {topic} rule that nobody follows...",
    "You've been doing {topic} wrong this whole time...",
]

HASHTAG_POOLS = {
    "fitness":      ["#fitness", "#gym", "#workout", "#health", "#fitfam", "#motivation", "#gains", "#bodybuilding"],
    "food":         ["#food", "#cooking", "#recipe", "#foodie", "#homemade", "#yummy", "#delicious", "#chef"],
    "travel":       ["#travel", "#wanderlust", "#explore", "#adventure", "#vacation", "#travelgram", "#nature", "#bucketlist"],
    "tech":         ["#tech", "#coding", "#developer", "#ai", "#innovation", "#programming", "#startup", "#software"],
    "fashion":      ["#fashion", "#style", "#ootd", "#trend", "#outfit", "#streetwear", "#aesthetic", "#clothing"],
    "business":     ["#business", "#entrepreneur", "#success", "#hustle", "#startup", "#marketing", "#growth", "#money"],
    "motivation":   ["#motivation", "#mindset", "#grind", "#success", "#daily", "#inspire", "#goals", "#discipline"],
    "default":      ["#viral", "#trending", "#fyp", "#explore", "#reels", "#content", "#creator", "#instagood"],
}

POST_TIMES = [
    "Best time to post: 7 AM (early risers engage most)",
    "Best time to post: 12 PM (lunch break scrolling)",
    "Best time to post: 5 PM (post-work wind-down)",
    "Best time to post: 7 PM (prime evening engagement)",
    "Best time to post: 9 PM (late night browsing peak)",
]

FORMATS = [
    "Use Reels format for 2.5x more reach",
    "Try carousel posts — they boost saves by 3x",
    "Go with a short-form video (15-30 sec)",
    "Use Stories with polls for instant engagement",
    "Create a duet/stitch-style video for reach",
    "Post a before/after transformation reel",
]

ENGAGEMENT_TIPS = [
    "Add trending audio to boost discoverability",
    "Reply to every comment in the first hour",
    "Use a strong CTA like 'Save this for later'",
    "Pin your best comment to drive conversation",
    "Start with a pattern interrupt in the first 2 seconds",
    "Ask a question at the end to boost comments",
    "Collab with a creator in the same niche",
    "Use 3-5 highly relevant hashtags instead of 30 generic ones",
]


# ─── Helper ──────────────────────────────────────────────────────────────────

def _detect_topic(idea: str) -> str:
    """Detect the rough topic from the idea text to pick relevant hashtags."""
    idea_lower = idea.lower()
    for topic in HASHTAG_POOLS:
        if topic != "default" and topic in idea_lower:
            return topic
    return "default"


def _generate_mock_content(idea: str) -> dict:
    """Build mock viral content based on the given idea."""
    topic = _detect_topic(idea)
    topic_label = topic if topic != "default" else idea.split()[0] if idea.split() else "content"

    # Pick a random caption & hook, inject the topic
    caption = random.choice(CAPTIONS).format(topic=topic_label)
    hook = random.choice(HOOKS).format(topic=topic_label)

    # Hashtags: pick 4-6 from the matching pool + sprinkle defaults
    pool = HASHTAG_POOLS.get(topic, HASHTAG_POOLS["default"])
    hashtags = random.sample(pool, min(4, len(pool)))
    extra = random.sample(HASHTAG_POOLS["default"], 2)
    hashtags = list(dict.fromkeys(hashtags + extra))  # deduplicate, preserve order

    # Virality score: random 40-95 (skewed upward for fun)
    virality_score = random.randint(40, 95)

    # Suggestions: exactly 3
    suggestions = [
        random.choice(POST_TIMES),
        random.choice(FORMATS),
        random.choice(ENGAGEMENT_TIPS),
    ]

    return {
        "caption": caption,
        "hashtags": hashtags,
        "hook": hook,
        "virality_score": virality_score,
        "suggestions": suggestions,
    }


# ─── API View ────────────────────────────────────────────────────────────────

class GenerateContentView(APIView):
    """
    POST /api/generate/

    Accepts a content idea and returns mock viral content suggestions
    including a caption, hashtags, hook, virality score, and tips.
    """

    def post(self, request):
        # Validate request body
        serializer = ContentIdeaRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"error": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        idea = serializer.validated_data["idea"]

        # Generate mock content
        content = _generate_mock_content(idea)

        # Validate outgoing response shape (defensive)
        response_serializer = ContentIdeaResponseSerializer(data=content)
        response_serializer.is_valid(raise_exception=True)

        return Response(response_serializer.validated_data, status=status.HTTP_200_OK)
