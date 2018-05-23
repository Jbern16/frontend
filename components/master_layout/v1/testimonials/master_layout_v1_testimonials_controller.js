import { Controller } from "stimulus";
import 'script-loader!slick-carousel/slick/slick.js';

export default class extends Controller {
  connect() {
    $('.testimonials-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      draggable: true,
      infinite: true,
      dots: false,
      autoplay: false,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 778,
          settings: {
            swipe: true,
            arrows: false,
            dots: true
          }
        }
      ]
    });
  }
}