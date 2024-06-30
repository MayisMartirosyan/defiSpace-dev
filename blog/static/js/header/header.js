document.addEventListener("DOMContentLoaded",()=> {
    const ticker = document.querySelector("#ticker");
    // const ticker = document.getElementById("ticker");
    const navbar_logo = document.getElementById("navbar_logo");
    const header = document.getElementById("header");
    const filter_btn =  document.querySelector('#header_filter_btn_div, #tags_selector_div_mobile');
   

    console.log(ticker,'ticker')
    
    if (window.location.pathname == "/" || window.location.pathname == "/companies/"){
     filter_btn.style.visibility = "visible";
    }else{
        filter_btn.style.visibility = 'hidden'
    }
    
    ////////////////// Active route //////////////////
    
    let nav_routes = document.getElementById("nav_routes");
    let btns = nav_routes.getElementsByClassName("nav_item");


    
    const currentUrl = window.location.pathname;
    
    for (let i = 0; i < btns.length; i++) {
        if (currentUrl === btns[i].children[0].getAttribute("href")) {
            btns[i].classList.add("nav_active");
            btns[i].children[0].children[0].style.color = "white";
        }

        if(btns[i].textContent.includes('News') && currentUrl.includes("/post")){
            btns[i].classList.add("nav_active");
            btns[i].children[0].children[0].style.color = "white";
        }
    }
    let newsBtn = document.getElementById('nav_item_link_news');

  
    if(currentUrl.includes('/post')){
       
        newsBtn.classList.add("nav_active");
        newsBtn.children[0].style.color = "white";
    }   
    
    ////////////////// Scroll event //////////////////
    
    
    document.addEventListener("scroll", () => {
    
        let currentScrollPos = window.pageYOffset;
        let currentWidthOfPage =  window.innerWidth;
    
        if (currentScrollPos > 10) {
    
            ticker.style.width = "0px";
            // ticker.style.transition = "all 0.2s linear";
            header.style.width = "auto";
            // header.style.transition = "all 0.2s linear";
    
            for (let i = 0; i < btns.length; i++) {
                if (btns[i].className !== "nav_item nav_active") {
                    btns[i].style.display = "none";
                    // btns[i].style.transition = "all 0.2s linear";
                }
            }
        } else {
            ticker.style.width = "100%";
            // ticker.style.transition = "all 0.2s linear";
            header.style.width = "100%";
            // header.style.transition = "all 0.2s linear";
    
            for (let i = 0; i < btns.length; i++) {
                if (btns[i].className !== "nav_item nav_active") {
                    btns[i].style.display = "block";
                    // btns[i].style.transition = "all 0.2s linear";
                }
            }
        }
    
        prevScrollPos = currentScrollPos;
    
    })
    

})