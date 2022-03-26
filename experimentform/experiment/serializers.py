from rest_framework import serializers
from .models import Experiment

class ExperimentSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Experiment
        fields = '__all__'
        depth =3