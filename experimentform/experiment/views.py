from unicodedata import name
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import requests
import logging

from experiment.models import Experiment, Question, Options, OptionAnswer, Answer
from experiment.serializers import ExperimentSerialzer, QuestionSerializer, OptionSerializer

# Initialize logger variable
logger = logging.getLogger(__name__)
Error_Occured = 'Error occured'

class ExperimentView(APIView):
    """To add experiment"""
    def post(self,request):
        try:
            experiment_name = request.data.get("name",'')
            experiment_name_check = experiment_name.strip()
            # experiment_name_check = experiment_name_check.replace('-','')
            # experiment_name_check = experiment_name_check.lower()
            if Experiment.objects.filter(experiment_name__icontains=experiment_name_check):
                response = {
                    "message" : "Similar experiment name exist."
                }
                return Response(response,status=status.HTTP_400_BAD_REQUEST)
            if len(experiment_name) == 0 or len(experiment_name.strip()) == 0:
                response = {
                    "message" : "Experiment name cannot be empty."
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

    def put(self,request,pk):
        """pk: id of experiment whose status you want to change."""
        try:
            experiment_instance = Experiment.objects.get(id=pk)
            experiment_instance.status = 0 if experiment_instance.status == 1 else 1
            experiment_instance.save()
            status_code = status.HTTP_200_OK
            experiment_serialized = ExperimentSerialzer(experiment_instance)
            response = {
                'data': experiment_serialized.data,
                'success': True,
                'status_code': status_code,
                'message': 'Experiment status changed successfully',
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
            experiment_instance = Experiment.objects.get(id=pk)
            experiment_serialized = ExperimentSerialzer(experiment_instance).data
            status_code = status.HTTP_200_OK
            response = {
                'data' : experiment_serialized,
                'success': True,
                'status_code': status_code,
                'message': 'Experiment fetched successfully.',
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

class AllEpxeriment(APIView):
    def get(self,request):
        try:
            experiment_instance = Experiment.objects.all().order_by('id')
            if Experiment.objects.all().__len__ == 1:
                experiment_serialized = ExperimentSerialzer(experiment_instance)
            else:   
                experiment_serialized = ExperimentSerialzer(experiment_instance,many=True)
            status_code = status.HTTP_200_OK
            response = {
                'data' : experiment_serialized.data,
                'success': True,
                'status_code': status_code,
                'message': 'Experiment fetched successfully.',
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
class QuestionView(APIView):
    """To create question."""
    def post(self,request,pk):
        """pk: id of experiment of which this question is part of."""
        try:
            question = request.data.get('question','')
            option_type = int(request.data.get('type',''))

            experiment_instance = Experiment.objects.get(id=pk)
            question_instance = Question()
            question_instance.question = question
            question_instance.experiment_id = experiment_instance
            question_instance.question_type = option_type
            question_instance.save()

            status_code = status.HTTP_200_OK
            question_serialized = QuestionSerializer(question_instance)
            response = {
                'data': question_serialized.data,
                'success': True,
                'status_code': status_code,
                'message': 'Question created successfully',
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

class OptionView(APIView):
    """To create options of a question."""
    def post(self,request,pk):
        try:
            option_name = request.data.get('option_name','')
            if len(option_name) == 0 or len(option_name.strip()) == 0:
                response = {
                    "error" : "Option name cannot be empty."
                }
                return Response(response,status=status.HTTP_400_BAD_REQUEST)
            question_instance = Question.objects.get(id=pk)
            options_instance = Options()
            options_instance.option_name = option_name
            options_instance.question_id = question_instance
            options_instance.save()
            status_code = status.HTTP_200_OK
            option_serialized = OptionSerializer(options_instance)
            response = {
                'data': option_serialized.data,
                'success': True,
                'status_code': status_code,
                'message': 'Option created successfully',
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

class DoExperimentView(APIView):
    """To get experiment by there name, and to submit response"""
    def get(self,request,key):
        """key: is name of the experiment.
        This route is to get experiment by there name."""
        try:
            
            experiment_name_check = key.strip()
            experiment_name_check = experiment_name_check.replace('-',' ')
            experiment_name_check = experiment_name_check.lower()
            response = {}
            if Experiment.objects.filter(experiment_name__icontains=experiment_name_check):
                experiment_instance = Experiment.objects.filter(experiment_name__icontains=experiment_name_check)
                experiment_serialized = ExperimentSerialzer(experiment_instance,many=True).data
                for i,experiment in enumerate(experiment_serialized):
                    for question in experiment['questions']:
                        question['answer'] = ''
                status_code = status.HTTP_200_OK
                response = {
                'data' : experiment_serialized,
                'success': True,
                'status_code': status_code,
                'message': 'Experiment fetched successfully.',
                }
            else:
                response = {
                    "message" : " Experiment does not exist."
                }
                return Response(response,status=status.HTTP_400_BAD_REQUEST)

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

    def post(self,request,pk):
        """pk is id of experiment.
        This method is to submit response of experiment."""
        try:
            experiment_response = request.data.get('response','')
            experiment_instance = Experiment.objects.get(id=pk)
            for response in experiment_response[0]['questions']:
                answer_instance = Answer()
                answer_instance.experiment_id = experiment_instance
                question_instance = Question.objects.get(id=response['id'])
                answer_instance.question_id = question_instance
                if response['question_type'] == 2:
                    option_instance = Options.objects.get(id=response['answer'])
                    answer_instance.answer = option_instance.option_name
                else:
                    answer_instance.answer = response['answer']
                answer_instance.save()

                if response['question_type'] == 2:
                    option_instance = Options.objects.get(id=response['answer'])
                    answer_option_instance = OptionAnswer()
                    answer_option_instance.option_id = option_instance
                    answer_option_instance.answer_id = answer_instance
                    answer_option_instance.save()
            experiment_instance_serialized = ExperimentSerialzer(experiment_instance).data
            status_code = status.HTTP_200_OK
            response = {
                'data': experiment_instance_serialized,
                'success': 'True',
                'status_code': status_code,
                'message': 'Response submitted.'
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