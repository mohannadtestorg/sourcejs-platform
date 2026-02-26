$(function() {

    var pattern = /^([\w-+]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    $('.loginInformation').each(function() {
        var $form = $(this);
        var $email = $form.find('.email');
        var $email2 = $form.find('.email2');


        var change = function() {
            $(this).prevAll('.label').removeClass('error').find('.message').remove();
        };

        var blur = function() {
            var $email = $(this);
            if ($email.val() && !pattern.test($email.val())) {
                var $label = $email.prevAll('.label');
                $label.addClass('error');
                var $message = $label.find('.message');
                if (!$message.length) {
                    $message = $('<span class="message"></span>').appendTo($label);
                }
                $message.html('<span> - </span> Is Invalid')
            }
        };

        $email.on('blur', blur).on('change', change);
        $email2.on('blur', blur).on('change', change);
    });
});
