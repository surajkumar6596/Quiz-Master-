import django
from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser

# print(dir(django.contrib))

# Create your models here.
class Users(AbstractUser):
    GENDER_CHOICE=[
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    phone = models.CharField(max_length=10, unique=True,
                             validators=[
                                RegexValidator(
                                    regex = r'^\d{10}$',
                                    message = 'phone shold be  exactly 10 digits',
                                )
                             ])
    gender = models.CharField(max_length=6, choices=GENDER_CHOICE, default='Male')

  

    