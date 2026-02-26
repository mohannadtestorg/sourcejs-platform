$(document).on('click', '.back-to-top', function (e) {
    e.preventDefault();
    $('html,body').animate({scrollTop: 0});

});