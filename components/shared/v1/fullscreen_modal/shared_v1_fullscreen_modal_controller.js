import { Controller } from "stimulus";
import 'script-loader!../../../../vendor/bioep.js';

export default class extends Controller {
  connect() {
    bioEp.init({
      css: '#bio_ep',
      cookieExp: 0
    });
  }
}

 
