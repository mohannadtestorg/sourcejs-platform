(function () {

    var sortableTableRow = {
        $tableBody: $(".sortable-table tbody"),

        init: function () {

            if (typeof sortableTableRow.$tableBody.sortable !== 'undefined') {
                sortableTableRow.$tableBody.sortable({
                    handle: '.btn--handle',
                    items: 'tr.sortable-row',
                    stop: sortableTableRow.afterStopSortRow,
                    axis: 'y'
                });
            }
        },
        controller: function () {

        },
        afterStopSortRow: function (event, ui) {
            if ($(".submission-authors").length > 0) {
                var $authorsRows = ui.item.closest(".authors__table").find(".author__row");
                $authorsRows.each(function (index) {
                    $(this).find("input.author__order").val(index);
                });

            }

        }


    };

    UX.sortableTableRow = sortableTableRow; // add to global namespace

})();