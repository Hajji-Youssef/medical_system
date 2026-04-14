from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from .models import Doctor, Appointment
from .serializers import DoctorSerializer, AppointmentSerializer, UserSerializer

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.AllowAny]

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self): return Appointment.objects.filter(patient=self.request.user)
    def perform_create(self, s): s.save(patient=self.request.user)