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
    company.team_score_first_formatted = 50 - company.team_score / 2
    company.team_score_second_formatted = 50 + company.team_score / 2
    company.security_score_formatted = 50 + company.security_score / 2
    company.product_score_formatted  = 50 - company.product_score / 2
    
    
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