from django.contrib import admin

# Register your models here.
# Admin = quiz_admin_user  password:0001
from .models import Users

admin.site.register(Users)