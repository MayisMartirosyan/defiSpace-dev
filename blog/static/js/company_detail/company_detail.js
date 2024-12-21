const cmp_det_add_comment_asset_secured = document.getElementById("cmp_det_add_comment_asset_secured");
const cmp_det_list_sub_criterion = document.getElementById("cmp_det_list_sub_criterion");

let subCriterionBool = true;

function OpenCloseSubCriterion(){
  const currentStyle = subCriterionBool ? "block" : "none";
  cmp_det_list_sub_criterion.style.display = currentStyle;
  subCriterionBool = !subCriterionBool;
}

cmp_det_add_comment_asset_secured.addEventListener("click", () => OpenCloseSubCriterion(subCriterionBool));