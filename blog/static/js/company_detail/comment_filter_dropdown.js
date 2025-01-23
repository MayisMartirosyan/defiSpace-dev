const cmp_det_comment_filter_dropdown_list = document.getElementById("cmp_det_comment_filter_dropdown_list");
const cmp_det_comment_filter_dropdown = document.getElementById("cmp_det_comment_filter_dropdown");
const cmp_det_comment_filter_current = document.getElementById("cmp_det_comment_filter_current"); 

let filterDropdownBoolean = true;


function FilterDropdownOpenClose(){
  cmp_det_comment_filter_dropdown_list.style.display = filterDropdownBoolean ? "block" : "none";
  filterDropdownBoolean = !filterDropdownBoolean;
}

function FilterDropdown(event){
  cmp_det_comment_filter_current.innerText = event.target.innerText;
  FilterDropdownOpenClose();
}

cmp_det_comment_filter_dropdown.addEventListener("click", () => FilterDropdownOpenClose());