const filter_btn = document.getElementById("header_filter_btn_div");
const filter_fixed_popup_div = document.getElementById("filter_fixed_popup_div");
const timeline_tags_apply_button = document.getElementById("timeline_tags_apply_button");

let filter_bool = false;

function handlePopupOpenClose(){
    if(filter_bool){
        filter_fixed_popup_div.style.display = "none";
    }else{
        filter_fixed_popup_div.style.display = "flex";
    }
    filter_bool = !filter_bool;
}

filter_btn.addEventListener("click", () => handlePopupOpenClose());
timeline_tags_apply_button.addEventListener("click", () => handlePopupOpenClose());
filter_fixed_popup_div.addEventListener("click", (event) => {
    if (event.target === filter_fixed_popup_div) {
        filter_fixed_popup_div.style.display = "none";
        filter_bool = !filter_bool;
    }
});