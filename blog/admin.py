from django.contrib import admin
from django import forms
from django.core.exceptions import ValidationError
from .models import (
    Post, Company, Review, Guides, About, SecurityScore, TeamScore,
    ProductScore, Advantage, TagPosts, TagRating
)

class TagRatingInline(admin.TabularInline):
    model = Post.tag_rating.through
    extra = 1

class PostAdmin(admin.ModelAdmin):
    inlines = [TagRatingInline]
    exclude = ('tag_rating',)

class BaseScoreForm(forms.ModelForm):
    def clean_asset_secured_score(self):
        value = self.cleaned_data.get('asset_secured_score', 1)
        if not (1 <= value <= 100):
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    def clean_emission_limit_score(self):
        value = self.cleaned_data.get('emission_limit_score', 1)
        if not (1 <= value <= 100):
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    def clean_liquidity_score(self):
        value = self.cleaned_data.get('liquidity_score', 1)
        if not (1 <= value <= 100):
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    def clean_decentralized_score(self):
        value = self.cleaned_data.get('decentralized_score', 1)
        if not (1 <= value <= 100):
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    def clean_performace_score(self):
        value = self.cleaned_data.get('performace_score', 1)
        if not (1 <= value <= 100):
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    def clean_apy_1yr_score(self):
        value = self.cleaned_data.get('apy_1yr_score', 1)
        if not (1 <= value <= 100):
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    def clean_apy_5yr_score(self):
        value = self.cleaned_data.get('apy_5yr_score', 1)
        if not (1 <= value <= 100):
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

class SecurityScoreForm(BaseScoreForm):
    class Meta:
        model = SecurityScore
        fields = '__all__'
        labels = {
            'emission_limit_score': 'Max Supply Score',
        }
        widgets = {
            'asset_secured_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
            'emission_limit_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
            'liquidity_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
        }

class TeamScoreForm(BaseScoreForm):
    class Meta:
        model = TeamScore
        fields = '__all__'
        labels = {
            'performace_score': 'Activity Score',
        }
        widgets = {
            'decentralized_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
            'performace_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
            'exposure_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
        }

# ProductScore form without label override (use defaults)
class ProductScoreForm(BaseScoreForm):
    class Meta:
        model = ProductScore
        fields = '__all__'
        labels = {
            'performace_score': 'Monthly Active Users',
        }
        widgets = {
            'performace_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
            'apy_1yr_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
            'apy_5yr_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
        }

# Inline admins
class SecurityScoreInline(admin.StackedInline):
    model = SecurityScore
    extra = 1
    max_num = 1
    fields = ['asset_secured_score', 'emission_limit_score', 'liquidity_score']
    form = SecurityScoreForm

class TeamcoreInline(admin.StackedInline):
    model = TeamScore
    extra = 1
    max_num = 1
    fields = ['decentralized_score', 'performace_score','exposure_score']
    form = TeamScoreForm

class ProductScoreInline(admin.StackedInline):
    model = ProductScore
    extra = 1
    max_num = 1
    fields = ['performace_score', 'apy_1yr_score', 'apy_5yr_score']
    form = ProductScoreForm

class AdvantageInline(admin.TabularInline):
    model = Advantage
    extra = 1


class AboutAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not About.objects.exists()


class CompanyAdminForm(forms.ModelForm):
    class Meta:
        model = Company
        fields = '__all__'
        widgets = {
            'published_at': forms.SelectDateWidget(years=range(1950, 2035)),
        }

    def clean_published_at(self):
        value = self.cleaned_data.get('published_at')
        if value is None:
            raise ValidationError("This field is required.")
        return value

# Company admin config
@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    form = CompanyAdminForm
    inlines = [SecurityScoreInline, TeamcoreInline, ProductScoreInline, AdvantageInline]

# Registering other models
admin.site.register(About, AboutAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Review)
admin.site.register(Guides)
admin.site.register(TagPosts)
admin.site.register(TagRating)
