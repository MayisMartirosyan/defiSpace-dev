document.addEventListener("DOMContentLoaded", function () {
  const gliderElementEditorPick = document.querySelector(".glider-editor-pick");

  if (!gliderElementEditorPick) return; // prevent errors if element isn't found

  const glider = new Glider(gliderElementEditorPick, {
    slidesToShow: 3,
    slidesToScroll: 1,
    scrollLock: true,
    draggable: false,
    itemWidth: "auto",
    dots: "#resp-dots",
    arrows: {
      prev: ".glider-prev-edit",
      next: ".glider-next-edit",
    },
    responsive: [
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Add spacing
  gliderElementEditorPick.children[0].style.marginLeft = "6px";
  gliderElementEditorPick.children[
    gliderElementEditorPick.children.length - 1
  ].style.marginRight = "6px";

  // Custom scroll behavior
  let isScrollingEditor = false;
  const scrollThresholdEditor = 10;

  gliderElementEditorPick.addEventListener(
    "wheel",
    (event) => {
      const totalSlidesEditor = glider.slides.length;
      const currentSlideEditor = glider.getCurrentSlide();
      const deltaXEditor = event.deltaX;

      if (isScrollingEditor) return;

      if (Math.abs(deltaXEditor) > scrollThresholdEditor) {
        event.preventDefault();

        if (deltaXEditor > 100 && currentSlideEditor < totalSlidesEditor - 1) {
          isScrollingEditor = true;
          glider.scrollItem(currentSlideEditor + 1);
        } else if (deltaXEditor < -100 && currentSlideEditor > 0) {
          isScrollingEditor = true;
          glider.scrollItem(currentSlideEditor - 1);
        }

        setTimeout(() => {
          isScrollingEditor = false;
        }, 300);
      }
    },
    { passive: false }
  );
});
