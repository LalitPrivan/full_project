from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import UserRegistrationSerializers
from account.serializers import UserLoginSerializers
from django.contrib.auth import authenticate
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
 
class UserRegistrationView(APIView):
    renderer_classes=[UserRenderer]
    def post(self,request,format=None):
        serializer=UserRegistrationSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        token=get_tokens_for_user(user)
        return Response({'token':token,'msg':'Registration Success'},status=status.HTTP_201_CREATED)
        
    

class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)

        if user is not None:
            token = get_tokens_for_user(user)
            is_admin = user.is_admin  # Assuming is_admin is a field in your user model
            response_data = {
                'token': token,
                'is_admin': is_admin,
                'msg': 'Login Success'
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({'errors': {'non_field_errors': ['Invalid Credentials']}}, status=status.HTTP_404_NOT_FOUND)