$(function() {
    $('.identityTokenWidget').each(function() {
        var $form = $(this).find('form');
        var $submit = $form.find('.submit');
        var $token = $form.find('.token');

        var change = function() {
            if (!$token.val()) {
                $submit.attr('disabled', true);
            } else {
                $submit.removeAttr('disabled');
            }
        };

        $token.on('keyup input', change);
        change();
    });
});