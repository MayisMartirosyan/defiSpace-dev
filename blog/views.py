from django.shortcuts import render, get_object_or_404, redirect
from .models import Post, Company, Advantage, Review, Guides, About, TagRating, TagPosts,Comment
from django.db.models import F, Sum,  Q, Value
from .forms import SearchForm
from django import forms
from django.db.models.functions import TruncDate,Coalesce
from django.db.models import Count,OuterRef,Subquery
from collections import defaultdict
from datetime import datetime, timedelta
from django.forms.models import model_to_dict
from .helpers import handle_add_company_fields
from django.http import JsonResponse






class SearchForm(forms.Form):
    q = forms.CharField(label='Query', required=False)
    tag_posts = forms.ModelMultipleChoiceField(queryset=TagPosts.objects.all(), widget=forms.CheckboxSelectMultiple,
                                               required=False)
    tag_rating = forms.ModelMultipleChoiceField(queryset=TagRating.objects.all(), widget=forms.CheckboxSelectMultiple,
                                                required=False)
    period_choices = [
        ('today', 'Today'),
        ('yesterday', 'Yesterday'),
        ('week', 'This week'),
        ('month', 'This month'),
        ('year', 'This year'),
        ('all_time', 'All time'),
    ]
    period = forms.ChoiceField(choices=period_choices, required=False)


def post_list(request):
    
    page_number = request.GET.get('page')
    items_per_page = int(page_number) * 12 if page_number else 12


    latest_posts = Post.objects.order_by('-pub_date')[:4]  # latest 4 blog posts new for a slider
    posts = Post.objects.all()
    tags_posts = TagPosts.objects.all() 
    tags_rating = TagRating.objects.all() 
    edit_pick = Post.objects.filter(pin=True) 
    companies = Company.objects.filter(mark=True)
    


    search_form = SearchForm(request.GET)
    if search_form.is_valid():
        q = search_form.cleaned_data.get('q')
        tag_posts = search_form.cleaned_data.get('tag_posts', [])
        tag_rating = search_form.cleaned_data.get('tag_rating', [])
        period = search_form.cleaned_data.get('period')
        if q:
            posts = posts.filter(
                Q(title__icontains=q) | Q(content__icontains=q)
            )
        if tag_posts:
            posts = posts.filter(tag_posts__in=tag_posts)
           
        if tag_rating:
            posts = posts.filter(tag_rating__in=tag_rating)
           
        if period == 'today':
            posts = posts.filter(pub_date__date=datetime.now().date())
        elif period == 'yesterday':
            yesterday = datetime.now().date() - timedelta(days=1)
            posts = posts.filter(pub_date__date=yesterday)
        elif period == 'week':
            start_of_week = datetime.now().date() - timedelta(days=datetime.now().weekday())
            posts = posts.filter(pub_date__date__gte=start_of_week)
        elif period == 'month':
            start_of_month = datetime.now().date().replace(day=1)
            posts = posts.filter(pub_date__date__gte=start_of_month)
        elif period == 'year':
            start_of_year = datetime.now().date().replace(month=1, day=1)
            posts = posts.filter(pub_date__date__gte=start_of_year)
            
    total = posts.values().distinct().count()

 
    posts_by_date = defaultdict(list)

    tag_posts_subquery = TagPosts.objects.filter(post=OuterRef('pk')).values('name').annotate(count=Count('name')).values('name')[:1]
    
    latest_paginated_posts = posts.order_by('-pub_date')[:items_per_page]
    
    posts_by_day = latest_paginated_posts.annotate(
    date=TruncDate('pub_date')
    ).values(
    'date', 'title', 'content', 'pub_date','id',"image"
    ).annotate(
    count=Count('id'),
    tag_posts=Subquery(tag_posts_subquery)
    )
    

    for post in posts_by_day:
        id = post["id"]
        local_id = f'{post["id"]}post'
        post_date = post['date']
        title = post['title']
        content = post['content']
        pub_datetime = post['pub_date']
        image = post['image']
        tags = list(
        TagPosts.objects.filter(post=post['id']).values_list('name', flat=True)
        )
       
        posts_by_date[post_date].append({'id':id,'title': title,'time_published': pub_datetime,'content':content,'tags':tags,'image':image,'local_id':local_id})

    grouped_posts = [{'date': date, 'posts': posts} for date, posts in posts_by_date.items()]
    

    
    for company in companies:
        handle_add_company_fields(company=company)


    return render(request, 'blog/post_list.html', {
        'posts': posts,
        'latest_posts': latest_posts,
        'tags_posts': tags_posts,
        'tags_rating': tags_rating,
        'posts_by_date':{"posts":grouped_posts,"totalCount":total},
        'edit_pick': edit_pick,
        'search_form': search_form,
        'company': companies,
    })


def post_detail(request, pk):  
    post = get_object_or_404(Post, pk=pk)
    related_posts = Post.objects.filter(company=post.company).exclude(pk=pk)
    tags_posts = TagPosts.objects.all()
    gmt_offset_hours = post.pub_date.utcoffset().total_seconds() / 3600
    gmt_offset = f'{"+" if gmt_offset_hours >= 0 else "-"}{abs(int(gmt_offset_hours)):02}:00'
    related_posts_queryset = related_posts.values('id','title', 'pub_date')
   
    sublists = []
    if post.company:
        company = post.company    
        handle_add_company_fields(company=company)

    for sub_post in related_posts_queryset:
        sub_post_tags = TagPosts.objects.filter(post__id=sub_post['id']).values('id', 'name')
        sub_post['tag_posts'] = list(sub_post_tags)
        if not sublists or len(sublists[-1]) == 3:
            sublists.append([sub_post])
        else:
            sublists[-1].append(sub_post)
            
    return render(request, 'blog/post_detail.html', {'post': post,'related_posts': related_posts, 'tags_posts': tags_posts,'gmt':gmt_offset,'related_sidebar':sublists})

def company_ratings(request):
    
    page_number = request.GET.get('page')
    items_per_page = int(page_number) * 12 if page_number else 12
    
    companies = Company.objects.all()
    top_companies = companies.filter(mark=True)[:3]
    all_tag_ratings = TagRating.objects.all() 
    
    sort_by = request.GET.getlist('sort_by')
    sort_order = request.GET.get('sort_order', 'asc')  # Default to "desc"
    query_tag_rating = request.GET.getlist('tag_rating')
    order_prefix = "" if sort_order == "desc" else "-"  # "-" for descending order
    
    print(sort_order,'asdasadssd')
    companies = companies.annotate(
    security_score=Coalesce(F('security_scores__total_score'), Value(1)),
    team_score=Coalesce(F('team_scores__total_score'), Value(1)),
    product_score=Coalesce(F('product_scores__total_score'), Value(1))
)
    
    # if 'launched' in sort_by:
    #     companies = companies.order_by(f'{order_prefix}date_added')
        
    # if 'security' in sort_by:
    #     companies = companies.order_by(f'{order_prefix}security_scores__total_score')
    # if 'team' in sort_by:
    #     companies = companies.order_by(f'{order_prefix}team_scores__total_score')
        
    # if 'product' in sort_by:
    #     companies = companies.order_by(f'{order_prefix}product_scores__total_score')
        
    if 'launched' in sort_by:
        companies = companies.order_by(f'{order_prefix}date_added')
    elif 'security' in sort_by:
        companies = companies.order_by(f'{order_prefix}security_score')  # Using annotated field
    elif 'team' in sort_by:
        companies = companies.order_by(f'{order_prefix}team_score')  # Using annotated field
    elif 'product' in sort_by:
        companies = companies.order_by(f'{order_prefix}product_score')  # Using annotated field
        
    if 'totalScore' in sort_by or not sort_by: 
        companies = companies.annotate(
    average_score=(
        Coalesce(F('security_scores__total_score'), Value(1)) +
        Coalesce(F('team_scores__total_score'), Value(1)) +
        Coalesce(F('product_scores__total_score'), Value(1))
    ) / 3
)
        companies = companies.order_by(f'{order_prefix}average_score')
        
    
    if query_tag_rating:
        companies = companies.filter(tag_rating__in=query_tag_rating)

    for company in companies:
        handle_add_company_fields(company=company)
        
    for top_cmp in top_companies:
        handle_add_company_fields(company=top_cmp)
    

    total = companies.values().distinct().count()
    
    latest_paginated_companies = companies[:items_per_page]

    return render(request, 'blog/companies.html', {'companies': latest_paginated_companies,"top_companies":top_companies,"all_tag_ratings": all_tag_ratings,"total":total})


def about(request):
    about_instance = get_object_or_404(About)
    return render(request, 'blog/about.html', {'about': about_instance})


def tag_result(request, tag):
    tag_obj = TagPosts.objects.get(name=tag)
    posts_with_tag = Post.objects.filter(tag_posts=tag_obj)
    return render(request, 'blog/tag_result.html', {'tag': tag_obj, 'posts': posts_with_tag})

def tag_projects_result(request, tag):
    tag_obj_projects = TagRating.objects.get(name=tag)
    companies_with_tag = Company.objects.filter(tag_rating=tag_obj_projects)
    return render(request, 'blog/tag_projects_result.html', {'tag2': tag_obj_projects, 'companies': companies_with_tag})

def guides(request):
    guides = Guides.objects.all()
    return render(request, 'blog/guides.html', {'guides': guides, 'request': request})




def post_create(request):
    if request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        post = Post(title=title, content=content)
        post.save()
        return redirect('post_detail', pk=post.id)
    else:
        return render(request, 'blog/post_create.html')

def add_comment(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    if request.method == 'POST':
        name = request.POST.get('name')
        content = request.POST.get('content')
        if name and content:
            comment = Comment(post=post, name=name, content=content)
            comment.save()
    return redirect('post_detail', pk=post_id)


def company_detail(request, company_id):
    
    company = get_object_or_404(Company, pk=company_id)

    company.product_score_obj = company.product_scores.first()
    company.team_score_obj = company.team_scores.first()
    company.security_score_obj = company.security_scores.first()
    handle_add_company_fields(company=company)
    
    
    related_posts = company.related_posts.all() 
    related_posts_queryset = related_posts.values('id','title', 'pub_date')
    main_comments = Comment.objects.filter(company=company, parent__isnull=True).order_by('-created_at')
   
    sublists = []
    comments_data = []
    
    for sub_post in related_posts_queryset:
        sub_post_tags = TagPosts.objects.filter(post__id=sub_post['id']).values('id', 'name')
        sub_post['tag_posts'] = list(sub_post_tags)
        if not sublists or len(sublists[-1]) == 3:
            sublists.append([sub_post])
        else:
            sublists[-1].append(sub_post)
    
    for comment in main_comments:
        
        replies = comment.replies.all().order_by('-created_at')
        comment_data = {
            'id': comment.id,
            'name': comment.name,
            'description': comment.description,  # Fixed field name
            'category': comment.category if comment.category else None,
            'subcategory': comment.subcategory if comment.subcategory else None ,
            'likes': comment.likes,
            'dislikes': comment.dislikes,
            'created_at': comment.created_at.strftime('%d %b %Y, %H:%M %p'),
            'replies': [
                {
                    'id': reply.id,
                    'name': reply.name,
                    'description': reply.description,
                    'category': reply.category.name if reply.category else None,
                    'subcategory': reply.subcategory,
                    'likes': reply.likes,
                    'dislikes': reply.dislikes,
                    'created_at': reply.created_at.strftime('%d %b %Y, %H:%M %p'),
                } for reply in replies
            ]
        }
        comments_data.append(comment_data)
    print(comments_data,'asdasdasdasdasdad')

    # if request.headers.get('X-Requested-With') == 'XMLHttpRequest':  # AJAX Request
    #     return JsonResponse(comments_data, safe=False)
    

    return render(request, 'blog/company_detail.html',
                  {'company': company, 
                   'related_posts':sublists,
                   'main_comments':comments_data
                   })
    
    
def add_comment(request, company_id):
    """ Saves a new comment or reply for a specific company """
    company = get_object_or_404(Company, id=company_id)

    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        comment_text = request.POST.get('comment', '').strip()
        rating = request.POST.get('rating')
        parent_id = request.POST.get('parent_id')  # Parent comment ID for replies

        if not name or not comment_text:
            return JsonResponse({'error': 'Name and comment are required!'}, status=400)

        rating = True if rating == 'positive' else False
        parent_comment = Comment.objects.filter(id=parent_id).first() if parent_id else None
        new_comment = Comment.objects.create(company=company, name=name, comment=comment_text, rating=rating, parent=parent_comment)

        return JsonResponse({
            'message': 'Comment added successfully!',
            'comment': {
                'name': new_comment.name,
                'comment': new_comment.comment,
                'rating': 'Positive' if new_comment.rating else 'Negative',
                'created_at': new_comment.created_at.strftime('%d %b %Y, %H:%M %p')
            }
        }, status=201)

    return JsonResponse({'error': 'Invalid request'}, status=400)

def add_advantage(request, company_id):
    company = get_object_or_404(Company, pk=company_id)
    if request.method == 'POST':
        position = request.POST.get('position')
        advantage = request.POST.get('advantage')
        mark = request.POST.get('mark')
        count = 1
        if mark == 'positive':
            mark = True
        elif mark == 'negative':
            mark = False
        if advantage and position:
            advantage = Advantage.objects.create(
                company=company,
                position=position,
                advantage=advantage,
                mark=mark,
                count=count)
            advantage.save()
    return redirect('company_detail', company_id=company_id)

def increment_advantage(request, advantage_id):
    advantage = get_object_or_404(Advantage, pk=advantage_id)

    if request.method == 'POST':
        if advantage.position == 1 or advantage.position == 2 or advantage.position == 3:
            advantage.count += 1
            advantage.save()
            advantages = Advantage.objects.filter(company=advantage.company, position=advantage.position)
            total_count = advantages.aggregate(total_count=Sum('count'))['total_count']
            if total_count > 100:
                advantages.update(count=F('count') * 100 / total_count)
                total_count = 100
            remaining_percent = 100 - total_count
            remaining_advantages = advantages.exclude(id=advantage.id)
            remaining_count = remaining_advantages.count()
            if remaining_count > 0:
                remaining_percent_per_advantage = remaining_percent / remaining_count
                for adv in remaining_advantages:
                    adv.count += remaining_percent_per_advantage
                    adv.save()
            total_count = advantages.aggregate(total_count=Sum('count'))['total_count']
            if total_count < 100:
                remaining_percent = 100 - total_count
                advantage.count += remaining_percent
                advantage.save()

    return redirect('company_detail_old_version', company_id=advantage.company.id)