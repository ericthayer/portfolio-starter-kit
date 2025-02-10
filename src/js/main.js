// Import our custom CSS
import "../scss/styles.scss"

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap"

// BS color picker
import "./bs-color-picker.js"

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// const offCanvasNavItem = document.querySelectorAll('.offcanvas .nav-item')
// offCanvasNavItem.forEach((element) => {
//   element.addEventListener('click', () => {
//     document.querySelector('.offcanvas').classList.remove('show')
//     document.querySelector('.offcanvas-backdrop').classList.remove('show').classList.toggle('d-none')
//   })
// })

import { register } from "register-service-worker"

register(`/service-worker.js`)