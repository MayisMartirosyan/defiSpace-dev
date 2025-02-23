document.addEventListener(
  "click",
  function (event) {
    const allDropdowns = document.querySelectorAll(".share_dropdown_div");
    let isClickInsideDropdown = false;

    allDropdowns.forEach((dropdown) => {
      if (dropdown.contains(event.target)) {
        isClickInsideDropdown = true;
      }
    });

    const isClickOnShareButton = event.target.closest("[onclick^='openShare']");

    if (!isClickInsideDropdown && !isClickOnShareButton) {
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
      post_detail_slider_buttons_div.style.display = "flex";
    }
  },
  true
);
