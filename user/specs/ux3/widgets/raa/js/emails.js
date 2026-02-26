$(function() {
    var start = 1000;

    var $emails = $('.emails-wrappers');

    if (!$emails.length) return;

    var current = $emails.data().count;
    var max = $emails.data().max;

    var $drawers = $('.top-drawer');
    var $drawer = $('.emails-wrappers .verification-confirmation');
    var $content = $drawer.find('.content');
    var $success = $drawer.find('.success-template');
    var $failure = $drawer.find('.failure-template');
    var $close = $drawer.find('.cancel');

    var template = $emails.find('.template').html();

    $emails.on('click', '.add', function() {
        if(current <max){
            $emails.append(template.replace(/INDEX/g, start++));
            current++;
            $emails.toggleClass('saturated', current >= max);
        }
    });

    $emails.on('click', '.remove', function() {
        $(this).closest('.email').remove();
        current--;
        $emails.toggleClass('saturated', current >= max);
    });

    $emails.on('click', '.make-primary', function() {
        var $old = $emails.find('.email.primary').find('.value');
        var $new = $(this).closest('.email').find('.value');
        var value = $new.val();
        $new.val($old.val());
        $old.val(value);
    });

    $emails.on('click', '.resend-verification', function(event) {
        event.preventDefault();
        $.ajax({method: 'get', url: $(this).attr('href') + '&ajaxRequest=true', xhrFields: { withCredentials: true }}).then(function(data) {
            var $clone;
            if (data.result) {
                $clone = $failure.clone();
                $clone.find('.message').html(data.message);
            } else {
                $clone = $success.clone();
            }
            $content.html($clone.html());
            $drawers.addClass('hidden');
            $drawer.removeClass('hidden');
            $content.slideDown('fast');
        });
    });

    $drawer.on('click', function(event) {
        if ($(event.target).is($drawer) || $(event.target).is($close) || $(event.target).parent().is($close)) {
            $content.slideUp('fast');
            $drawer.addClass('hidden');
            event.preventDefault();
        }
    });

});