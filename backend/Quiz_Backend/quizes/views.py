from django.shortcuts import render
from rest_framework import viewsets
from .models import Quiz,Category,Option,Question,QuizAttempt
from rest_framework import viewsets, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import OptionSerializer, QuizSerializer,CategorySerializer,QuestionSerialzer,QuizAttemptSerializer
# Create your views here.

class CategoryViewSets(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class QuizViewSets(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuestionViewSets(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerialzer

    def get_queryset(self):
        queryset = Question.objects.all()
        quiz_id = self.request.query_params.get('quiz')
        category_id = self.request.query_params.get('category')
        if quiz_id:
            queryset = queryset.filter(quiz_id=quiz_id)
        elif category_id:
            queryset = queryset.filter(quiz_category_id=category_id)

        return queryset
    
class OptionViewSets(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

class QuizAttemptViewSets(viewsets.ModelViewSet):
    queryset = QuizAttempt.objects.all()
    serializer_class = QuizAttemptSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return QuizAttempt.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)