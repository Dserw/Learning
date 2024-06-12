from django.http import HttpResponse
from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'room', RoomAPIView)
router.register(r'message', MessageAPIView)

urlpatterns = [
    path('', views.rooms, name='rooms'),
    path("<str:slug>/", views.room, name="room"),
    path("api/rooms/", RoomAPIView.as_view()),
    path("api/rooms/<int:pk>/", RoomDetailAPIView.as_view()),
    path("api/messages/", MessageAPIView.as_view()),
    path("chat/users/", UserListView.as_view(), name="part"),
    path("chat/created/", RoomCreatedView.as_view(), name='room_created'),
]
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
