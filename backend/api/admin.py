from django.contrib import admin
from .models import Doctor, Appointment

# Enregistrement des modèles pour qu'ils apparaissent dans l'admin
admin.site.register(Doctor)
admin.site.register(Appointment)