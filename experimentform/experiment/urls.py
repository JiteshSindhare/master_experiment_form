from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

urlpatterns = [
    
path('addExperiment',views.ExperimentView.as_view()
,name='addExperiment'),
path('deleteExperiment/<int:pk>',views.ExperimentView.as_view()
,name='deleteExperiment'),
path('getExperiment/<int:pk>',views.ExperimentView.as_view()
,name='getExperiment'),

]