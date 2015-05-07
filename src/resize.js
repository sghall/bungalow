export function getResizeHandler(domElement, screen) {
  return function () {
    if (domElement === document) {
      screen.left   = 0;
      screen.top    = 0;
      screen.width  = window.innerWidth;
      screen.height = window.innerHeight;
    } 
    else {
      let box = domElement.getBoundingClientRect();
      let own = domElement.ownerDocument.documentElement;

      screen.left   = box.left + window.pageXOffset - own.clientLeft;
      screen.top    = box.top  + window.pageYOffset - own.clientTop;
      screen.width  = box.width;
      screen.height = box.height;
    }
  };
}