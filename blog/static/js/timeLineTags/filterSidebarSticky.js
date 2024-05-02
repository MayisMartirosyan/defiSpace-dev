const news_projects_items_div = document.getElementById("news_projects_items_div");
const for_sidebar_sticky = document.getElementById("for_sidebar_sticky");
const currentHeight = news_projects_items_div.offsetHeight;

for_sidebar_sticky.style.height = `${currentHeight + 150}px`;