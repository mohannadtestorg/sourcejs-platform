
UX.menu.on.showAdditional = function() {
    var isMenuOpen = $('body').data('active') == 'menu' ? true : false;

    console.log(isMenuOpen);
    if (isMenuOpen) {
        $('html').css('overflow', 'visible');
        console.log(isMenuOpen);
    }

};