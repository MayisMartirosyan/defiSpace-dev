new Glider(document.querySelector('.glider-main-slider'), {
    slidesToShow: 1,
    dots: '.dots',
    scrollLock: true,
    draggable: false,
    arrows: {
        prev: '.glider-prev-main-slider',
        next: '.glider-next-main-slider'
    }
});