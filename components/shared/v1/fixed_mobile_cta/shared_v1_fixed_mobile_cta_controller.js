import { Controller } from "stimulus";
import $ from 'jquery';
import 'imports-loader?window.jQuery=jquery!headroom.js/dist/jQuery.headroom.js';

export default class extends Controller {
  connect() {
    $(".fixed-mobile-cta").headroom({
      offset : 220,
      tolerance : 0,
      tolerance : {
        up : 5,
        down : 0
      },
      classes : {
        initial : "headroom",
        top : "headroom--top",
        notTop : "headroom--not-top",
      },
    });
  }
}