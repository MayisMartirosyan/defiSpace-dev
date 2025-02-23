const post_detail_slider_buttons_div = document.getElementById(
  "post_detail_slider_buttons_div"
);
const post_detail_related_news_slider_items_flex = document.getElementById(
  "post_detail_related_news_slider_items_flex"
);
const slider_content = document.getElementById(
  "glider-company-detail-sidebar-slider"
);

const slider_items = post_detail_related_news_slider_items_flex.children;

function openShare(id) {
  const allDropdowns = document.querySelectorAll(".share_dropdown_div");

  const sharedProject = document.getElementById(id);
  const selectedCompStyle =
    sharedProject.getElementsByClassName("share_dropdown_div")[0];

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
