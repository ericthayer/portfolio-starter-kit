// Import our custom CSS
import "../scss/styles.scss"

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap"

// BS color picker
import "./bs-color-picker.js"

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js")
  }