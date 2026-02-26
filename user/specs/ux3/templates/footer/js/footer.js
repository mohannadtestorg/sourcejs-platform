
function setMinContentHeight() {
    $('main').css('min-height', $(window).height() - ($('footer').height() + parseInt($('footer').css('margin-top'))));
}

$(document).ready(function () {

    setMinContentHeight();
    $(window).resize(setMinContentHeight);

});

