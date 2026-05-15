const isMobile = () =>
  ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
  window.innerWidth <= 768
    ? true
    : false;

const isTouchDevice = () =>
  "ontouchstart" in window || navigator.maxTouchPoints > 0 ? true : false;

window.isMobile = isMobile;
window.isTouchDevice = isTouchDevice;
