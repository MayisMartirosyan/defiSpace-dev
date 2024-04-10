const filter_btn = document.getElementById("header_filter_btn_div");
const filter_fixed_popup_div = document.getElementById("filter_fixed_popup_div");
const timeline_tags_apply_button = document.getElementById("timeline_tags_apply_button");

if(window.location.pathname !== "/"){
    filter_btn.style.display = "none";
}

let filter_bool = false;

filter_btn.addEventListener("click", () => {
    if(filter_bool){
        filter_fixed_popup_div.style.display = "none";
    }else{
        filter_fixed_popup_div.style.display = "block";
    }

    filter_bool = !filter_bool;

})

timeline_tags_apply_button.addEventListener("click", () => {
    if(filter_bool){
        filter_fixed_popup_div.style.display = "none";
    }else{
        filter_fixed_popup_div.style.display = "block";
    }
    filter_bool = !filter_bool;
})