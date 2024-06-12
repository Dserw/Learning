from django.forms import ModelForm
from .models import Room, User


class RoomCreatedForm(ModelForm):

    class Meta:
        model = Room
        fields = ['name', 'slug', 'UserRoom']


class UserEditForm(ModelForm):

    class Meta:
        model = User
        fields = ['username', 'image']
