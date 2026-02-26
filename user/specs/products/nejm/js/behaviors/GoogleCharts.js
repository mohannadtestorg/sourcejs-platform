A17.Behaviors.GoogleCharts = function(container) {
  var mapElements  = document.querySelectorAll("[data-google-charts-map]");
  var lineElements = document.querySelectorAll("[data-google-charts-line]");

  function _forEach(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, array[i], i);
    }
  }

  function _drawChart() {
    if(mapElements.length) {
      _forEach(mapElements, function(mapElement, i) {

        var options = {
          colorAxis: {colors: ['#EFE3D8', '#FF3000']},
          tooltip: { isHtml: true },
        };
        var dataVar = mapElement.getAttribute("data-google-charts-map");
        var data = window[dataVar];

        if(data) {
          var dataTable = google.visualization.arrayToDataTable(data);
          var chart = new google.visualization.GeoChart(mapElement);
          chart.draw(dataTable, options);
        }
      });
    }

    if(lineElements.length) {
      _forEach(lineElements, function(lineElement, i) {

        var chartwidth = lineElement.offsetWidth;

        var options = {
          width: chartwidth,
          legend: 'none',
          colors:['#FF3000'],
          hAxis: {
            title: 'Days'
          },
          tooltip: { isHtml: true },
          chartArea: {right:0,left:50}
        };
        var dataVar = lineElement.getAttribute("data-google-charts-line");
        var data = window[dataVar];

        if(data) {
          var dataTable = google.visualization.arrayToDataTable(data);
          var chart = new google.visualization.LineChart(lineElement);
          chart.draw(dataTable, options);
        }
      });
    }
  }

  function _init() {
    if(google.charts) {
      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(_drawChart);

      document.addEventListener('resized', _drawChart);
      document.addEventListener('googlecharts:draw', _drawChart);
    }
  }

  this.destroy = function() {
    // remove specific event handlers
    // remove properties of this behavior

    document.removeEventListener('resized', _drawChart);
    document.removeEventListener('googlecharts:draw', _drawChart);

    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
