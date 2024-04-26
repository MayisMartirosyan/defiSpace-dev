def handle_add_company_fields(company):
    
    product_scores = company.product_scores.first() 
    team_scores = company.team_scores.first()  
    security_scores = company.security_scores.first() 
        

    product_score_total = product_scores.total_score if product_scores else 0
    team_score_total = team_scores.total_score if team_scores else 0
    security_score_total = security_scores.total_score if security_scores else 0

    average_score = round(min((product_score_total + team_score_total + security_score_total) / 3,100))

    company.product_score = product_score_total
    company.team_score = team_score_total
    company.security_score = security_score_total
    company.average_score = average_score    