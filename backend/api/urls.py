from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoctorViewSet, AppointmentViewSet, RegisterViewSet

router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'register', RegisterViewSet)

urlpatterns = [path('', include(router.urls))]