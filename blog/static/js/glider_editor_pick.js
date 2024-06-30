new Glider(document.querySelector('.glider'), {
  // Mobile-first defaults
  slidesToShow: 3,
  slidesToScroll: 1,
  scrollLock: true,
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