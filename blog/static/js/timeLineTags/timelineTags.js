const shevron_div = document.getElementById("timeline_tags_shevron_div");
const shevron_icon = document.getElementById("shevron_icon");
const tags_sidebar_aside = document.getElementById("tags_sidebar_aside");
const apply_btn = document.getElementById("timeline_tags_apply_button");
const timeline_div_flex = document.getElementById("timeline_div_flex");
const timeline_tags_div_flex = document.getElementById("timeline_tags_div_flex");
const tags_sidebar_aside_wrapper = document.getElementById("tags_sidebar_aside_wrapper");
const timeline_tags_filter_div_desktop = document.getElementById("timeline_tags_filter_div_desktop");

let shevronBool = false;

function closeFilterModal() {
  shevron_div.style.background = "#F8F8F8";
  shevron_icon.style.transform = "rotate(0deg)";
  tags_sidebar_aside.style.width = "400px";
  tags_sidebar_aside.style.padding = "0";
  timeline_div_flex.style.position = "static";
  timeline_div_flex.style.paddingLeft = "0px";
  timeline_div_flex.style.marginLeft = "56px";
  apply_btn.style.width = "100%";
  tags_sidebar_aside_wrapper.style.position = "fixed !important";
  tags_sidebar_aside_wrapper.classList.remove("tags_sidebar_aside_wrapper");
  timeline_tags_div_flex.style.borderRadius = "28px 0 0 28px";
  shevronBool = false;
}

shevron_div.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevents event bubbling
  
  if (!shevronBool) {
    shevron_div.style.background = "#DFEBFC";
    shevron_icon.style.transform = "rotate(-180deg)";
    tags_sidebar_aside.style.width = "100%";
    tags_sidebar_aside.style.margin = "0 auto";
    apply_btn.style.width = "328px";
    timeline_div_flex.style.paddingLeft = "450px";
    timeline_div_flex.style.marginLeft = "0px";
    timeline_div_flex.style.position = "absolute";
    tags_sidebar_aside_wrapper.classList.add("tags_sidebar_aside_wrapper");
    timeline_tags_div_flex.style.borderRadius = "28px";
    shevronBool = true;
  } else {
    closeFilterModal();
  }
});

// Close modal on clicking outside
document.addEventListener("click", (event) => {
  if (
    shevronBool && // Modal is open
    !tags_sidebar_aside.contains(event.target) && // Click is outside modal
    !shevron_div.contains(event.target) // Click is outside toggle button
  ) {
    closeFilterModal();
  }
});
