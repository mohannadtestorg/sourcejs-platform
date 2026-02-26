A17.Behaviors.ImageZoomArea = function(container) {

  var btnZoomIn, btnZoomOut, img;
  var currentZoomLevel = 0;
  var zoomFactor = 1;
  var imgWidth = 0;
  var imgHeight = 0;
  var containerDims = [];
  var imgDims = [];
  var leftDragPos = -50;
  var topDragPos = -50;
  var xDown, yDown, xDiff, yDiff, leftDragPosInit, topDragPosInit;
  var dragging = false;

  function _position() {
    img.style['-webkit-transform'] = 'translate(' + leftDragPos + '%, ' + topDragPos + '%) scale('+zoomFactor+')';
    img.style['-moz-transform'] = 'translate(' + leftDragPos + '%, ' + topDragPos + '%) scale('+zoomFactor+')';
    img.style['-ms-transform'] = 'translate(' + leftDragPos + '%, ' + topDragPos + '%) scale('+zoomFactor+')';
    img.style.transform = 'translate(' + leftDragPos + '%, ' + topDragPos + '%) scale('+zoomFactor+')';
  }

  function _onDraggingStart() {
    if (!dragging && currentZoomLevel > 0) {
      dragging = true;
      leftDragPosInit = leftDragPos;
      topDragPosInit = topDragPos;
      img.classList.add('s-dragging');
    }
  }

  function _onDragging(event, xNow, yNow) {
    if (dragging && currentZoomLevel > 0) {
      if (!xDown || !yDown) {
        return;
      }
      // diffs
      xDiff = xDown - xNow;
      yDiff = yDown - yNow;
      // new values
      leftDragPos = leftDragPosInit - ((xDiff / imgDims[0]) * 100);
      topDragPos = topDragPosInit - ((yDiff / imgDims[1]) * 100);

      // stop dragging off the screen
      var maxDropTop = 50;
      var minDragTop = -150;
      var maxDropLeft = 50;
      var minDragLeft = -150;

      leftDragPos = leftDragPos > maxDropLeft ? maxDropLeft : leftDragPos;
      topDragPos = topDragPos > maxDropTop ? maxDropTop : topDragPos;

      leftDragPos = leftDragPos < minDragLeft ? minDragLeft : leftDragPos;
      topDragPos = topDragPos < minDragTop ? minDragTop : topDragPos;

      // update position
      _position();
    }
  }

  function _onDraggingEnd() {
    if (dragging) {
      dragging = false;
      img.classList.remove('s-dragging');
      // reset
      xDown = undefined;
      yDown = undefined;
      xDiff = undefined;
      yDiff = undefined;
    }
  }

  function _setUpDragging() {
    // dragging
    img.addEventListener('mousedown', function(event){
      event.preventDefault();
      if (event.which === 1 && currentZoomLevel > 0) {
        xDown = event.pageX;
        yDown = event.pageY;
        _onDraggingStart();
      }
    }, false);

    img.addEventListener('mousemove', function(event){
      if (currentZoomLevel > 0) {
        _onDragging(
          event,
          event.pageX,
          event.pageY
        );
      }
    }, false);

    img.addEventListener('mouseup', function(event){
      if (currentZoomLevel > 0) {
        _onDraggingEnd(event);
      }
    }, false);

    // touch versions
    img.addEventListener('touchstart', function(event){
      if (currentZoomLevel > 0) {
        event.preventDefault();
        event.stopPropagation();
        xDown = event.touches[0].clientX;
        yDown = event.touches[0].clientY;
        _onDraggingStart();
      }
    }, false);

    img.addEventListener('touchmove', function(event){
      if (currentZoomLevel > 0) {
        event.preventDefault();
        event.stopPropagation();
        _onDragging(event,event.changedTouches[0].clientX, event.changedTouches[0].clientY);
      }
    }, false);

    img.addEventListener('touchend', function(event){
      if (currentZoomLevel > 0) {
        _onDraggingEnd(event);
      }
    }, false);
  }

  function _bestFit() {
    container.removeAttribute('style');

    containerDims = [];
    containerDims.push(container.offsetWidth);
    containerDims.push(container.offsetHeight);
    containerDims.push(containerDims[1]/containerDims[0]);

    imgDims = [];
    imgDims.push(parseInt(img.width));
    imgDims.push(parseInt(img.height));
    imgDims.push(imgDims[1]/imgDims[0]);

    if (imgDims[2] === containerDims[2]) {
      // square image
      imgDims[0] = Math.min.apply(null, containerDims);
      imgDims[1] = Math.min.apply(null, containerDims);
    } else if (imgDims[2] > containerDims[2]) {
      imgDims[0] = Math.round((imgDims[0]/imgDims[1]) * containerDims[1]);
      imgDims[1] = containerDims[1];
    } else {
      imgDims[1] = Math.round((imgDims[1]/imgDims[0]) * containerDims[0]);
      imgDims[0] = containerDims[0];
    }

    img.style.width = imgDims[0] + 'px';
    img.style.height = imgDims[1] + 'px';
    container.style.height = imgDims[1] + 'px';

    _position();
  }

  function _zoomIn(event) {
    event.preventDefault();
    btnZoomIn.blur();
    currentZoomLevel = currentZoomLevel + 1;
    if (currentZoomLevel === 2) {
      btnZoomIn.disabled = true;
      btnZoomOut.disabled = false;
    } else {
      btnZoomIn.disabled = false;
      btnZoomOut.disabled = false;
    }
    zoomFactor = (currentZoomLevel < 1) ? 1 : (currentZoomLevel * 0.75) + 1;
    zoomFactor = 1 + currentZoomLevel;
    img.classList.add('s-draggable');
    _bestFit();
  }

  function _zoomOut(event) {
    event.preventDefault();
    btnZoomOut.blur();
    currentZoomLevel = currentZoomLevel - 1;
    if (currentZoomLevel === 0) {
      btnZoomIn.disabled = false;
      btnZoomOut.disabled = true;
      img.classList.remove('s-draggable');
    } else {
      btnZoomIn.disabled = false;
      btnZoomOut.disabled = false;
    }
    zoomFactor = (currentZoomLevel < 1) ? 1 : (currentZoomLevel * 0.75) + 1;
    leftDragPos = -50;
    topDragPos = -50;
    _bestFit();
  }

  function _handleResized() {
    if (A17.currentMediaQuery.indexOf('large') < 0) {
      currentZoomLevel = currentZoomLevel - 1;
      btnZoomIn.disabled = false;
      btnZoomOut.disabled = true;
      img.classList.remove('s-draggable');
      zoomFactor = 1;
      leftDragPos = -50;
      topDragPos = -50;
    }
    _bestFit();
  }

  function _launchFigureViewer(event) {
    if (A17.currentMediaQuery.indexOf('large') < 0) {
      event.preventDefault();
      min$(document).trigger('figuresModal:show', { id: container.getAttribute('data-figure-id'), opener: container });
    }
  }

  function _init() {
    img = container.querySelector('img');
    btnZoomIn = container.querySelector('[data-image-zoom-area-zoom-in]');
    btnZoomOut = container.querySelector('[data-image-zoom-area-zoom-out]');

    container.addEventListener('click', _launchFigureViewer, false);
    btnZoomIn.addEventListener('click', _zoomIn, false);
    btnZoomOut.addEventListener('click', _zoomOut, false);
    document.addEventListener('resized', _handleResized);

    _bestFit();
    _setUpDragging();
  }

  this.destroy = function() {
    // remove specific event handlers
    container.removeEventListener('click', _launchFigureViewer);
    btnZoomIn.removeEventListener('click', _zoomIn);
    btnZoomOut.removeEventListener('click', _zoomOut);
    document.removeEventListener('resized', _handleResized);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
