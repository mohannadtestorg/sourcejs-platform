(function () {

    var $window = $(window),
        $body = $('body');

    var sortableTable =  {
        $table: null,
        $tbody:null,

        init: function () {
            sortableTable.$table = $('.table--sortable');
            sortableTable.control();
        },
        control: function () {

            //grab all header rows
            sortableTable.$table.find('th.sortable').each(function (column) {
                $(this).click(function () {
                    var findSortKey = function ($cell) {
                        return $cell.find('.sort-key').text().toUpperCase()+ ' ' + $cell.text().toUpperCase();

                    };
                    var sortDirection = $(this).is('.sorted-asc') ? -1 : 1;
                    var $tbody = $(this).closest('.table--sortable').find('tbody');
                    var $rows = $(this).closest('.table--sortable').find('tbody tr').get();
                    var bob = 0;
                    //loop through all the rows and find
                    $.each($rows, function (index, row) {
                        row.sortKey = findSortKey($(row).children('td').eq(column));
                    });

                    //compare and sort the rows alphabetically or numerically
                    $rows.sort(function (a, b) {
                        if (a.sortKey.indexOf('-') == -1 && (!isNaN(a.sortKey) && !isNaN(a.sortKey))) {
                            //Rough Numeracy check

                            if (parseInt(a.sortKey) < parseInt(b.sortKey)) {
                                return -sortDirection;
                            }
                            if (parseInt(a.sortKey) > parseInt(b.sortKey)) {
                                return sortDirection;
                            }

                        } else {
                            if (a.sortKey < b.sortKey) {
                                return -sortDirection;
                            }
                            if (a.sortKey > b.sortKey) {
                                return sortDirection;
                            }
                        }
                        return 0;
                    });

                    //add the rows in the correct order to the bottom of the table
                    $.each($rows, function (index, row) {
                        $tbody.append(row);
                        row.sortKey = null;
                    });

                    //identify the collumn sort order
                    $('th').removeClass('sorted-asc sorted-desc');
                    var $sortHead = $('th').filter(':nth-child(' + (column + 1) + ')');
                    sortDirection == 1 ? $sortHead.addClass('sorted-asc') : $sortHead.addClass('sorted-desc');

                    //identify the collum to be sorted by
                    $('td').removeClass('sorted').filter(':nth-child(' + (column + 1) + ')').addClass('sorted');


                    if (sortableTable.$table.hasClass('js-pages')) {
                        sortableTable.pager.rebuild();
                    }
                });
            });
        },

        pager: {
            rebuild: function () {
                var page = 0;
                var pageSize = sortableTable.$table.find("[data-page=1]").length;

                sortableTable.$table.find("[data-page]").each(function (index) {

                    if (index%pageSize == 0 ) {
                        page++;
                    }

                    $(this).attr('data-page', page);

                });

                var activePage = sortableTable.$table.find('.pagination__list .active').data('target-page');
                sortableTable.$table.find("[data-page]").hide();
                sortableTable.$table.find("[data-page="+activePage+"]").show();
            }
        }

    };
    UX.sortableTable = sortableTable; // add to global namespace
})();

