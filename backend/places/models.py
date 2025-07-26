from django.db import models
from django.contrib.auth.models import User
from core.mixins import TimeStampedModel, SoftDeleteModel
from django.contrib.contenttypes.fields import GenericRelation
from .choices import PROVINCE_CHOICES

# -----------------------------
# 🧍 User Profile
# -----------------------------

class UserProfile(TimeStampedModel, SoftDeleteModel, models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    bio = models.CharField(max_length=300, blank=True)
    city = models.ForeignKey('City', on_delete=models.SET_NULL, null=True, blank=True)

    @property
    def like_count(self):
        return self.likes.count()

    @property
    def comment_count(self):
        return self.comments.count()

    @property
    def share_count(self):
        return self.shares.count()

    def __str__(self):
        return self.user.username


# -----------------------------
# 🏙️ City
# -----------------------------

class City(TimeStampedModel, SoftDeleteModel, models.Model):
    name = models.CharField(max_length=100, unique=True)
    province = models.CharField(max_length=100, choices=PROVINCE_CHOICES, default='punjab')

    def __str__(self):
        return self.name

# -----------------------------
# 🗂️ Category
# -----------------------------

class Category(TimeStampedModel, SoftDeleteModel, models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# -----------------------------
# 📍 Place
# -----------------------------

class Place(TimeStampedModel, SoftDeleteModel, models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    @property
    def like_count(self):
        return self.likes.count()

    @property
    def comment_count(self):
        return self.comments.count()

    @property
    def share_count(self):
        return self.shares.count()

    def __str__(self):
        return self.name
