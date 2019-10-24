function smoothScroll(evt) {
  scrollToId(evt.target.hash);
}

function scrollToId(id) {
  const target = document.querySelector(id);
  if (target) {
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  }
}

export { scrollToId, smoothScroll };
