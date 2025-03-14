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
    path('companies/', views.company_ratings, name='company_ratings'),
    path('companies/<int:company_id>/', views.company_detail, name='company_detail'),
    path('add_comment/<int:company_id>/', views.add_comment, name='add_comment'),
    path('companies/<int:company_id>/add-advantage/', views.add_advantage, name='add_advantage'),
    path('advantages/<int:advantage_id>/increment/', views.increment_advantage, name='increment_advantage'),
    path('tags/<str:tag>/', views.tag_result, name='tag_result'),
    path('tags2/<str:tag>/', views.tag_projects_result, name='tag_projects_result'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

