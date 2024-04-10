from django.shortcuts import render, get_object_or_404, redirect
from .models import Post, Company, Advantage, Review, Guides, About, TagRating, TagPosts
from django.db.models import F, Sum, Q, Avg
from .forms import SearchForm
from django import forms
from .models import TagPosts, TagRating
from django.db.models.functions import TruncDate
from django.db.models import Count,OuterRef,Subquery
from collections import defaultdict
from datetime import datetime, timedelta
from django.core.paginator import Paginator





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
        security_score = company.securityscore_set.first()
        team_score = company.teamscore_set.first()
        product_score = company.productscore_set.first()
        

        company.product_score = product_score.total_score if product_score else 0
        company.team_score = team_score.total_score if team_score else 0
        company.security_score = security_score.total_score if security_score else 0
        if not hasattr(company, 'total_score_avg'):
            company.total_score_avg = (company.security_score + company.team_score + company.product_score) / 3

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

    for sub_post in related_posts_queryset:
        sub_post_tags = TagPosts.objects.filter(post__id=sub_post['id']).values('id', 'name')
        sub_post['tag_posts'] = list(sub_post_tags)
        if not sublists or len(sublists[-1]) == 3:
            sublists.append([sub_post])
        else:
            sublists[-1].append(sub_post)


    return render(request, 'blog/post_detail.html', {'post': post, 'related_posts': related_posts, 'tags_posts': tags_posts,'gmt':gmt_offset,'related_sidebar':sublists})




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

def about(request):
    about = About.objects.first()
    return render(request, 'blog/about.html', {'about': about, 'request': request})


def company_ratings(request):
    companies = Company.objects.all()
    return render(request, 'blog/companies.html', {'companies': companies, 'request': request})

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

def company_ratings(request):
    companies = Company.objects.all()
    sort_by = request.GET.get('sort_by')
    sort_order = request.GET.get('sort_order')
    
    if sort_by == 'date_added':
        companies = companies.order_by('-date_added' if sort_order == 'desc' else 'date_added')
    elif sort_by == 'security_score':
        companies = companies.order_by(
            '-securityscore__total_score' if sort_order == 'desc' else 'securityscore__total_score')
    elif sort_by == 'team_score':
        companies = companies.order_by('-teamscore__total_score' if sort_order == 'desc' else 'teamscore__total_score')
    elif sort_by == 'product_score':
        companies = companies.order_by(
            '-productscore__total_score' if sort_order == 'desc' else 'productscore__total_score')
    elif sort_by == 'total_score_avg':
        companies = companies.annotate(total_score_avg=(F('securityscore__total_score') + F(
            'teamscore__total_score') + F('productscore__total_score')) / 3)
        companies = companies.order_by('-total_score_avg' if sort_order == 'desc' else 'total_score_avg')
    for company in companies:
        security_score = company.securityscore_set.first()
        team_score = company.teamscore_set.first()
        product_score = company.productscore_set.first()
        company.security_score = security_score.total_score if security_score else 0
        company.team_score = team_score.total_score if team_score else 0
        company.product_score = product_score.total_score if product_score else 0
        if not hasattr(company, 'total_score_avg'):
            company.total_score_avg = (company.security_score + company.team_score + company.product_score) / 3

    return render(request, 'blog/companies.html', {'companies': companies})

def calculate_total_score_product(company):
    product_scores = company.productscore_set.first()
    performace_score = product_scores.performace_score
    apy_1yr_score = product_scores.apy_1yr_score
    apy_5yr_score = product_scores.apy_5yr_score
    total_score = (performace_score + apy_1yr_score + apy_5yr_score) / 3
    product_scores.total_score = total_score
    product_scores.save()

def calculate_total_score_team(company):
    team_scores = company.teamscore_set.first()
    decentralized_score = team_scores.decentralized_score
    performace_score = team_scores.performace_score
    total_score = (decentralized_score + performace_score) / 3
    team_scores.total_score = total_score
    team_scores.save()

def calculate_total_score_scurity(company):
    security_scores = company.securityscore_set.first()
    asset_secured_score = security_scores.asset_secured_score
    emission_limit_score = security_scores.emission_limit_score
    liquidity_score = security_scores.liquidity_score
    total_score = (asset_secured_score + emission_limit_score + liquidity_score) / 3
    security_scores.total_score = total_score
    security_scores.save()

def company_detail(request, company_id):
    company = get_object_or_404(Company, pk=company_id)
    companies = Company.objects.all()
    reviews = company.reviews.all()
    security_advantages = company.advantages.filter(position=1).order_by('-count')
    team_advantages = company.advantages.filter(position=2).order_by('-count')
    product_advantages = company.advantages.filter(position=3).order_by('-count')
    calculate_total_score_product(company)
    calculate_total_score_team(company)
    calculate_total_score_scurity(company)
    security_scores = company.securityscore_set.first()
    team_scores = company.teamscore_set.first()
    product_scores = company.productscore_set.first()
    if request.method == 'POST':
        name = request.POST.get('name')
        comment = request.POST.get('comment')
        rating = request.POST.get('rating')
        if rating == 'positive':
            rating = True
        elif rating == 'negative':
            rating = False
        review = Review(company=company, name=name, rating=rating, comment=comment)
        review.save()
        return redirect('company_detail', company_id=company.id)
    return render(request, 'blog/company_detail.html', {'company': company, 'companies': companies,'reviews': reviews, 'security_advantages': security_advantages, 'team_advantages': team_advantages, 'product_advantages': product_advantages, 'security_scores': security_scores, 'team_scores': team_scores, 'product_scores': product_scores})

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

    return redirect('company_detail', company_id=advantage.company.id)