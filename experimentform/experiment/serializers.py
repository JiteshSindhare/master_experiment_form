from rest_framework import serializers
from .models import Answer, Experiment, OptionAnswer, Options, Question

class AnswerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionAnswer
        fields = '__all__'

class FillAnswerSerializer(serializers.ModelSerializer):
    selected_option = AnswerOptionSerializer(required = False,many=True)
    class Meta:
        model = Answer
        fields = '__all__'

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(required=False,many=True)
    answer_of_question = FillAnswerSerializer(required=False,many=True)
    class Meta:
        model = Question
        fields = '__all__'

class ExperimentSerialzer(serializers.ModelSerializer):
    questions = QuestionSerializer(required=False,many=True,read_only = True)
    answer_of_experiment = FillAnswerSerializer(required=False,many=True)
    class Meta:
        model = Experiment
        fields = '__all__'
        depth =3