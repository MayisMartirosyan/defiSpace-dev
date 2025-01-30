const add_comment_asset_secured_p = document.getElementById("cmp_det_add_comment_asset_secured_p");
const cmp_det_add_comment_asset_secured = document.getElementById("cmp_det_add_comment_asset_secured");
const cmp_det_list_sub_criterion = document.getElementById("cmp_det_list_sub_criterion");

let subCriterionBool = true;

function OpenCloseSubCriterion(){
  const currentStyle = subCriterionBool ? "block" : "none";
  cmp_det_list_sub_criterion.style.display = currentStyle;
  subCriterionBool = !subCriterionBool;
}


function makeActiveCategory(event){
  add_comment_asset_secured_p.innerText = event.target.getElementsByTagName("span")[1].innerText;
  OpenCloseSubCriterion();
}

cmp_det_add_comment_asset_secured.addEventListener("click", () => OpenCloseSubCriterion(subCriterionBool));