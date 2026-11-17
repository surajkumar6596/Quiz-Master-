from rest_framework import serializers
from .models import Category, Quiz,Question,QuizAttempt,Option



class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'question','option_text','is_correct']


class QuestionSerialzer(serializers.ModelSerializer):
    options = OptionSerializer(many = True, read_only= True)
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'marks', 'options']


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'category', 'description', 'time_limit_minutes',  'created_by','created_at']

class CategorySerializer(serializers.ModelSerializer):
    quiz = QuizSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'description','created_at','quiz']

class QuizAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model= QuizAttempt
        fields = '__all__'
        read_only_fields = ['user', 'completed_at'] 


