

# Create your views here.
from .serializers import UserSerializer
from .models import Users
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

class UserRegisterView(generics.CreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer


class UserProfileViews(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user