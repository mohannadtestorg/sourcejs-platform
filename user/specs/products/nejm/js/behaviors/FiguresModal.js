A17.Behaviors.FiguresModal = function(container) {

  var active = false;
  var dE = document.documentElement;
  var currentObj;
  var currentIndex;
  var menuHtml = '';
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
  var opener;

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
      if (event.which === 1) {
        xDown = event.pageX;
        yDown = event.pageY;
        _onDraggingStart();
      }
    }, false);

    img.addEventListener('mousemove', function(event){
      _onDragging(
        event,
        event.pageX,
        event.pageY
      );
    }, false);

    img.addEventListener('mouseup', _onDraggingEnd, false);

    // touch versions
    img.addEventListener('touchstart', function(event){
      event.preventDefault();
      event.stopPropagation();
      xDown = event.touches[0].clientX;
      yDown = event.touches[0].clientY;
      _onDraggingStart();
    }, false);

    img.addEventListener('touchmove', function(event){
      event.preventDefault();
      event.stopPropagation();
      _onDragging(event,event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    }, false);

    img.addEventListener('touchend', _onDraggingEnd, false);
  }

  function _bestFit() {
    containerDims = [];
    containerDims.push(img.parentNode.offsetWidth);
    containerDims.push(img.parentNode.offsetHeight);
    containerDims.push(containerDims[1]/containerDims[0]);

    imgDims = [];
    imgDims.push(currentObj.width);
    imgDims.push(currentObj.height);
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

    _position();
  }

  function _showNewImg() {
    img.width = currentObj.width;
    img.height = currentObj.height;

    _bestFit();

    img.style.opacity = 1;
  }

  function _newImgLoaded() {
    currentObj.width = img.width;
    currentObj.height = img.height;
    _showNewImg();
    img.removeEventListener('load', _newImgLoaded);
  }

  function _populate() {
    currentZoomLevel = 0;
    zoomFactor = 1;
    leftDragPos = -50;
    topDragPos = -50;
    btnZoomIn.disabled = false;
    btnZoomOut.disabled = true;
    img.classList.remove('s-draggable');

    img.srcset = '';
    img.style = '';
    img.style.opacity = 0;
    img.srcset = currentObj.srcset;

    if (currentObj.width && currentObj.height) {
      _showNewImg();
    } else {
      img.addEventListener('load', _newImgLoaded, false);
    }

    if (currentObj.title || currentObj.intro || currentObj.description) {
      container.querySelector('[data-figures-modal-caption]').innerHTML = '<strong class="f-h11">' + currentObj.title + ' ' + currentObj.intro + '</strong> ' + currentObj.description;
      container.classList.remove('s-figcaption-empty');
    } else {
      container.classList.add('s-figcaption-empty');
    }
    if (window.figureViewer.length > 1) {
      container.querySelector('.s-active').classList.remove('s-active');
      container.querySelector('[data-figures-modal-menu-item="'+currentIndex+'"]').classList.add('s-active');
    }
  }

  function _setCurrentObjAndCurrentIndexByKey(key) {
    for (var i = 0; i < window.figureViewer.length; i++) {
      if (window.figureViewer[i].id === key) {
        currentIndex = i;
        currentObj = window.figureViewer[i];
      }
    }
  }

  function _setCurrentObjAndCurrentIndexByIndex(index) {
    currentIndex = index;
    currentObj = window.figureViewer[index];
  }

  function _next(event) {
    event.preventDefault();
    this.blur();
    var newIndex = (currentIndex + 1 < window.figureViewer.length) ? currentIndex + 1 : 0;
    _setCurrentObjAndCurrentIndexByIndex(newIndex);
    _populate();
  }

  function _prev(event) {
    event.preventDefault();
    this.blur();
    var newIndex = (currentIndex > 0) ? currentIndex - 1 : window.figureViewer.length - 1;
    _setCurrentObjAndCurrentIndexByIndex(newIndex);
    _populate();
  }

  function _showMenu(event) {
    event.preventDefault();
    this.blur();
    container.classList.add('s-menu-open');
    min$(document).trigger('tooltip:hide');
  }

  function _hideMenu(event) {
    event.preventDefault();
    this.blur();
    container.classList.remove('s-menu-open');
  }

  function _download(event) {
    event.preventDefault();
    this.blur();
    var win = window.open(currentObj.downloadUrl, '_blank');
    win.focus();
    min$(document).trigger('tooltip:hide');
  }

  function _setupMenuClicks() {
    min$('[data-figures-modal-menu-item]',container).on('click', function(event){
      event.preventDefault();
      var newIndex = parseInt(this.getAttribute('data-figures-modal-menu-item'));
      _setCurrentObjAndCurrentIndexByIndex(newIndex);
      _populate();
      container.classList.remove('s-menu-open');
    });
  }

  function _generateMenu() {
    if (menuHtml === '') {
      var item = '<li class="o-figures-modal__menu-item{{current}}" data-figures-modal-menu-item="{{index}}"><span class="o-figures-modal__menu-img-container"><span class="o-figures-modal__menu-img"><img srcset="{{srcset}}" sizes="100vw" alt="{{intro}}"></span></span><strong class="o-figures-modal__menu-title f-ui">{{title}}</strong></a></li>';
      for (var i = 0; i < window.figureViewer.length; i++) {
        menuHtml += item.replace(/{{index}}/igm,i).replace(/{{srcset}}/igm,window.figureViewer[i].thumbSrcset).replace(/{{width}}/igm,window.figureViewer[i].width).replace(/{{height}}/igm,window.figureViewer[i].height).replace(/{{intro}}/igm,window.figureViewer[i].intro).replace(/{{title}}/igm,window.figureViewer[i].title).replace(/{{current}}/igm, (currentIndex === i) ? ' s-active' : '');
      }
      container.querySelector('[data-figures-modal-menu-list]').innerHTML = menuHtml;
      _setupMenuClicks();
    }
  }

  function _showFigcaption() {
    container.querySelector('[data-figures-modal-figcaption-toggle]').setAttribute('data-tooltip','Hide info');
    min$(document).trigger('tooltip:hide');
    container.classList.remove('s-figcaption-collapsed');
  }

  function _hideFigcaption() {
    container.querySelector('[data-figures-modal-figcaption-toggle]').setAttribute('data-tooltip','Show info');
    min$(document).trigger('tooltip:hide');
    container.classList.add('s-figcaption-collapsed');
  }

  function _toggleFigcaption(event) {
    event.preventDefault();
    this.blur();
    if (container.classList.contains('s-figcaption-collapsed')) {
      _showFigcaption();
    } else {
      _hideFigcaption();
    }

    setTimeout(function(){
      _bestFit();
    }, 250);
  }

  function _focusTrap() {
    if (!container.contains(document.activeElement)) {
      A17.Functions.setFocusOnTarget(container);
    }
  }

  function _show(event) {
    _setCurrentObjAndCurrentIndexByKey(event.data.id);
    opener = event.data.opener;
    if (currentObj && !active) {
      active = true;
      min$(document).trigger('body:lock', {
        breakpoints: 'xsmall small medium large xlarge xxlarge'
      });
      dE.classList.add('s-figures-modal-open');
      dE.classList.add('s-disable-touchmove');

      if (currentObj.title || currentObj.intro || currentObj.description) {
        container.classList.remove('s-figcaption-empty');
      } else {
        container.classList.add('s-figcaption-empty');
      }
      _showFigcaption();
      if (window.figureViewer.length > 1) {
        _generateMenu();
      }
      _populate();
      A17.Functions.setFocusOnTarget(container);
      min$(document).trigger('page:updated');
      document.addEventListener('focus', _focusTrap, true);
    }
  }

  function _hide(event) {
    try {
      event.preventDefault();
    } catch(err) {}
    if (active) {
      active = false;
      dE.classList.remove('s-figures-modal-open');
      dE.classList.remove('s-disable-touchmove');
      min$(document).trigger('body:unlock');
      min$(document).trigger('page:updated');
      container.blur();
      if (opener) {
        A17.Functions.setFocusOnTarget(opener);
      }
      opener = null;
      document.removeEventListener('focus', _focusTrap);
    }
  }

  function _escape(event) {
    var isInput = (event.target.tagName === 'INPUT');
    if (active && event.keyCode === 27 && !isInput) {
      min$(document).trigger('figuresModal:hide');
    }
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
    if (active) {
      _bestFit();
    }
  }

  function _init() {
    if (typeof(window.figureViewer) === undefined || !window.figureViewer || window.figureViewer.length === 0) {
      // nothing to do
      return;
    }

    if (window.figureViewer.length === 1) {
      container.classList.add('s-no-figures-modal-menu');
    }

    img = container.querySelector('[data-figures-modal-image]');
    btnZoomIn = container.querySelector('[data-figures-modal-zoom-in]');
    btnZoomOut = container.querySelector('[data-figures-modal-zoom-out]');

    container.querySelector('[data-figures-modal-close]').addEventListener('click', _hide, false);
    container.querySelector('[data-figures-modal-next]').addEventListener('click', _next, false);
    container.querySelector('[data-figures-modal-prev]').addEventListener('click', _prev, false);
    container.querySelector('[data-figures-modal-menu]').addEventListener('click', _showMenu, false);
    container.querySelector('[data-figures-modal-menu-close]').addEventListener('click', _hideMenu, false);
    container.querySelector('[data-figures-modal-download]').addEventListener('click', _download, false);
    container.querySelector('[data-figures-modal-figcaption-toggle]').addEventListener('click', _toggleFigcaption, false);
    btnZoomIn.addEventListener('click', _zoomIn, false);
    btnZoomOut.addEventListener('click', _zoomOut, false);
    document.addEventListener('figuresModal:show', _show, false);
    document.addEventListener('figuresModal:hide', _hide, false);
    document.addEventListener('resized', _handleResized);
    window.addEventListener('keyup', _escape, false);

    _setUpDragging();
  }

  this.destroy = function() {
    // remove specific event handlers
    container.querySelector('[data-figures-modal-close]').removeEventListener('click', _hide);
    container.querySelector('[data-figures-modal-next]').removeEventListener('click', _next);
    container.querySelector('[data-figures-modal-prev]').removeEventListener('click', _prev);
    container.querySelector('[data-figures-modal-menu]').removeEventListener('click', _showMenu);
    container.querySelector('[data-figures-modal-menu-close]').removeEventListener('click', _hideMenu);
    container.querySelector('[data-figures-modal-download]').removeEventListener('click', _download);
    container.querySelector('[data-figures-modal-figcaption-toggle]').removeEventListener('click', _toggleFigcaption);
    btnZoomIn.removeEventListener('click', _zoomIn);
    btnZoomOut.removeEventListener('click', _zoomOut);
    document.removeEventListener('figuresModal:show', _show);
    document.removeEventListener('figuresModal:hide', _hide);
    document.removeEventListener('resized', _handleResized);
    window.removeEventListener('keyup', _escape);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
