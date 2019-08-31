// Use observer if possible, otherwise polyfill
export default window.IntersectionObserver || require('intersection-observer');