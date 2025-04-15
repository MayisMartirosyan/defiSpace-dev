document.addEventListener("DOMContentLoaded", () => {
  const filter_btn_cmp = document.getElementById(`tags_selector_div_mobile`);
  const filter_btn_cmp_desk = document.getElementById(`tags_selector_div_desktop`);
  const filter_fixed_popup_div_cmp = document.getElementById("comp_filter_fixed_popup_div");
  const timeline_tags_div_cmp = document.getElementById("cmp_timeline_tags_div");

  filter_btn_cmp?.addEventListener("click", () => {
    filter_fixed_popup_div_cmp.style.display = "flex";
  });

  filter_btn_cmp_desk?.addEventListener("click", () => {
    filter_fixed_popup_div_cmp.style.display = "flex";
  });

  filter_fixed_popup_div_cmp?.addEventListener("click", () => {
    filter_fixed_popup_div_cmp.style.display = "none";
  });

  timeline_tags_div_cmp?.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});


const loadTagFilterInputs = () => {
  const filterInputs = getUrlParams();

  if (Object.keys(filterInputs).length > 0) {
    const TagRatingsList = document
      .getElementById(`tag_rating_list`)
      .querySelectorAll('.big_tag_item input[type="checkbox"]');

    TagRatingsList.forEach((tag) => {
      if (filterInputs.tag_rating) {
        if (typeof filterInputs.tag_rating === "string") {
          filterInputs.tag_rating = filterInputs.tag_rating.split(",");
        }
        filterInputs.tag_rating.forEach((selectedTag) => {
          if (tag.id === `tag_rating${selectedTag}`) {
            tag.checked = true;
            tag.parentElement.classList.add("big_tag_item_active");
          }
        });
      }
    });
  }
};



document.addEventListener("DOMContentLoaded", loadTagFilterInputs);




const handleFilterSubmit = () => {
  let url = "";
  const filterInputs = getUrlParams();
  url += `?sort_by=${
    !filterInputs.sort_by ? "totalScore" : filterInputs.sort_by
  }&sort_order=${!filterInputs.sort_order ? "desc" : filterInputs.sort_order}`;

  const checkedTagRatings = document
    .getElementById(`tag_rating_list`)
    .querySelectorAll('.big_tag_item input[type="checkbox"]:checked');

  checkedTagRatings.forEach((checkbox) => {
    url += `&tag_rating=${checkbox.value}`;
  });

  url += `&page=1`;

  history.replaceState(null, null, url);
  window.location.reload();
};
