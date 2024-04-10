from django.contrib import admin
from .models import Post, Company, Review, Guides, About, SecurityScore, TeamScore, ProductScore, Advantage, TagPosts, TagRating

class TagRatingInline(admin.TabularInline):
    model = Post.tag_rating.through
    extra = 1

class PostAdmin(admin.ModelAdmin):
    inlines = [
        TagRatingInline,
    ]
    exclude = ('tag_rating',)  # исключаем поле tag_rating из формы создания и редактирования

class SecurityScoreInline(admin.StackedInline):
    model = SecurityScore
    extra = 1
    max_num = 1
    fields = ['asset_secured_score', 'emission_limit_score', 'liquidity_score']

class TeamcoreInline(admin.TabularInline):
    model = TeamScore
    extra = 1
    max_num = 1
    fields = ['decentralized_score', 'performace_score']

class ProductcoreInline(admin.TabularInline):
    model = ProductScore
    extra = 1
    max_num = 1
    fields = ['performace_score', 'apy_1yr_score', 'apy_5yr_score']

class AdvantageInline(admin.TabularInline):
    model = Advantage
    extra = 1

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    inlines = [SecurityScoreInline, TeamcoreInline, ProductcoreInline, AdvantageInline]

admin.site.register(Post, PostAdmin)
admin.site.register(Review)
admin.site.register(Guides)
admin.site.register(About)
admin.site.register(TagPosts)
admin.site.register(TagRating)
