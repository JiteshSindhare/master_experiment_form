from rest_framework import serializers
from .models import Experiment, Options, Question


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(required=False,many=True)
    class Meta:
        model = Question
        fields = '__all__'

class ExperimentSerialzer(serializers.ModelSerializer):
    questions = QuestionSerializer(required=False,many=True,read_only = True)
    class Meta:
        model = Experiment
        fields = '__all__'
        depth =3