from list.models import ListItem
from list.serializers import ListItemSerializer

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.authentication import authenticate
from django.middleware import csrf
from to_do_list import settings
 
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class LoginView(APIView):
    def post(self, request, format=None):
        data = request.data
        response = Response()
        username = data.get('username', None)
        password = data.get('password', None)
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                #data = get_tokens_for_user(user)
                response.set_cookie(
                    key = settings.SIMPLE_JWT['AUTH_COOKIE'],
                    value = data["access"],
                    expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite= settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )
                csrf.get_token(request)
                response.data = {"Success": "Login successful", "data": data}

                return response
            else:
                return Response({"Not active": "This account is not active"}, status=404)
        else: 
            return Response({"Invalid": "Invalid username or password"}, status=404)

class TaskList(generics.ListCreateAPIView):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer