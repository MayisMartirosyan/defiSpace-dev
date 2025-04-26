// document.addEventListener(
//   "click",
//   function (event) {
//     const allDropdowns = document.querySelectorAll(".share_dropdown_div");
//     let isClickInsideDropdown = false;

//     allDropdowns.forEach((dropdown) => {
//       if (dropdown.contains(event.target)) {
//         isClickInsideDropdown = true;
//       }
//     });

//     const isClickOnShareButton = event.target.closest("[onclick^='openShare']");

//     if (!isClickInsideDropdown && !isClickOnShareButton) {
//       allDropdowns.forEach((dropdown) => {
//         dropdown.classList.remove("active");
//       });
//       // post_detail_slider_buttons_div.style.display = "flex";
//     }
//   },
//   true
// );



document.addEventListener("click", function(event) {
  // ==========================
  // CLOSE Sub Criterion Dropdown
  // ==========================
  const subCriterionDropdown = document.getElementById("cmp_det_list_sub_criterion");
  const subCriterionToggle = document.getElementById("cmp_det_add_comment_asset_secured");

  if (subCriterionDropdown && subCriterionToggle) {
    const clickedInsideSubCriterion = subCriterionDropdown.contains(event.target);
    const clickedOnSubCriterionToggle = subCriterionToggle.contains(event.target);

    if (!clickedInsideSubCriterion && !clickedOnSubCriterionToggle) {
      subCriterionDropdown.style.display = "none";
      if (typeof subCriterionBool !== 'undefined') {
        subCriterionBool = true;
      }
    }
  }

  // ==========================
  // CLOSE Share Dropdowns
  // ==========================
  const allShareDropdowns = document.querySelectorAll(".share_dropdown_div");
  if (allShareDropdowns.length > 0) {
    let isClickInsideShareDropdown = false;

    allShareDropdowns.forEach((dropdown) => {
      if (dropdown.contains(event.target)) {
        isClickInsideShareDropdown = true;
      }
    });

    const isClickOnShareButton = event.target.closest("[onclick^='openShare']");

    if (!isClickInsideShareDropdown && !isClickOnShareButton) {
      allShareDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
      // post_detail_slider_buttons_div.style.display = "flex"; // Uncomment if needed
    }
  }

  // ==========================
  // CLOSE Comment Filter Dropdown
  // ==========================
  const commentFilterDropdown = document.getElementById("cmp_det_comment_filter_dropdown_list");
  const commentFilterToggle = document.getElementById("cmp_det_comment_filter_dropdown");

  if (commentFilterDropdown && commentFilterToggle) {
    const clickedInsideCommentFilter = commentFilterDropdown.contains(event.target);
    const clickedOnCommentFilterToggle = commentFilterToggle.contains(event.target);

    if (!clickedInsideCommentFilter && !clickedOnCommentFilterToggle) {
      commentFilterDropdown.style.display = "none";
      dropdownOpen = false; // FIXED
    }
  }

}, true);


