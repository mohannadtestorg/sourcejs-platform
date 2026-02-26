A17.Behaviors.ResponsiveDataTable = function(container) {

  var i, table, tablesContainer, tableDupe, dupeDiv, tableHTML, tableRows, dupeTableRows;

  function _duplicateTable() {
    tableHTML = table.outerHTML;
    dupeDiv = document.createElement('div');
    dupeDiv.innerHTML = tableHTML;
    dupeDiv.className += 'm-data-table__dupe-container';
    tableDupe = dupeDiv.querySelector('table');
    tableDupe.setAttribute('aria-hidden',true);
    tableDupe.className += ' m-data-table__table--dupe';
    table.className += ' m-data-table__table--original';
    tablesContainer.append(dupeDiv);
    tableDupe = container.querySelector('.m-data-table__table--dupe');
    tableRows = table.rows;
    dupeTableRows = tableDupe.rows;
  }

  function _handleResized() {
    // on resize undo damage
    container.classList.remove('s-scrolly');
    for(i = 0; i < tableRows.length; i++){
      tableRows[i].style.height = 'auto';
      dupeTableRows[i].style.height = 'auto';
    }
    // check if we need to make it scrolly and lock heights
    if (table.offsetWidth > container.offsetWidth) {
      container.classList.add('s-scrolly');
      for(i = 0; i < tableRows.length; i++){
        var largest = Math.max(tableRows[i].offsetHeight, dupeTableRows[i].offsetHeight);
        tableRows[i].style.height = largest + 'px';
        dupeTableRows[i].style.height = largest + 'px';
      }
    }
  }

  function _init() {
    table = container.querySelector('table');
    tablesContainer = container.querySelector('[data-tables-container]');
    if (table && tablesContainer) {
      _duplicateTable();
      window.requestAnimationFrame(_handleResized);
      document.addEventListener('resized', _handleResized);
    }
  }

  this.destroy = function() {
    // remove specific event handlers
    if (table) {
      table.classList.remove('m-data-table__table--original');
      container.removeChild(dupeDiv);
      table = null;
      dupeDiv = null;
      tableDupe = null;
      tableHTML = null;
      document.removeEventListener('resized', _handleResized);
    }

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
