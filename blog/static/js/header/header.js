

document.addEventListener("DOMContentLoaded",()=> {
    const ticker = document.getElementById("ticker");
    const navbar_logo = document.getElementById("navbar_logo");
    const header = document.getElementById("header");
    
    
    ////////////////// Active route //////////////////
    
    
    var nav_routes = document.getElementById("nav_routes");
    var btns = nav_routes.getElementsByClassName("nav_item");
    
    const currentUrl = window.location.pathname;
    
    for (var i = 0; i < btns.length; i++) {
        if (currentUrl === btns[i].children[0].getAttribute("href")) {
            btns[i].classList.add("nav_active");
            btns[i].children[0].children[0].style.color = "white";
        }
    }
    
    ////////////////// Scroll event //////////////////
    
    
    document.addEventListener("scroll", () => {
    
        let currentScrollPos = window.pageYOffset;
        let currentWidthOfPage =  window.innerWidth;
    
        if (currentScrollPos > 10) {
    
            ticker.style.width = "0px";
            ticker.style.transition = "all 0.5s linear";
            header.style.width = "auto";
            header.style.transition = "all 0.5s linear";
    
            for (let i = 0; i < btns.length; i++) {
                if (btns[i].className !== "nav_item nav_active") {
                    btns[i].style.display = "none";
                }
            }
        } else {
            ticker.style.width = "100%";
            ticker.style.transition = "all 0.5s linear";
            header.style.width = "100%";
            header.style.transition = "all 0.5s linear";
    
            for (let i = 0; i < btns.length; i++) {
                if (btns[i].className !== "nav_item nav_active") {
                    btns[i].style.display = "block";
                }
            }
        }
    
        prevScrollPos = currentScrollPos;
    
    })
    

})

