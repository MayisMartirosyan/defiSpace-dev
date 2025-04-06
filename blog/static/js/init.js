const nav_routes = document.getElementById("nav_routes");
const marquee_routes_div = document.getElementById("marquee_routes_div");

document.addEventListener("DOMContentLoaded", () => {
  if(!(window.location.pathname !== '/' && !window.location.pathname.includes('post'))){
    marquee_routes_div.style.gap = "20px";
    // nav_routes.style.marginLeft = "-24px";
  }
});

function tagStop(event){
  event.stopPropagation();
}