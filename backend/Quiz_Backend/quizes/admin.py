from django.contrib import admin
from .models import Users,Category, Quiz,Question,Option,QuizAttempt
# Register your models here.

# @admin.register(Users)
# class UserAdmin(admin.ModelAdmin):
#     list_display=('username', 'first_name', 'last_name', 'email', 'gender', 'phone', 'is-staff', 'is_superuser')

admin.site.register(Category)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(QuizAttempt)