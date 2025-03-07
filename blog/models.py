from django.db import models

class TagPosts(models.Model):
    name = models.CharField(max_length=50)
    def str(self):
        return self.name

class TagRating(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    def str(self):
        return self.name

class Guides(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    def str(self):
        return self.title


    
class Company(models.Model):
    name = models.CharField(max_length=200)
    ticker = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    rating = models.FloatField(default=0)
    tag_rating = models.ManyToManyField('TagRating')
    image = models.ImageField(upload_to='company_images/', null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    link = models.CharField(max_length=200, null=True, blank=True)
    github = models.CharField(max_length=200, null=True, blank=True)
    mark = models.BooleanField('Отображать на главной в Projects Scoring', default=False, null=True)
    related_posts = models.ManyToManyField('Post', related_name='related_companies', blank=True)


    def __str__(self):
        return self.name

class ProductScore(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='product_scores')
    performace_score = models.IntegerField(default=0)
    apy_1yr_score = models.IntegerField(default=0)
    apy_5yr_score = models.IntegerField(default=0)
    total_score = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        self.total_score = (self.performace_score + self.apy_1yr_score + self.apy_5yr_score) / 3
        super().save(*args, **kwargs)

class TeamScore(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='team_scores')
    decentralized_score = models.IntegerField(default=0)
    performace_score = models.IntegerField(default=0)
    total_score = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        self.total_score = (self.decentralized_score + self.performace_score) / 2
        super().save(*args, **kwargs)

class SecurityScore(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='security_scores')
    asset_secured_score = models.IntegerField(default=0)
    emission_limit_score = models.IntegerField(default=0)
    liquidity_score = models.IntegerField(default=0)
    total_score = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        self.total_score = (self.asset_secured_score + self.emission_limit_score + self.liquidity_score) / 3
        super().save(*args, **kwargs)


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    story = models.TextField(default='', blank=True)
    pub_date = models.DateTimeField(auto_now_add=True)
    tag_posts = models.ManyToManyField(TagPosts)
    tag_rating = models.ManyToManyField(TagRating)
    image = models.ImageField(upload_to='post_images/', null=True, blank=True)
    pin = models.BooleanField('Отображать на главной в Editor Pick', default=False, null=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, related_name='post', null=True)

    def str(self):
        return self.title
    
    
class About(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    def str(self):
        return self.title
    

# Category model for better structure (optional, if you want to categorize comments)
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# User model for comment authors (if you don't have a user model, replace with a simple string)
class Author(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# Comment model to represent both main comments and replies
from django.db import models

class Comment(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='comments', null=True, blank=True) 
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='comments', null=True)
    subcategory = models.CharField(max_length=255, null=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    # Likes and Dislikes
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)

    # Reply functionality (Self-referencing ForeignKey)
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies'
    )
    
    objects = models.Manager()  


    def __str__(self):
        return f"Comment by {self.name} in {self.category.name if self.category else 'No Category'}"

    def get_replies(self):
        """Returns all replies for this comment"""
        return self.replies.all()

    @property
    def formatted_date(self):
        """Custom formatted date as per your example"""
        return self.created_at.strftime('%d %b %Y, %H:%M %p')

    @property
    def likes_count(self):
        """Returns the number of likes"""
        return self.likes

    @property
    def dislikes_count(self):
        """Returns the number of dislikes"""
        return self.dislikes

# Optionally, a model to track which users liked/disliked
class CommentReaction(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    like = models.BooleanField(default=False)  # True for like, False for dislike

    def __str__(self):
        return f"{'Like' if self.like else 'Dislike'} by {self.user.username}"


class Advantage(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='advantages')
    position = models.PositiveIntegerField()
    advantage = models.CharField(max_length=255)
    mark = models.BooleanField()
    count = models.IntegerField()
    class Meta:
        ordering = ['position']
    def str(self):
        return self.advantage

class Position(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    rating = models.BooleanField()
    comment = models.TextField()
    def str(self):
        return self.name
    
class Review(models.Model):
    company = models.ForeignKey(Company, related_name='reviews', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    rating = models.BooleanField()
    comment = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    def str(self):
        return self.name
