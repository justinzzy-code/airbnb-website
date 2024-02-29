from django.urls import path
from . import views
from comments.views import *
app_name="comments"

    
urlpatterns = [
    path('create_comment/',views.CommentCreate.as_view()),
    path('get_comment/<int:id>/', views.CommentGetDetails.as_view()),
    path('update_comment/<int:id>/', views.CommentUpdate.as_view()),
    path('delete_comment/<int:id>/', views.CommentDelete.as_view()),
    path('all_comment/', views.AllCommentFilterView.as_view()),
    path('list_comment/', views.CommentList.as_view()),

    path('create_commentforuser/',views.CommentForUserCreate.as_view()),
    path('get_commentforuser/<int:id>/', views.CommentForUserGetDetails.as_view()),
    path('update_commentforuser/<int:id>/', views.CommentForUserUpdate.as_view()),
    path('delete_commentforuser/<int:id>/', views.CommentForUserDelete.as_view()),
    path('all_commentforuser/', views.AllCommentForUserFilterView.as_view()),
    path('list_commentforuser/', views.UserCommentList.as_view()),
]
