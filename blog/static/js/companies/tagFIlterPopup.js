const filter_btn = document.getElementById("tags_selector_div");
const filter_fixed_popup_div = document.getElementById("comp_filter_fixed_popup_div");
const timeline_tags_apply_button = document.getElementById("comp_tr_apply_button");
const cmp_timeline_tags_div = document.getElementById("cmp_timeline_tags_div")



filter_btn.addEventListener("click", () => {
     filter_fixed_popup_div.style.display = "flex";
})

filter_fixed_popup_div.addEventListener('click',()=>{
    filter_fixed_popup_div.style.display = "none";
})

cmp_timeline_tags_div.addEventListener('click',(e)=>{
    e.stopPropagation()
})

timeline_tags_apply_button.addEventListener("click", () => {
    filter_fixed_popup_div.style.display = "none";

})