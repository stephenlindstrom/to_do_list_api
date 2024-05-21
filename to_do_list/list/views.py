from list.models import ListItem
from list.serializers import ListItemSerializer

from rest_framework import generics


class TaskList(generics.ListCreateAPIView):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer