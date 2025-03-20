const newsButton = document.getElementById("nav_item_link_news");

document.addEventListener("DOMContentLoaded", () => {
  if(window.location.pathname !== '/' && !window.location.pathname.includes('post')){
    newsButton.style.paddingLeft = "0";
  }
});