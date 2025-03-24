document.addEventListener("DOMContentLoaded", function () {
  const gliderElement = document.querySelector(".glider-post-detail-slider");
  const prevButton = document.querySelector(".glider-prev-post-detail");
  const nextButton = document.querySelector(".glider-next-post-detail");

  // const track = document.querySelector(".glider-track");
  // if (track) {
  //   track.style.width = track.scrollWidth + "px";
  // }

  new Glider(gliderElement, {
    slidesToShow: 1,
    slidesToScroll: 1,
    // itemWidth: 150,
    duration: 0.25,
    dots: "#resp-dots",
    arrows: {
      prev: prevButton,
      next: nextButton,
    },
    responsive: [
      {
        // screens greater than >= 775px
        breakpoint: 310,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 1,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25,
        },
      },
      {
        // screens greater than >= 775px
        breakpoint: 775,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 2,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25,
        },
      },
      {
        // screens greater than >= 1024px
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25,
        },
      },
    ],
  });

  function updateButtons() {
    const isAtStart = gliderElement.scrollLeft <= 0;
    const isAtEnd =
      gliderElement.scrollLeft + gliderElement.clientWidth >=
      gliderElement.scrollWidth - 1;

    prevButton.disabled = isAtStart;
    nextButton.disabled = isAtEnd;

    if(isAtStart){
      prevButton.style.visibility = "hidden";
    }else{
      prevButton.style.visibility = "visible";
    }

    if(isAtEnd){
      nextButton.style.visibility = "hidden";
    }else{
      nextButton.style.visibility = "visible";
    }
  }

  gliderElement.addEventListener("scroll", updateButtons);
  updateButtons();
});
