import application from "stimulus_application";
import { definitionsFromContext } from "stimulus/webpack-helpers";
const context = require.context('./', true, /_controller\.js$/);
application.load(definitionsFromContext(context))
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/fonts/slick.svg';

import "./master_layout_v1_testimonials.scss";
