import application from "stimulus_application";
import { definitionsFromContext } from "stimulus/webpack-helpers";
const context = require.context('./', true, /_controller\.js$/);
application.load(definitionsFromContext(context));

import "./master_layout_v1_floating_video.scss";
