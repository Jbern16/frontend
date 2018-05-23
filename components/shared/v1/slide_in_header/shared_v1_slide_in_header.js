import application from "stimulus_application";
import { definitionsFromContext } from "stimulus/webpack-helpers";
const context = require.context('./', true, /_controller\.js$/);
application.load(definitionsFromContext(context));

import "./shared_v1_slide_in_header.scss";