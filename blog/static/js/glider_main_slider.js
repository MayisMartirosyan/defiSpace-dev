const gliderElement = document.querySelector('.glider-main-slider');

const glider = new Glider(gliderElement, {
  slidesToShow: 1,
  dots: '.dots',
  scrollLock: true,
  draggable: false,
  scrollLockDelay: 50,
  scrollPropagate: true,
  arrows: {
    prev: '.glider-prev-main-slider',
    next: '.glider-next-main-slider'
  }
});

let isScrolling = false;
const scrollThreshold = 35;

gliderElement.addEventListener('wheel', (event) => {
  const totalSlides = glider.slides.length;
  const currentSlide = glider.getCurrentSlide();
  const deltaY = event.deltaY;

  if (isScrolling) return;

  if (Math.abs(deltaY) > scrollThreshold) {
    event.preventDefault();

    if (deltaY > 0 && currentSlide < totalSlides - 1) {
      isScrolling = true;
      glider.scrollItem(currentSlide + 1);
    } else if (deltaY < 0 && currentSlide > 0) {
      isScrolling = true;
      glider.scrollItem(currentSlide - 1);
    }

    setTimeout(() => {
      isScrolling = false;
    }, 500);
  }
}, { passive: false });
