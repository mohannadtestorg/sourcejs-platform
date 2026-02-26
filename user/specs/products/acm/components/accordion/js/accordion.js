UX.accordion.logic=function () {
    UX.accordion.hideAll();
}

UX.accordion.on.toggle.tabbed= function ($this) {
    var $parent = $this.closest('.accordion-tabbed__tab');
    var $opened = $this.closest('.accordion-tabbed').children('.js--open');

    var state = !($this.attr('aria-expanded') == 'true');
    $this.attr('aria-expanded',state);

    if (!$parent.hasClass('js--open')) {
        //$opened.children('.accordion-tabbed__content').slideUp(200);
        $parent.children('.accordion-tabbed__content').slideDown(200, function () {
            // $opened.removeClass('js--open');
            $parent.addClass('js--open');
        });
    } else {
        $parent.children('.accordion-tabbed__content').slideUp(200, function () {
            $parent.removeClass('js--open');
        });
    }
}