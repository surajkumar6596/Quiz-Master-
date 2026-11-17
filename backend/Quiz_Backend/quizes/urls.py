from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSets,QuizViewSets,OptionViewSets,QuizAttemptViewSets,QuestionViewSets

router = DefaultRouter()
router.register(r'categories', CategoryViewSets)

router.register(r'quizes', QuizViewSets)
router.register(r'options', OptionViewSets)
router.register(r'quiz_attempt', QuizAttemptViewSets)
router.register(r'question', QuestionViewSets)

urlpatterns = [
    path('', include(router.urls)),
]