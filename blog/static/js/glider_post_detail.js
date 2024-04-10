// 

new Glider(document.querySelector('.glider-post-detail-slider'), {
  // Mobile-first defaults
  slidesToShow: 2,
  slidesToScroll: 1,
  dots: '#resp-dots',
  arrows: {
    prev: '.glider-prev-post-detail',
    next: '.glider-next-post-detail'
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
        slidesToShow: 2,
        slidesToScroll: 1,
        itemWidth: 150,
        duration: 0.25
      }
    }
  ]
});