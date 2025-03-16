const post_detail_slider_buttons_div = document.getElementById("post_detail_slider_buttons_div");
const post_detail_related_news_slider_items_flex = document.getElementById("post_detail_related_news_slider_items_flex");


document.addEventListener("DOMContentLoaded", function () {
  const company_slider_content = document.getElementById("glider-company-detail-sidebar-slider");

  if(company_slider_content?.children[0].children.length === 1 && company_slider_content?.children[0].children[0].children.length === 1){
    company_slider_content.children[0].children[0].children[0].style.marginBottom = "155px"
  }

  for(let i = 0; i < company_slider_content?.children[0].children.length; i++){
    const slideContentList = company_slider_content.children[0].children[i];
    slideContentList.children[0].children[1].children[1].children[0].style.top = "30px";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const post_slider_content = document.getElementById("glider-post-detail-sidebar-slider");

  if(post_slider_content?.children[0].children.length === 1 && post_slider_content?.children[0].children[0].children.length === 1){
    post_slider_content.children[0].children[0].children[0].style.marginBottom = "155px"
  }

  for(let i = 0; i < post_slider_content?.children[0].children.length; i++){
    const slideContentList = post_slider_content.children[0].children[i];
    slideContentList.children[0].children[1].children[1].children[0].style.top = "30px";
  }  
});

function openShare(id) {
  const allDropdowns = document.querySelectorAll(".share_dropdown_div");

  const sharedProject = document.getElementById(id);
  const selectedCompStyle = sharedProject.getElementsByClassName("share_dropdown_div")[0];

  // Check if the clicked dropdown is already open
  const isCurrentlyActive = selectedCompStyle.classList.contains("active");

  // Close all dropdowns
  allDropdowns.forEach((dropdown) => {
    dropdown.classList.remove("active");
  });

  // If the clicked dropdown was NOT active, open it
  if (!isCurrentlyActive) {
    selectedCompStyle.classList.add("active");
    if (post_detail_slider_buttons_div) {
      post_detail_slider_buttons_div.style.display = "none";
    }
  } else {
    if (post_detail_slider_buttons_div) {
      post_detail_slider_buttons_div.style.display = "flex";
    }
  }
}


function copyToClipboard(e, text) {
  e.preventDefault();
  let textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
