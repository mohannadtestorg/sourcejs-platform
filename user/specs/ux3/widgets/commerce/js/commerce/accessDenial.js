$(function () {
    var $purchase = $('.purchaseArea');

    $purchase.on('click', '.expand-link', function (event) {
        event.preventDefault();
        var $link = $(this);
        var $content = $link.nextAll('.content');
        $link.toggleClass('active');
        $content.toggleClass('hidden');
    });

    var $deepdyve = $purchase.find('.deep-dyve');

    if ($deepdyve.length) {
        var url = 'http://www.deepdyve.com/rental-link';
        var data = $deepdyve.data();
        if (data.affid && data.issn && data.doi) {
            $.ajax({
                url: url,
                data: {
                    docId: data.doi,
                    fieldName: 'journal_doi',
                    journal: data.issn,
                    affiliateId: data.affid,
                    format: 'jsonp'
                },
                dataType: 'jsonp',
                jsonp: 'callback'
            }).then(function (json) {
                if (json.status === 'ok') {
                    $deepdyve.attr('href', json.url);
                    $deepdyve.removeClass('hidden');
                }
            });
        }
    }
})();
