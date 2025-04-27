from .models import Comment
from django.db.models import Count

def handle_add_company_fields(company):
    
    scores = {
        'product': company.product_scores.first(),
        'team': company.team_scores.first(),
        'security': company.security_scores.first()
    }

    
    product_score_total = scores['product'].total_score if scores['product'] else 1
    team_score_total = scores['team'].total_score if scores['team'] else 1
    security_score_total = scores['security'].total_score if scores['security'] else 1
    
   
    average_score = round(min((product_score_total + team_score_total + security_score_total) / 3, 100))

   
    company.product_score = product_score_total
    company.team_score = team_score_total
    company.security_score = security_score_total
    company.average_score = average_score
    company.team_score_first_formatted = 50 - company.team_score / 2
    company.team_score_second_formatted = 50 + company.team_score / 2
    company.security_score_formatted = 50 + company.security_score / 2
    company.product_score_formatted = 50 - company.product_score / 2

    company.product_score_formatted_2 = 437 - company.product_score * 1.6
    company.team_score_formatted_2 = 437 - company.team_score * 1.6
    company.security_score_formatted_2 = 437 - company.security_score * 1.6

    
    subcategory_mapping = {
        'decentralization': 'team_decentralization_comment_count',
        'activity': 'team_activity_comment_count',
        'exposure': 'team_exposure_comment_count',
        'monthly_active_users': 'product_monthly_active_users_comment_count',
        'apy_1_year': 'product_apy_1_year_comment_count',
        'apy_5_years': 'product_apy_5_years_comment_count',
        'max_supply': 'security_max_supply_comment_count',
        'liquidity': 'security_liquidity_comment_count',
        'asset_secured': 'security_asset_secured_comment_count',
    }

   
    comment_counts = Comment.objects.filter(company=company) \
        .values('category', 'subcategory') \
        .annotate(comment_count=Count('id'))

   
    subcategory_counts = {field: 0 for field in subcategory_mapping.values()}

    for entry in comment_counts:
        normalized_subcategory = entry['subcategory'].strip().replace(' ', '_').lower()
        field_name = subcategory_mapping.get(normalized_subcategory)
        if field_name:
            subcategory_counts[field_name] = entry['comment_count']
        

    
    for field, count in subcategory_counts.items():
        setattr(company, field, count)

