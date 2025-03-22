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
    inlines = [
        TagRatingInline,
    ]
    exclude = ('tag_rating',)

# Custom form to enforce validation
class ScoreForm(forms.ModelForm):
    def clean_asset_secured_score(self):
        value = self.cleaned_data.get('asset_secured_score', 1)  # Default value if empty
        if value < 1:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        elif value > 100:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    def clean_emission_limit_score(self):
        value = self.cleaned_data.get('emission_limit_score', 1)  # Default value if empty
        if value < 1:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        elif value > 100:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    def clean_liquidity_score(self):
        value = self.cleaned_data.get('liquidity_score', 1)  # Default value if empty
        if value < 1:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        elif value > 100:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    def clean_decentralized_score(self):
        value = self.cleaned_data.get('decentralized_score', 1)  # Default value if empty
        if value < 1:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        elif value > 100:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    def clean_performace_score(self):
        value = self.cleaned_data.get('performace_score', 1)  # Default value if empty
        if value < 1:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        elif value > 100:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    def clean_apy_1yr_score(self):
        value = self.cleaned_data.get('apy_1yr_score', 1)  # Default value if empty
        if value < 1:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        elif value > 100:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    def clean_apy_5yr_score(self):
        value = self.cleaned_data.get('apy_5yr_score', 1)  # Default value if empty
        if value < 1:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        elif value > 100:
            raise ValidationError("Value must be at least 1 and no more than 100.")
        return value

    class Meta:
        widgets = {
            'asset_secured_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
            'emission_limit_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
            'liquidity_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
            'decentralized_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
            'performace_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
            'apy_1yr_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
            'apy_5yr_score': forms.NumberInput(attrs={'min': 1, 'max': 100}),
        }

class SecurityScoreInline(admin.StackedInline):
    model = SecurityScore
    extra = 1
    max_num = 1
    fields = ['asset_secured_score', 'emission_limit_score', 'liquidity_score']
    form = ScoreForm

class TeamcoreInline(admin.StackedInline):
    model = TeamScore
    extra = 1
    max_num = 1
    fields = ['decentralized_score', 'performace_score']
    form = ScoreForm

class ProductScoreInline(admin.StackedInline):
    model = ProductScore
    extra = 1
    max_num = 1
    fields = ['performace_score', 'apy_1yr_score', 'apy_5yr_score']
    form = ScoreForm

class AdvantageInline(admin.TabularInline):
    model = Advantage
    extra = 1

class AboutAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not About.objects.exists()

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    inlines = [SecurityScoreInline, TeamcoreInline, ProductScoreInline, AdvantageInline]

admin.site.register(About, AboutAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Review)
admin.site.register(Guides)
admin.site.register(TagPosts)
admin.site.register(TagRating)
