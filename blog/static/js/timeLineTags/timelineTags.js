const shevron_div = document.getElementById("timeline_tags_shevron_div");
const shevron_icon = document.getElementById("shevron_icon");
const tags_sidebar_aside = document.getElementById("tags_sidebar_aside");
const apply_btn = document.getElementById("timeline_tags_apply_button");
const timeline_div_flex = document.getElementById("timeline_div_flex");
const timeline_tags_div_flex = document.getElementById(
  "timeline_tags_div_flex"
);
const tags_sidebar_aside_wrapper = document.getElementById(
  "tags_sidebar_aside_wrapper"
);

let shevronBool = false;

// Event listener of click

function closeFilterModal() {
  shevron_div.style.background = "#F8F8F8";
  shevron_icon.style.transform = "rotate(0deg)";
  tags_sidebar_aside.style.width = "400px";
  tags_sidebar_aside.style.padding = "0";
  timeline_div_flex.style.position = "static";
  timeline_div_flex.style.paddingLeft = "0px";
  timeline_div_flex.style.marginLeft = "56px";
  apply_btn.style.width = "100%";
  tags_sidebar_aside_wrapper.classList.remove("tags_sidebar_aside_wrapper");
  shevronBool = !shevronBool;
}

shevron_div.addEventListener("click", () => {
  if (!shevronBool) {
    shevron_div.style.background = "#DFEBFC";
    shevron_icon.style.transform = "rotate(-180deg)";
    tags_sidebar_aside.style.width = "100%";
    tags_sidebar_aside.style.margin = "0 auto";
    tags_sidebar_aside.style.padding = "0 80px";
    apply_btn.style.width = "328px";
    timeline_div_flex.style.paddingLeft = "450px";
    timeline_div_flex.style.marginLeft = "0px";
    timeline_div_flex.style.position = "absolute";
    tags_sidebar_aside_wrapper.classList.add("tags_sidebar_aside_wrapper");
    shevronBool = !shevronBool;
  } else {
    closeFilterModal();
  }
});

// Event listener of mouseover

shevron_div.addEventListener("mouseover", () => {
  if (!shevronBool) {
    shevron_div.style.background = "rgba(189, 212, 250, 0.30)";
  }
});

// Event listener of mouseleave

shevron_div.addEventListener("mouseleave", () => {
  if (!shevronBool) {
    shevron_div.style.background = "#F8F8F8";
  }
});

// Body outside click

document.body.addEventListener("click", (event) => {
  if (event.target === tags_sidebar_aside_wrapper) {
    closeFilterModal();
  }
});