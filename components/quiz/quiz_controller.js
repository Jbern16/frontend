import { Controller } from "stimulus";
import $ from 'jquery';
import '../../vendor/quiz.js';

export default class extends Controller {
  connect() {
    window.sheridanQuiz.init()
  }
}