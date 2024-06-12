from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import DetailView, ListView, UpdateView, CreateView
from .models import *
from .serializer import *
from rest_framework import generics
from .forms import UserEditForm, RoomCreatedForm

# Create your views here.


def rooms(request):
    rooms = Room.objects.all()
    return render(request, "rooms.html", {'rooms': rooms})


def room(request, slug):
    room_name = get_object_or_404(Room, slug=slug)
    messages = Message.objects.filter(room=slug)
    users = User.objects.filter(message__room=slug).distinct()
    contex = {
        "slug": slug,
        "room_name": room_name,
        "messages": messages,
        "users": users,
    }
    return render(request, "room.html", contex)


class RoomAPIView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class MessageAPIView(generics.ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


@login_required
def profile_view(request):
    return render(request, "profile.html")


class UserListView(ListView):
    model = User
    context_object_name = 'users'
    template_name = 'users.html'
    queryset = User.objects.all()


class RoomCreatedView(CreateView):
    model = Room
    template_name = 'room_create.html'
    form_class = RoomCreatedForm
    success_url = reverse_lazy('rooms')
