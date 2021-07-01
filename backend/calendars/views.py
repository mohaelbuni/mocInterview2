from .models import Calendar
from .serializers import CalendarSerializer
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from knox.models import AuthToken


@api_view(
    ["POST"],
)
def api_create_calendar_view(request):
    user = request.user
    count = Calendar.objects.filter(owner=user).count()

    if count:
        response_message = {
            "error": "duplicate key value violates unique constraint. User has already an appointment."
        }
        return Response(response_message, status=status.HTTP_400_BAD_REQUEST)

    calendar = Calendar(owner=user)

    if request.method == "POST":
        serializer = CalendarSerializer(calendar, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
