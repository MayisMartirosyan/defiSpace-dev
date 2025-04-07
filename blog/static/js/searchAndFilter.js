const loadSearchFilterInputs = () => {
  const device = document.getElementById("content").getAttribute("data-device");
  const filterInputs = getUrlParams() || {};

  if (Object.keys(filterInputs).length > 0) {
    // Load search inputs

    const searchInput = document.getElementById(
      `timeline_search_input_${device}`
    );

    searchInput.value = filterInputs.q ?? "";

    // Load checked checkboxes
    const TagPostsList = document
      .getElementById(`tag_post_list_${device}`)
      .querySelectorAll('.big_tag_item input[type="checkbox"]');

    TagPostsList.forEach((tag) => {
      if (filterInputs.tag_posts) {
        if (typeof filterInputs.tag_posts === "string") {
          filterInputs.tag_posts = filterInputs.tag_posts.split(",");
        }

        filterInputs.tag_posts.forEach((selectedTag) => {
          if (tag.id === `tag_post${selectedTag}_${device}`) {
            tag.checked = true;
            tag.parentElement.classList.add("big_tag_item_active");
          }
        });
      }
    });

    const TagRatingsList = document
      .getElementById(`tag_rating_list_${device}`)
      .querySelectorAll('.big_tag_item input[type="checkbox"]');

    TagRatingsList.forEach((tag) => {
      if (filterInputs.tag_rating) {
        if (typeof filterInputs.tag_rating === "string") {
          filterInputs.tag_rating = filterInputs.tag_rating.split(",");
        }
        filterInputs.tag_rating.forEach((selectedTag) => {
          if (tag.id === `tag_rating${selectedTag}_${device}`) {
            tag.checked = true;
            tag.parentElement.classList.add("big_tag_item_active");
          }
        });
      }
    });

    if (filterInputs.period) {
      const dateOptions = {
        today: "Today",
        yesterday: "Yesterday",
        week: "Last Week",
        month: "Last Month",
        year: "Last Year",
      };
      const contentDash = document.getElementById(
        `timeline_calendar_selected_button_${device}`
      );
      const displayText = dateOptions[filterInputs.period];
      contentDash.innerText = displayText;
    }
  }
};

document.addEventListener("DOMContentLoaded", loadSearchFilterInputs);

const handleSubmit = () => {
  let initUrl = "?q=";
  let url = initUrl;
  const device = document.getElementById("content").getAttribute("data-device");

  const checkedTagPosts = document
    .getElementById(`tag_post_list_${device}`)
    .querySelectorAll('.big_tag_item input[type="checkbox"]:checked');
  const checkedTagRatings = document
    .getElementById(`tag_rating_list_${device}`)
    .querySelectorAll('.big_tag_item input[type="checkbox"]:checked');

  const searchInput = document.getElementById(
    `timeline_search_input_${device}`
  );

  const SelectedDate = document.getElementById(
    `timeline_calendar_selected_button_${device}`
  ).innerText;

  url += searchInput.value;

  checkedTagPosts.forEach((checkbox) => {
    url += `&tag_posts=${checkbox.value}`;
  });

  checkedTagRatings.forEach((checkbox) => {
    url += `&tag_rating=${checkbox.value}`;
  });

  const dateOptions = {
    Today: "today",
    Yesterday: "yesterday",
    "Last Week": "week",
    "Last Month": "month",
    "Last Year": "year",
  };

  if (dateOptions.hasOwnProperty(SelectedDate)) {
    url += `&period=${dateOptions[SelectedDate]}`;
  }
  url += `&page=1`;

  window.history.pushState({}, "", url);

  const event = new Event("urlChange");
  window.dispatchEvent(event);

  fetch(url, {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");

      const newContent = doc.getElementsByClassName("projects_section")[0];

      document.getElementsByClassName("projects_section")[0].outerHTML =
        newContent.outerHTML;
    })
    .catch((error) => console.error("Error fetching data:", error));
};

document.addEventListener("DOMContentLoaded", function () {
  const device = document.getElementById("content").getAttribute("data-device");
  const searchInput = document.getElementById(
    `timeline_search_input_${device}`
  );

  if (searchInput) {
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    });
  }
});
