const filter_btn = document.getElementById("tags_selector_div");
const filter_fixed_popup_div = document.getElementById("comp_filter_fixed_popup_div");
const timeline_tags_apply_button = document.getElementById("comp_tr_apply_button");



let filter_bool = false;

filter_btn.addEventListener("click", () => {
    if(filter_bool){
        filter_fixed_popup_div.style.display = "none";
    }else{
        filter_fixed_popup_div.style.display = "flex";
    }

    filter_bool = !filter_bool;

})

timeline_tags_apply_button.addEventListener("click", () => {
    if(filter_bool){
        filter_fixed_popup_div.style.display = "none";
    }else{
        filter_fixed_popup_div.style.display = "flex";
    }
    filter_bool = !filter_bool;
})