import { Controller } from "stimulus";
import 'script-loader!slick-carousel/slick/slick.js';

export default class extends Controller {
  connect() {
    $('.js-slick-vertical-slides').slick({
      arrows: false,
      draggable: false,
      swipe: false,
      infinite: true,
      dots: false,
      speed: 400,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [{
        breakpoint: 778,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipe: true,
          infinite: true,
          dots: true
        }
      }]
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $('.menu-img').removeClass('active')
      $('.menu-img[data-index=' + nextSlide + ']').addClass('active')
    });
  
    $('.menu-img').off('click')
    $('.menu-img').on('click', function(){
      $(".js-slick-vertical-slides").slick('slickGoTo', $(this).data('index'));
    })
  }
}