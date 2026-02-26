$(function() {
    var $confirmation = $('.registration-confirmation');
    $confirmation.on('click', '.resend', function() {
        event.preventDefault();
        $.ajax({method: 'get', url: $(this).attr('href') + '&ajaxRequest=true', xhrFields: { withCredentials: true }}).then(function() {
            $confirmation.html('A link has been resent to your email');
        }).fail(function() {
            $confirmation.html('An error has occurred');
        });
    });
    var $popup = $('.societyID-popup');
    var $close = $popup.find('.close');

    $popup.delay(5000).hide(0);

    $popup.on('click', function (e) {
        if ($(e.target).is($popup) || $(e.target).is($close) || $(e.target).parent().is($close)) {
            e.preventDefault();
            $popup.addClass('hidden');
        }
    });
});
