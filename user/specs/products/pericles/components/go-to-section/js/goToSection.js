(function () {
    var scroll = {
        pageHeaderHeight : $('.pageHeader').outerHeight(),
        coolbarHeight : 0,
        pagesNavHeight : 0,
        $coolBar : $('.coolBar'),
        $pagesNav : $('.pages-nav'),

        init: function () {

            scroll.control();

        },

        control: function () {

            // JS code to expand support information section on click
            $("a[href$='#support-information-section']").on("click", function() {
                $(".article-section__supporting a.accordion__control").trigger("click");
            });

            $("a[href^='#references-section']").on("click", function() {
                var myHref =$(this).attr('href');
                $(myHref).closest("a.accordion__control ").trigger("click");

            });


            $('body').on('click', '[data-db-target-of=sections] a, .scrollableLink, .scrollableLinks a', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(this).hasClass('noteLink')) {
                    scroll.openFootNote(this);
                } else {
                    scroll.scrollToTarget(this, true);
                }
                $('[data-db-target-of=sections], .w-slide__back').trigger('click');

            });
        },

        openFootNote: function ($el) {
            var $target = $($el.hash),
                html = $target.html(),
                closeBtn = '<button class="footNoteClose"><i class="icon-tools_close" aria-hidden="true"></i></button>',
                chevronDown = '<span class="chevronDown"></span>',
                note = '<div class="footNotePopup">' + closeBtn + html + chevronDown +'</div>';

            $('.footNotePopup').remove();
            $($el).after(note);

            var offsetTop = $($el).offset().top - $('.footNotePopup').outerHeight() - 10,
                offsetLeft = $($el).offset().left + 5;

            if ($($el).closest('.article-table-content-wrapper').length){
                if ( $($el).offset().top - $($el).closest('.article-table-content-wrapper').offset().top < $(".footNotePopup").outerHeight() + 10) {
                    offsetTop = $($el).offset().top + 40;
                    $('.footNotePopup').find('.chevronDown').addClass('inverse');
                }
            }


            $('.footNotePopup').offset({ top: offsetTop });
            $('.footNotePopup').find('.chevronDown').offset({ left: offsetLeft });


            $(".footNoteClose").on("click", function() {
                $(".footNoteClose").off('click');
                $('.footNotePopup').remove();
            });
        },

        scrollToTarget: function ($el, refID) {

            if (refID) {
                var target_element = document.getElementById($el.hash.slice(1)),
                    target = $( target_element );
            } else {
                var target_element = $el,
                    target = target_element ;
            }



            var pageHeaderHeight = $('.pageHeader').outerHeight(),
                coolbarHeight = 0,
                pagesNavHeight = 0,
                $coolBar = $('.coolBar'),
                $pagesNav = $('.pages-nav');

            if ($coolBar.length) {
                coolbarHeight =  $coolBar.find('.coolBar__wrapper').outerHeight();
            }

            if ($pagesNav.length && $pagesNav.find('.main-nav').length) {
                pagesNavHeight = $pagesNav.find('.main-nav').outerHeight();
            }

            if ($pagesNav.length && $pagesNav.find('.main-nav').length && !($pagesNav.hasClass('stickybar--sticky')) && ($pagesNav.find('.main-nav').hasClass('menu--res')) ) {
                pagesNavHeight = $pagesNav.find('.main-nav').outerHeight() - 52;
            }


            target = target.length ? target : $('[name="' + $el.hash.slice(1) +'"]');

            var minusHeight = pageHeaderHeight + pagesNavHeight + coolbarHeight + 10,
                offset = target.offset().top;
            if (scroll.isIE()) {
                offset = target.offset().top  - 60;
            }

            if (target.length) {
                $('html,body').animate({
                    scrollTop: offset - minusHeight
                }, 500, function () {

                    if ($coolBar.length) {
                        coolbarHeight =  $coolBar.find('.coolBar__wrapper').outerHeight();
                        minusHeight = pageHeaderHeight + pagesNavHeight + coolbarHeight + 10;

                        $('html,body').animate({
                            scrollTop: offset - minusHeight
                        }, 500)
                    }

                });
            }
        },

        isIE: function () {
            var browsers = {
                "isIE":/*@cc_on!@*/false || !!document.documentMode
            };
            return browsers["isIE"];
        }
    };

    UX.scroll = scroll;
})();


