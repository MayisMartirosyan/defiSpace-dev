const post_detail_slider_buttons_div = document.getElementById(
  "post_detail_slider_buttons_div"
);
const post_detail_related_news_slider_items_flex = document.getElementById(
  "post_detail_related_news_slider_items_flex"
);
const slider_content = document.getElementById(
  "glider-company-detail-sidebar-slider"
);

// const child_slider_content = slider_content.children;

// console.log("slider_content", slider_content.children);

// slider_content.children[0].style.background = "orange";

const slider_items = post_detail_related_news_slider_items_flex.children;

// console.log("slider_items", slider_items);

// for (let i = 0; i < slider_content.children.length; i++) {
//   for (let j = 0; j < slider_items.length; j++) {
//     if (!j) {
//       slider_items[j].style.background = "black";
//     }
//     // console.log("j", j);
//     // console.log("slider_items[i]", slider_items[i]);
//   }
// }

const openShareDropdown = (id) => {
    const sharedProject = document.getElementById(id);
    const selectedCompStyle = sharedProject.getElementsByClassName("share_dropdown_div");
    if (selectedCompStyle[0].classList.contains("active")) {
        selectedCompStyle[0].classList.remove("active");
        post_detail_slider_buttons_div.style.display = "flex";
    } else {
        selectedCompStyle[0].classList.add("active");
        post_detail_slider_buttons_div.style.display = "none";
    }
};

function copyToClipboard(e, text) {
  e.preventDefault();
  let textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
