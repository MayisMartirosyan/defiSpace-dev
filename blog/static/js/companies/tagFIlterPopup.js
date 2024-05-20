

const filter_btn_cmp = document.getElementById("tags_selector_div");
const filter_fixed_popup_div_cmp = document.getElementById("comp_filter_fixed_popup_div");
const timeline_tags_apply_button_cmp = document.getElementById("comp_tr_apply_button");
const timeline_tags_div_cmp = document.getElementById("cmp_timeline_tags_div")

const openPopup = () =>{
    filter_fixed_popup_div_cmp.style.display = "flex";
}


filter_fixed_popup_div_cmp.addEventListener('click',()=>{
    filter_fixed_popup_div_cmp.style.display = "none";
})

timeline_tags_div_cmp.addEventListener('click',(e)=>{
    e.stopPropagation()
})


