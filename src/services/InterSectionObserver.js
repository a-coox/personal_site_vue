// Use observer if possible, otherwise polyfill
if (!window.IntersectionObserver) {
  require("intersection-observer");
}
