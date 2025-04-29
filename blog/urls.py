from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render

def custom_404(request, exception):
    return render(request, 'blog/custom_not_found.html', status=404)

def custom_500(request):
    return render(request, 'blog/custom_server_error.html', status=500)


urlpatterns = [
    path('guides/', views.guides, name='guides'),
    path('about/', views.about, name='about'),
    path('', views.post_list, name='post_list'),
    path('post/create/', views.post_create, name='post_create'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
    path('post/<int:post_id>/comment/', views.add_comment, name='add_comment'),
    path('invest/', views.company_ratings, name='company_ratings'),
    path('invest/<int:company_id>/', views.company_detail, name='company_detail'),
    path('add-comment/', views.add_comment, name='add_comment'),
    path('submit-reply/', views.submit_reply, name='submit_reply'),
    path('comments/<int:comment_id>/like/', views.like_comment, name='like_comment'),
    path('comments/<int:comment_id>/dislike/', views.dislike_comment, name='dislike_comment'),
    path('comments/<int:comment_id>/remove_like/', views.remove_like_comment, name='remove_like_comment'),
    path('comments/<int:comment_id>/remove_dislike/', views.remove_dislike_comment, name='remove_dislike_comment'),
    path('comments/<int:comment_id>/switch_to_like/', views.switch_to_like_comment, name='switch_to_like_comment'),
    path('comments/<int:comment_id>/switch_to_dislike/', views.switch_to_dislike_comment, name='switch_to_dislike_comment'),
    path('tags/<str:tag>/', views.tag_result, name='tag_result'),
    path('tags2/<str:tag>/', views.tag_projects_result, name='tag_projects_result'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

