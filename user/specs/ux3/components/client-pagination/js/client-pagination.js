(function () {

    var $window = $(window),
        $body = $('body');

    var clientPagination = {
        containerName: ".client-pagination",
        showPerPage: null,
        $currentPage: null,
        $pagesdisplyed: null,
        tableRow: ".client-pagination-table .tablerow",


        init: function () {
            clientPagination.showPerPage = parseInt($(clientPagination.containerName).find('.show_per_page').val(), 0);
            clientPagination.$currentPage = $(clientPagination.containerName).find('.current_page');
            clientPagination.$pagesdisplyed = parseInt($(clientPagination.containerName).find('.pages-displyed').val(), 0);
            clientPagination.buildPagination();
            clientPagination.control();
        },
        set: {
            containerName: function (name) {
                clientPagination.containerName = name;
            },
            tableRowName: function (name) {
                clientPagination.tableRow = name;
            }
        },
        control: function () {
            $body.on('click', clientPagination.containerName + ' .pagination__btn--prev', function (e) {
                e.preventDefault();
                clientPagination.previous();
            })

            $body.on('click', clientPagination.containerName + ' .pagination__btn--next', function (e) {
                e.preventDefault();
                clientPagination.next();
            })

            $body.on('click', clientPagination.containerName + ' .page', function (e) {
                e.preventDefault();
                clientPagination.goToPage($(this).data('page-index'));
            })


        },
        buildPagination: function () {
            var number_of_items = $(clientPagination.tableRow).length;
            var number_of_pages = Math.ceil(number_of_items / clientPagination.showPerPage);
            $(clientPagination.containerName).remove('.page');


            if (number_of_items > clientPagination.showPerPage) {
                $(clientPagination.tableRow).css('display', 'none');
                $(clientPagination.containerName).removeClass('hidden');
                $(clientPagination.tableRow).slice(0, clientPagination.showPerPage).css('display', 'table-row');
                $(clientPagination.containerName).find('.prev').hide();
                $(clientPagination.containerName).find('.next').show();
                var i = 0;
                $(clientPagination.containerName).find('.pages').empty();
                while (i < number_of_pages) {
                    if (i >= clientPagination.$pagesdisplyed) {
                        $(clientPagination.containerName).find('.pages').append('<a class="page hidden" href="#" title="page ' + (i + 1) + '" data-page-index="' + (i) + '">' + (i + 1) + '</a>');
                    }
                    else {
                        $(clientPagination.containerName).find('.pages').append('<a class="page" href="#" title="page ' + (i + 1) + '" data-page-index="' + (i) + '">' + (i + 1) + '</a>');
                    }
                    i++;
                }
                $(clientPagination.containerName).find('[data-page-index="0"]').addClass('selected');
            }
            else {
                $(clientPagination.containerName).addClass('hidden');
            }
        },
        goToPage: function (page_num) {

            var number_of_items = $(clientPagination.tableRow).length;
            var number_of_pages = Math.ceil(number_of_items / clientPagination.showPerPage);

            var start_from = page_num * clientPagination.showPerPage;
            var end_on = start_from + clientPagination.showPerPage;
            var $currentPage = $(clientPagination.containerName).find('[data-page-index="' + page_num + '"]');


            $(clientPagination.tableRow).css('display', 'none').slice(start_from, end_on).css('display', 'table-row');
            clientPagination.$currentPage.val(page_num);
            $(clientPagination.containerName).find('.page').removeClass('selected');
            $currentPage.addClass('selected');


            var showpagesBeforeAfter = Math.ceil(clientPagination.$pagesdisplyed / 2);
            $(clientPagination.containerName).find('.page').addClass('hidden');
            if (page_num + 1 > showpagesBeforeAfter) {
                for (i = page_num + 1 - showpagesBeforeAfter; i < page_num + showpagesBeforeAfter; i++) {
                    if( i<=number_of_pages)
                        $(clientPagination.containerName).find('[data-page-index="' + i + '"]').removeClass('hidden');
                }
            }
            else{
                for (i = 0; i <  clientPagination.$pagesdisplyed; i++) {
                        $(clientPagination.containerName).find('[data-page-index="' + i + '"]').removeClass('hidden');
                }
            }


            if (page_num == 0)
                $(clientPagination.containerName).find('.prev').hide()
            else
                $(clientPagination.containerName).find('.prev').show();

            if (page_num == number_of_pages - 1)
                $(clientPagination.containerName).find('.next').hide()
            else
                $(clientPagination.containerName).find('.next').show();

        },
        previous: function () {
            var new_page = parseInt(clientPagination.$currentPage.val(), 0) - 1;
            if (new_page > -1) {
                clientPagination.goToPage(new_page);
            }

        },
        next: function () {
            var new_page = parseInt(clientPagination.$currentPage.val(), 0) + 1;
            var number_of_items = $(clientPagination.tableRow).length;
            var number_of_pages = Math.ceil(number_of_items / clientPagination.showPerPage);

            if (new_page < number_of_pages) {
                clientPagination.goToPage(new_page);
            }
        }


    }


    UX.clientPagination = clientPagination; // add to global namespace
})();