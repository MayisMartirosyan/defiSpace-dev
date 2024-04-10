const shevron_div = document.getElementById("timeline_tags_shevron_div");
const shevron_icon = document.getElementById("shevron_icon");
const tags_sidebar_aside = document.getElementById("tags_sidebar_aside");
const apply_btn = document.getElementById("timeline_tags_apply_button");
const timeline_div_flex = document.getElementById("timeline_div_flex");


let shevronBool = false;

// Event listener of click

shevron_div.addEventListener("click", () => {
    if(!shevronBool){
        shevron_div.style.background = "#DFEBFC";
        shevron_icon.style.transform = "rotate(-180deg)";
        tags_sidebar_aside.style.width = "100%";
        apply_btn.style.width = "328px";
        timeline_div_flex.style.paddingLeft = "450px";
        timeline_div_flex.style.marginLeft = "0px";
        timeline_div_flex.style.position = "absolute";
        shevronBool = !shevronBool;
    }else{
        shevron_div.style.background =  "#F8F8F8";
        shevron_icon.style.transform = "rotate(0deg)";
        tags_sidebar_aside.style.width = "400px";
        timeline_div_flex.style.position = "static";
        timeline_div_flex.style.paddingLeft = "0px";
        timeline_div_flex.style.marginLeft = "56px";
        apply_btn.style.width = "100%";
        shevronBool = !shevronBool;
    }
})

// Event listener of mouseover

shevron_div.addEventListener("mouseover", () => {
    if(!shevronBool){
        shevron_div.style.background = "#DFEBFC";
    }
});

// Event listener of mouseleave

shevron_div.addEventListener("mouseleave", () => {
    if(!shevronBool){
        shevron_div.style.background = "#F8F8F8";
    }
});