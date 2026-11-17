from django.db import models
from accounts.models import Users
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Quiz(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name = 'quiz')
    description = models.TextField()
    time_limit_minutes = models.IntegerField(default=10)
    created_by = models.ForeignKey(Users, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    question_text = models.TextField()
    marks = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quiz.title} - {self.question_text[:50]}"

class Option(models.Model):
    question  = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    option_text = models.TextField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.option_text} ({'Correct' if self.is_correct else 'Wrong'})"

class QuizAttempt(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='attempt')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='attempt')
    score = models.FloatField(default=0.0)
    total_questions = models.IntegerField(default=0)
    correct_answer = models.IntegerField(default=0)
    completed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title} - Score: {self.score}"