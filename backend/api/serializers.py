from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Doctor, Appointment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, v): return User.objects.create_user(**v)

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.ReadOnlyField(source='doctor.name')
    specialty = serializers.ReadOnlyField(source='doctor.specialty')
    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'doctor_name', 'specialty', 'date', 'reason', 'status']