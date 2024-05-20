document.addEventListener("DOMContentLoaded",()=> {

    const btn = document.getElementById("cmp-load-more-button")
    const total = document.getElementById("all_posts_total").innerText
    const alreadyLoaded = document.querySelectorAll("#company_card_wrapper").length
    

    if(Number(total) === Number(alreadyLoaded)){
        btn.style.display = "none"
    }else{
        btn.style.display = "flex"
    }
})


const loadMore = (btn) =>{

    const total = document.getElementById("all_posts_total").innerText
    const alreadyLoaded = document.querySelectorAll("#company_card_wrapper").length


    const urlObj = getUrlParams()
    if (!urlObj.hasOwnProperty("page")){
      urlObj.page = 2
    }else if (Number(total) > alreadyLoaded){
      urlObj.page = Number(urlObj.page) + 1
    }


    const url = buildUrlFromParams(urlObj)


    if(Number(total) > alreadyLoaded ){
        history.pushState(null,null,url)
        window.location.reload()
    }
    


}