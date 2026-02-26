$(function() {
    $('.social-email').each(function() {
        var $social = $(this);
        var $submit = $social.find('.submit');

        var change = function() {
            if ($social.find('.required').filter(function() { return !$(this).val(); }).length > 0) {
                $submit.attr('disabled', true);
            } else {
                $submit.removeAttr('disabled');
            }
        };



        $social.find('.required').on('keyup input', change);
        change();
    });
});