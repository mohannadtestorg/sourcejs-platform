(function () {

    UX.accordion.on = {
        toggle: {
            single: function ($this) {
                $this.siblings('.accordion__content').slideToggle(200);
                $this.toggleClass('js--open');

                var state = !($this.attr('aria-expanded') == 'true');
                $this.attr('aria-expanded',state);
            },
            tabbed: function ($this) {
                var $parent = $this.parents('.accordion-tabbed__tab');
                var $opened = $this.parents('.accordion-tabbed').find('.js--open');

                var state = !($this.attr('aria-expanded') == 'true');
                $this.attr('aria-expanded',state);

                if (!$parent.hasClass('js--open')) {
                    $opened.find('.accordion-tabbed__content').slideUp(200);
                    $parent.find('.accordion-tabbed__content').slideDown(200, function () {
                        $opened.removeClass('js--open');
                        $parent.addClass('js--open');
                    });
                } else {
                    $parent.find('.accordion-tabbed__content').slideUp(200, function () {
                        $opened.removeClass('js--open');
                    });
                }
            }
        }
    }
})();
