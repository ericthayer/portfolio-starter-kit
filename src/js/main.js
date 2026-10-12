// Import our custom CSS
import "../scss/styles.scss"

// Import only the Bootstrap components the page uses. Each one registers its
// own data-API handlers on import. The "bootstrap" root entry also pulls in
// Datepicker, which needs the optional vanilla-calendar-pro peer dependency.
import "bootstrap/js/dist/carousel.js"
import "bootstrap/js/dist/collapse.js"
import "bootstrap/js/dist/dialog.js"
import "bootstrap/js/dist/drawer.js"
import "bootstrap/js/dist/menu.js"
import "bootstrap/js/dist/tab.js"
import Tooltip from "bootstrap/js/dist/tooltip.js"

// BS color picker
import "./bs-color-picker.js"

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
)

const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
)

// function isMobile() {
//   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//     navigator.userAgent
//   )
// }

// if (isMobile()) {
//   document.querySelector(".bd-mode-toggle").classList.add("d-none")
//   document.querySelector(".brand").classList.add("ms-1")
// }

const fadeInRoot = document.querySelector(".enhanced")
fadeInRoot.classList.add("show")

import { register } from "register-service-worker"

register(`/service-worker.js`)
