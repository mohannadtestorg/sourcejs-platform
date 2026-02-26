A17.Behaviors.RefreshGoogleCharts = function(container) {
  function _redrawChart() {
    A17.Helpers.triggerCustomEvent(document,"googlecharts:draw");
  }

  function _init() {
    if(google.charts) min$(container).on('collapsible:open', _redrawChart);
  }

  this.destroy = function() {
    if(google.charts) min$(container).off('collapsible:open', _redrawChart);

    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
