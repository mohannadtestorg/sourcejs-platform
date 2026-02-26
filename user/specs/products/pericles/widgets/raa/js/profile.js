$(document).ready(function () {
    $('.raaAccountInfo input[name="marketable.value"]').on('change', function(e){
        $('input[name="marketable.value"]').attr('checked', false);
        $(this).attr('checked', true);

        var section = $(this).parents('.marketable')[0].outerHTML,
            $form = $('.raaAccountInfo').find('form'),
            $dropzone= $form.find('.formDropZone');
        $dropzone.append('<div class="hidden">'+section+'</div>');
        //$form.find('[type="submit"]').trigger('click');
    });

    $('#institutionList').change(function() {
        console.log($(this).val());
        window.location.href = $(this).val();
    });

    var $entitlements = $('#pane-series');
    if ($entitlements.length > 0) {
        paginate($entitlements);
    }

    function paginate($container) {
        var maxPerPage = 4,
            $table = $container.find('.table-responsive'),
            $tr = $table.find('tbody tr');

        if ($tr.length > maxPerPage) {
            // add pager html
            $table.addClass('js-pages');
            var pager = '<div class="pagination js-pager">\n' +
                '            <ul class="rlist--inline pagination__list">\n' +
                '                 <li><a href="#" data-target-page="1" title="1" class="active">1</a></li>\n'
                '            </ul>\n' +
                '        </div>';
            $table.append(pager);

            var prevPage = 1;
            $tr.each(function (index) {
                var currentPage= parseInt(index / maxPerPage)+1;

                // add data-page to table tr
                $(this).attr('data-page', currentPage);

                if (currentPage > prevPage) {
                    var page = '<li><a href="#" data-target-page="'+currentPage+'" title="'+currentPage+'">'+currentPage+'</a></li>'
                    $table.find('.js-pager ul').append(page);
                    prevPage = currentPage;
                }
            });

            UX.pager.$pages= $('.js-pages');
            UX.pager.$pager= $('.js-pager');
            UX.pager.init();
        }
    }
});
