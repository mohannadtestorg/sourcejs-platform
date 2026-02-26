A17.Behaviors.PieChart = function(container) {

  var svgEl = container.querySelector('svg');
  var slices = [];
  var alpha = 1;
  var cumulativeValue = 0;
  var cumulativePercent = 0;
  var svgPath = 'M {{startX}} {{startY}} A 1 1 0 {{largeArcFlag}} 1 {{endX}} {{endY}} L 0 0';

  function _getColour(index) {
    if (index > 0) {
      alpha = alpha * 0.8;
    }
    return 'rgba(11,79,130,'+alpha+')';
  }

  function _gatherData() {
    min$('[data-piechart-item]', container).each(function(item, index){
      var data = {};
      data.value = parseInt(item.querySelector('[data-piechart-value]').textContent);
      cumulativeValue += data.value;
      data.label = item.querySelector('[data-piechart-label]').textContent;
      item.setAttribute('data-piechart-item',index);
      data.item = item;
      slices.push(data);
    });
    for (var i = 0; i < slices.length; i++) {
      var slice = slices[i];
      slice.percent = slice.value/cumulativeValue;
      slice.color = _getColour(i);
    }
  }

  function _getCoordinatesForPercent(percent) {
    var x = Math.cos(2 * Math.PI * percent);
    var y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  function _drawSegments() {
    for (var i = 0; i < slices.length; i++) {
      var slice = slices[i];

      slice.start = _getCoordinatesForPercent(cumulativePercent);
      cumulativePercent += slice.percent;
      slice.end = _getCoordinatesForPercent(cumulativePercent);

      // if the slice is more than 50%, take the large arc (the long way around)
      var largeArcFlag = slice.percent > 0.5 ? 1 : 0;

      // generate path info
      slice.svgPath = svgPath.replace(/{{startX}}/igm, slice.start[0]).replace(/{{startY}}/igm, slice.start[1]).replace(/{{largeArcFlag}}/igm, largeArcFlag).replace(/{{endX}}/igm, slice.end[0]).replace(/{{endY}}/igm, slice.end[1]);

      // create a <path> and append it to the <svg> element
      var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathEl.setAttribute('d', slice.svgPath);
      pathEl.setAttribute('fill', slice.color);
      pathEl.setAttribute('data-piechart-item',i);

      slice.slice = pathEl;
      svgEl.appendChild(pathEl);
    }
  }

  function _sliceMouseOver() {
    var index = this.getAttribute('data-piechart-item');
    var hovered = container.querySelector('[data-piechart-key] [data-piechart-item="'+index+'"]');
    if (hovered) {
      hovered.classList.add('s-hover');
    }
  }

  function _sliceMouseOut() {
    var hovered = container.querySelector('[data-piechart-key] .s-hover');
    if (hovered) {
      hovered.classList.remove('s-hover');
    }
  }

  function _itemMouseOver() {
    var index = parseInt(this.getAttribute('data-piechart-item'));
    var hovered = container.querySelector('[data-piechart-chart] [data-piechart-item="'+index+'"]');
    if (hovered) {
      hovered.classList.add('s-hover');
    }
  }

  function _itemMouseOut() {
    var hovered = container.querySelector('[data-piechart-chart] .s-hover');
    if (hovered) {
      hovered.classList.remove('s-hover');
    }
  }

  function _setUpInteractions() {
    for (var i = 0; i < slices.length; i++) {
      var slice = slices[i];
      slice.slice.addEventListener('mouseover', _sliceMouseOver, false);
      slice.slice.addEventListener('mouseout', _sliceMouseOut, false);
      slice.item.addEventListener('mouseover', _itemMouseOver, false);
      slice.item.addEventListener('mouseout', _itemMouseOut, false);
    }
  }

  function _init() {
    _gatherData();
    _drawSegments();
    _setUpInteractions();
  }

  this.destroy = function() {
    // remove specific event handlers
    for (var i = 0; i < slices.length; i++) {
      var slice = slices[i];
      slice.slice.removeEventListener('mouseover', _sliceMouseOver);
      slice.slice.removeEventListener('mouseout', _sliceMouseOut);
      slice.item.removeEventListener('mouseover', _itemMouseOver);
      slice.item.removeEventListener('mouseout', _itemMouseOut);
    }

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
