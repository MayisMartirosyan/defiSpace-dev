document.addEventListener("DOMContentLoaded", function () {
  const gliderElement = document.querySelector(".glider-post-detail-sidebar-slider");
  const prevButton = document.querySelector(".glider-prev-post-detail-sidebar");
  const nextButton = document.querySelector(".glider-next-post-detail-sidebar");

  new Glider(document.querySelector(".glider-post-detail-sidebar-slider"), {
    // Mobile-first defaults
    slidesToShow: 1,
    slidesToScroll: 1,
    scrollLock: true,
    arrows: {
      prev: ".glider-prev-post-detail-sidebar",
      next: ".glider-next-post-detail-sidebar",
    },
  });

  function updateButtons() {
    const isAtStart = gliderElement.scrollLeft <= 0;
    const isAtEnd =
      gliderElement.scrollLeft + gliderElement.clientWidth >=
      gliderElement.scrollWidth - 1;

    prevButton.disabled = isAtStart;
    nextButton.disabled = isAtEnd;

    if (isAtStart) {
      prevButton.style.opacity = "0.5";
      prevButton.style.pointerEvents = "none";
    } else {
      prevButton.style.opacity = "1";
      prevButton.style.pointerEvents = "all";
    }

    if (isAtEnd) {
      nextButton.style.opacity = "0.5";
      nextButton.style.pointerEvents = "none";
    } else {
      nextButton.style.opacity = "1";
      nextButton.style.pointerEvents = "all";
    }
  }

  gliderElement.addEventListener("scroll", updateButtons);
  updateButtons();
});
