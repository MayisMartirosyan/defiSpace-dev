from django import forms
from .models import TagPosts, TagRating

class SearchForm(forms.Form):
    q = forms.CharField(label='Query', required=False)
    tag_posts = forms.ModelMultipleChoiceField(queryset=TagPosts.objects.all(), widget=forms.CheckboxSelectMultiple, required=False)
    tag_rating = forms.ModelMultipleChoiceField(queryset=TagRating.objects.all(), widget=forms.CheckboxSelectMultiple, required=False)