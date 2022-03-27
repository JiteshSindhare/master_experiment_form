from django.db import models

# Create your models here.
class Experiment(models.Model):
    id = models.AutoField(primary_key=True)
    experiment_name = models.CharField(max_length=120)
    # 1 for active , 0 for inactive/disabled
    status = models.PositiveSmallIntegerField(default=1)

class Question(models.Model):
    id = models.AutoField(primary_key=True)
    experiment_id = models.ForeignKey(Experiment,on_delete=models.CASCADE,related_name='questions')
    question = models.TextField()
    # 0 => single line , 1=>multiple line , 2=> options
    question_type = models.PositiveSmallIntegerField()

class Options(models.Model):
    id = models.AutoField(primary_key=True)
    option_name = models.CharField(max_length=250)
    question_id = models.ForeignKey(Question,on_delete=models.CASCADE,related_name='options')

class Answer(models.Model):
    id = models.AutoField(primary_key=True)
    experiment_id = models.ForeignKey(Experiment,on_delete=models.CASCADE,related_name='answer_of_experiment')
    question_id = models.ForeignKey(Question,on_delete=models.CASCADE,related_name='answer_of_question')
    answer = models.CharField(max_length=250)

class OptionAnswer(models.Model):
    id = models.AutoField(primary_key=True)
    option_id = models.ForeignKey(Options,on_delete=models.CASCADE,related_name='selected_option_answer')
    answer_id = models.ForeignKey(Answer,on_delete=models.CASCADE,related_name='selected_option')