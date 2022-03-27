from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

urlpatterns = [

path('addExperiment',views.ExperimentView.as_view()
,name='addExperiment'),

path('toggleExperimentStatus/<int:pk>',views.ExperimentView.as_view()
,name='addExperiment'),

path('deleteExperiment/<int:pk>',views.ExperimentView.as_view()
,name='deleteExperiment'),

# To fetch detail of any particular experiment.
path('getExperiment/<int:pk>',views.ExperimentView.as_view()
,name='getExperiment'),

# To get experiment by its name.
path('getExperimentByName/<slug:key>',views.DoExperimentView.as_view()
,name='getExperimentByName'),

# Experiment response.
path('experimentResponse/<int:pk>',views.DoExperimentView.as_view()
,name='getExperimentByName'),

# To add question to an experiment.
path('addQuestion/<int:pk>',views.QuestionView.as_view()),

# To add option to a question.
path('addOption/<int:pk>',views.OptionView.as_view()),

#To get all experiments.
path('getAllExperiments',views.AllEpxeriment.as_view())

]