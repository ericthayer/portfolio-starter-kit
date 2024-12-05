// Import our custom CSS
import "../scss/styles.scss"

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap"

// BS color picker
import "./bs-color-picker.js"

import { register } from "register-service-worker"

register(`/service-worker.js`)