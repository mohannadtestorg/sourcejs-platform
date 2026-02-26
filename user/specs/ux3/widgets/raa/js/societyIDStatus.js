$(function() {
    var $drawer = $('.society-id-status');
    var $content = $drawer.find('.content');

    $content.slideDown('fast');

    $drawer.on('click', '.cancel', function(event) {
        $content.slideUp('fast');
        $drawer.addClass('hidden');
        event.preventDefault();
    });


    hideSocietyStatusDialog($drawer)
});

function hideSocietyStatusDialog($drawer){
    $drawer.delay(8000).hide(0);
}