const nav_routes = document.getElementById("nav_routes");

document.addEventListener("DOMContentLoaded", () => {
  if(window.location.pathname !== '/' && !window.location.pathname.includes('post')){
    nav_routes.style.marginLeft = "-24px";
  }
});