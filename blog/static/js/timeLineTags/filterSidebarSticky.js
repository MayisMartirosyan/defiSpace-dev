const news_project_items_div_decor_and_items = document.getElementById("news_project_items_div_decor_and_items");
const for_sidebar_sticky = document.getElementById("for_sidebar_sticky");
const currentHeight = news_project_items_div_decor_and_items.offsetHeight;

for_sidebar_sticky.style.height = `${currentHeight + 150}px`;