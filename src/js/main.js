// Import our custom CSS
import "../scss/styles.scss"

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap"

// BS color picker
import "./bs-color-picker.js"

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
)
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
)

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

const fadeInRoot = document.querySelector(".enhanced")
fadeInRoot.classList.add("show")

if (isMobile()) {
  document.querySelector(".bd-mode-toggle").classList.add("d-none")
  document.querySelector(".brand").classList.add("ms-1")
}

import { register } from "register-service-worker"

register(`/service-worker.js`)
