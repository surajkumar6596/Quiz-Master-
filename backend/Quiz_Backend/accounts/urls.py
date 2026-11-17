from django.urls import path
from .views import UserRegisterView,UserProfileViews
from .serializers import CustomTokenPairView
from rest_framework_simplejwt.views import( TokenRefreshView)


urlpatterns=[
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', CustomTokenPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('profile/', UserProfileViews.as_view(), name = 'profile')

]