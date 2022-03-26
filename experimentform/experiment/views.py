from unicodedata import name
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import requests
import logging

from experiment.models import Experiment, Question
from experiment.serializers import ExperimentSerialzer

# Initialize logger variable
logger = logging.getLogger(__name__)
Error_Occured = 'Error occured'

class ExperimentView(APIView):
    """To add experiment"""
    def post(self,request):
        try:
            experiment_name = request.data.get("name",'')
            if len(experiment_name) == 0 or len(experiment_name.strip()) == 0:
                response = {
                    "error" : "Experiment name cannot be empty."
                }
                return Response(response,status=status.HTTP_400_BAD_REQUEST)

            experiment_instance = Experiment()
            experiment_instance.experiment_name = experiment_name
            experiment_instance.save()

            compulsory_fields = ['Name','Email address','Phone']
            for field in compulsory_fields:
                question_instance = Question()
                question_instance.experiment_id = experiment_instance
                question_instance.question = field
                question_instance.question_type = 0
                question_instance.save()
            status_code = status.HTTP_200_OK
            experiment_serialized = ExperimentSerialzer(experiment_instance)
            response = {
                'data': experiment_serialized.data,
                'success': True,
                'status_code': status_code,
                'message': 'Experiment creation started successfully',
            }
            return Response(response, status=status_code)
        except Exception as e:
            logger.error(Error_Occured)
            logger.exception("message")
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                # 'data':e,
                'succes': 'False',
                'status_code': status_code,
            }
            return Response(response, status=status_code)
    
    def delete(self,request,pk):
        """
        pk is id of experiment.
        """
        try:
            Experiment.objects.get(id=pk).delete()
            status_code = status.HTTP_200_OK
            response = {
                'success': True,
                'status_code': status_code,
                'message': 'Experiment deleted successfully.',
            }
            return Response(response, status=status_code)
        except Exception as e:
            logger.error(Error_Occured)
            logger.exception("message")
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                # 'data':e,
                'succes': 'False',
                'status_code': status_code,
            }
            return Response(response, status=status_code)
    
    def get(self,request,pk):
        """pk is id of experiment."""
        try:
            logger.info('~~~~~~~~~~~~~~~~~~IT IS HERE')
            experiment_instance = Experiment.objects.get(id=pk)
            experiment_serialized = ExperimentSerialzer(experiment_instance)
            status_code = status.HTTP_200_OK
            response = {
                'data' : experiment_serialized,
                'success': True,
                'status_code': status_code,
                'message': 'Experiment deleted successfully.',
            }
            return Response(response, status=status_code)
        except Exception as e:
            logger.error(Error_Occured)
            logger.exception("message")
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                # 'data':e,
                'succes': 'False',
                'status_code': status_code,
            }
            return Response(response, status=status_code)

