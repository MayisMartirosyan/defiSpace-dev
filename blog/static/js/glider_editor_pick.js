new Glider(document.querySelector('.glider'), {
  // Mobile-first defaults
  slidesToShow: 3,
  slidesToScroll: 1,
  scrollLock: true,
  draggable: false,
  dots: '#resp-dots',
  decoration:"none",
    arrows: {
    prev: '.glider-prev-edit',
    next: '.glider-next-edit'
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
        duration: 0.25
      }
    },
    {
      // screens greater than >= 775px
      breakpoint: 775,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 2,
        slidesToScroll: 1,
        itemWidth: 150,
        duration: 0.25
      }
    }, {
      // screens greater than >= 1024px
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        itemWidth: 150,
        duration: 0.25
      }
    }
  ]
});

let isScrollingEditor = false;
const scrollThresholdEditor = 10;

gliderElement.addEventListener('wheel', (event) => {
  const totalSlidesEditor = glider.slides.length;
  const currentSlideEditor = glider.getCurrentSlide();
  const deltaXEditor = event.deltaX;

  if (isScrollingEditor) return;

  if (Math.abs(deltaX) > scrollThreshold) {
    event.preventDefault();

    if (deltaXEditor > 100 && currentSlideEditor < totalSlidesEditor - 1) {
      isScrollingEditor = true;
      glider.scrollItem(currentSlideEditor + 1);
    } else if (deltaXEditor < 100 && currentSlideEditor > 100) {
      isScrollingEditor = true;
      glider.scrollItem(currentSlideEditor - 1);
    }

    setTimeout(() => {
      isScrollingEditor = false;
    }, 3000);
  }
}, { passive: false });