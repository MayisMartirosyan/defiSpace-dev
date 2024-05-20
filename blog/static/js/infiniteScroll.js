

function isBottomOfPage() {
     // Calculate the distance between the bottom of the page and the bottom of the viewport
     const distanceToBottom = document.documentElement.offsetHeight - (window.scrollY + window.innerHeight);

     // You can adjust this threshold value as needed
     const threshold = 10;
 
     // Return true if the distance to the bottom is less than the threshold
     return distanceToBottom < threshold;
}


function replaceUrlForRequest(){

    const total = document.getElementById("all_posts_total").innerText

    const alreadyLoaded = document.querySelectorAll(".news_project_div").length

    
      const urlObj = getUrlParams()
      if (!urlObj.hasOwnProperty("page")){
        urlObj.page = 1
      }else if (total > alreadyLoaded){
        urlObj.page = Number(urlObj.page) + 1
      }


      const url = buildUrlFromParams(urlObj)


      history.pushState(null,null,url)
      window.location.reload()


}


window.addEventListener('scroll', () => {

    const total = document.getElementById("all_posts_total").innerText

    const alreadyLoaded = document.querySelectorAll(".news_project_div").length


    if (isBottomOfPage() && Number(total) > Number(alreadyLoaded)) {
        replaceUrlForRequest()
    }
});

// window.addEventListener('popstate', function(event) {
//     // Get the current URL
//     let currentUrl = window.location.href;

//     // Make an AJAX request to the server with the new URL
//     fetch(currentUrl)
//         .then(response => response.json())
//         .then(data => {
//             // Handle the response data
//             console.log('Response:', data);
//             // You can update the page content based on the response
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// });