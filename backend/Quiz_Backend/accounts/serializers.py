from .models import Users
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=Users
        fields=[
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone',
            'gender',
            'password',
        ]

        extra_kwargs = {
            'password':{'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Users(**validated_data)
        user.set_password(password)
        user.save()
        return user



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data.update({
            'username':self.user.username,
            'email': self.user.email,
            'is_admin': self.user.is_staff,
        })

        return data


class CustomTokenPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer