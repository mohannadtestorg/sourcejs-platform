var $body = $('body');

UX.menu.on.nested=function (e) {
    if (UX.menu.isMobile) {
        $(e.target).toggleClass('selected')
        $(e.target).next('.dropdown__menu').slideToggle() ;
    }
}

UX.menu.addtionalControl=function () {

    $body.on('click', '.menubar .icon-section_arrow_d.hidden-lg', function (e) {

        if (UX.menu.isMobile) {
            $(e.target).parent().toggleClass('selected')
            $(e.target).parent().next('.dropdown__menu').slideToggle() ;
        }
    });
}

