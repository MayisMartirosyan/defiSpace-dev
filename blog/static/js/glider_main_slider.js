// new Glider(document.querySelector('.glider-main-slider'), {
//     slidesToShow: 1,
//     dots: '.dots',
//     scrollLock: true,
//     draggable: false,
//     arrows: {
//         prev: '.glider-prev-main-slider',
//         next: '.glider-next-main-slider'
//     }
// });


const gliderElement = document.querySelector('.glider-main-slider');

const glider = new Glider(gliderElement, {
  slidesToShow: 1,
  dots: '.dots',
  scrollLock: true,
  draggable: false,
  arrows: {
    prev: '.glider-prev-main-slider',
    next: '.glider-next-main-slider'
  }
});

let isScrolling = false;
const scrollThreshold = 5;

gliderElement.addEventListener('wheel', (event) => {
  const totalSlides = glider.slides.length;
  const currentSlide = glider.getCurrentSlide();
  const deltaX = event.deltaX;

  if (isScrolling) return;

  if (Math.abs(deltaX) > scrollThreshold) {
    event.preventDefault();

    if (deltaX > 0 && currentSlide < totalSlides - 1) {
      isScrolling = true;
      glider.scrollItem(currentSlide + 1);
    } else if (deltaX < 0 && currentSlide > 0) {
      isScrolling = true;
      glider.scrollItem(currentSlide - 1);
    }

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
}, { passive: false });
