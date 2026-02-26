$(function() {
    var start = 1000;

    var $phones = $('.phones-wrappers');

    if (!$phones.length) return;

    var current = $phones.data().count;
    var max = $phones.data().max;

    var template = $phones.find('.template').html();

    $phones.on('click', '.add', function() {
        if(current <max) {
            $phones.append(template.replace(/INDEX/g, start++));
            current++;
            $phones.toggleClass('saturated', current >= max);
        }
    });

    $phones.on('click', '.remove', function() {
        $(this).closest('.phone').remove();
        current--;
        $phones.toggleClass('saturated', current >= max);
    });

});