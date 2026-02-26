A17.Functions.removeIOSRubberEffect = function(element) {

  function onTouchStart() {
    var top = element.scrollTop;
    var totalScroll = element.scrollHeight;
    var currentScroll = top + element.offsetHeight;
    //
    if (top === 0) {
      element.scrollTop = 1;
    } else if (currentScroll === totalScroll) {
      element.scrollTop = top - 1;
    }
  }

  try {
    element.removeEventListener('touchstart', onTouchStart);
  } catch (err) {}

  try {
    element.addEventListener('touchstart', onTouchStart);
  } catch (err) {}
};
