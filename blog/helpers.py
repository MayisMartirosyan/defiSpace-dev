def handle_add_company_fields(company):
    
    product_scores = company.product_scores.first() 
    team_scores = company.team_scores.first()  
    security_scores = company.security_scores.first() 
    

    product_score_total = product_scores.total_score if product_scores else 1
    team_score_total = team_scores.total_score if team_scores else 1
    security_score_total = security_scores.total_score if security_scores else 1
    
    average_score = round(min((product_score_total + team_score_total + security_score_total) / 3,100))

    company.product_score = product_score_total
    company.team_score = team_score_total
    company.security_score = security_score_total
    company.average_score = average_score 
    company.team_score_first_formatted = 50 - company.team_score / 2
    company.team_score_second_formatted = 50 + company.team_score / 2
    company.security_score_formatted = 50 + company.security_score / 2
    company.product_score_formatted  = 50 - company.product_score / 2
    
    company.product_score_formatted_2  =  437 - company.product_score * 1.6
    company.team_score_formatted_2  = 437 - company.team_score * 1.6
    company.security_score_formatted_2  = 437 - company.security_score * 1.6
    