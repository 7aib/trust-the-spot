from django.contrib import admin
from .models import UserProfile, City, Category, Place

# Register your models here.
admin.register(UserProfile)
admin.register(City)
admin.register(Category)
admin.register(Place)
