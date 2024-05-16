from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from rest_framework.parsers import JSONParser
from list.models import ListItem
from list.serializers import ListItemSerializer

@csrf_exempt 
def task_list(request):
    if request.method == 'GET':
        list_items = ListItem.objects.all()
        serializer = ListItemSerializer(list_items, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ListItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

