(function () {
    var $body = $('body'),
        isMobile = false;

    var accordion = {
        $elements: $('.accordion'),
        $tabbedElements: $('.accordion-tabbed'),
        $controllers: $('.accordion__control'),
        $tabbedControllers: $('.accordion-tabbed__control'),
        isMobile : false,
        vPort: "screen-md",
        init: function () {
            accordion.logic($('.accordion-tabbed'));
            accordion.control();
        },
        control: function () {
            $body.on('click', '.accordion__control', function (e) {
                var attr = $(this).is('[data-slide-target]');
                // Check if its external link or if its slide controll and mobile view port
                if ($(this).hasClass("external") || (typeof attr !== typeof undefined && attr !== false && isMobile)){
                    return; // do nothing
                } else {
                    e.preventDefault();
                    var $this = $(this);
                    accordion.on.toggle.single($this);
                }
            });

            $body.on('click', '.accordion-tabbed__control', function (e) {
                var attr = $(this).is('[data-slide-target]');
                // Check if its external link or if its slide controll and mobile view port
                if ($(this).hasClass("external") || (typeof attr !== typeof undefined && attr !== false && isMobile)){
                    return; // do nothing
                } else {
                    e.preventDefault();
                    var $this = $(this);
                    accordion.on.toggle.tabbed($this);
                }
            });

            $(document).on(accordion.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                isMobile = true;
            });

            $(document).on(accordion.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                isMobile = false;
            });

        },
        logic: function (elem) {
            accordion.hideAll();
            accordion.$tabbedElements = elem;
            accordion.$tabbedElements.each(function () {
                var $this = $(this);
                $this.find('.accordion-tabbed__tab').each(function (index) {
                    var $this = $(this);
                    if (index == 0 && !$this.hasClass('accordion__closed')) {
                        $this.toggleClass('js--open');
                        $this.find('.accordion-tabbed__control').attr('aria-expanded','true');
                    } else {
                        $this.find('.accordion-tabbed__content').hide();
                    }
                });
            });
        },
        on: {
            toggle: {
                single: function ($this) {
                    $this.next('.accordion__content').slideToggle(200);
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
        },
        hideAll: function () {
            //Hide accordion content on load (in case of disabled JS, the accordion should be open)
            accordion.$elements.each(function () {
                var $this = $(this);
                $this.find('.accordion__control').attr('aria-expanded','false');

                if (!$this.children('.accordion__content').hasClass("js--open")){
                    $this.children('.accordion__content').hide();
                } else {
                    $this.children('.accordion__content').removeClass("js--open");
                }
            });
        }
    };

    UX.accordion = accordion; // add to global namespace
})();
