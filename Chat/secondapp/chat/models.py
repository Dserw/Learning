from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    image = models.ImageField(upload_to="media/")


class Room(models.Model):
    name = models.CharField(max_length=20)
    slug = models.SlugField(max_length=100)
    UserRoom = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return "Room : " + self.name


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    room = models.CharField(max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Message is :-" + self.content
