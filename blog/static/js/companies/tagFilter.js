const loadFilterInputs = () => {
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

document.addEventListener("DOMContentLoaded", loadFilterInputs);

const handleSubmit = () => {

  let url = "";
  const filterInputs = getUrlParams();  
  url += `?sort_by=${!filterInputs.sort_by ? "totalScore" : filterInputs.sort_by}`

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
