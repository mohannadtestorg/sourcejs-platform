(function () {
    var $window = $(window),
        $body = $('body'),
        isMobile = false;


    var sidebarSections = {
        isMobile: false,
        vPort: "screen-md",
        $scrollPoints: $('.section__title'),
        $block: $('.sections-block'),
        dateTime: new Date(),
        checkScrollingEvery:500,//to execute scrolling function every specific time
        vPort: "screen-sm",

        init: function () {

            if (sidebarSections.$scrollPoints.length) {
                sidebarSections.$scrollPoints.each(function (e) {
                    sidebarSections.$block.find('ul').append('<li><a title="' + $(this).text() + '" href="#' + $(this).attr('id') + '">' + $(this).text() + '</a></li>')
                })

                sidebarSections.set.selectedSection();
                sidebarSections.controller();
            }

        },
        controller: function () {
            $body.on('click', '.sections-block a', function (e) {
                sidebarSections.$block.find('a').removeClass('active');
                $(this).addClass('active');

            });
            $(document).on(sidebarSections.vPort + '-on', function () {
                isMobile = true;
            });

            $(document).on(sidebarSections.vPort + '-off', function () {
                isMobile = false;
            });


            $window.on("scroll", function () {
                if(!isMobile){
                    var now = new Date();
                    if($(window).scrollTop()==0){
                        sidebarSections.$block.find('a').removeClass("active");
                    }
                    if(now - sidebarSections.dateTime < sidebarSections.checkScrollingEvery){
                        return;
                    }

                    sidebarSections.dateTime=now;
                    sidebarSections.$scrollPoints.each(function (e) {
                        if ($(window).scrollTop() >= $(this).offset().top - sidebarSections.get.fixedpageElementsHeight()-$(this).height()-15) {
                            var id = $(this).attr('id');
                            sidebarSections.$block.find('a').removeClass("active");
                            sidebarSections.$block.find('a[href="#' + id + '"]').addClass("active");
                        }
                    });
                }

            });

        },
        set: {
            selectedSection: function () {
                if (window.location.hash) {
                    sidebarSections.$block.find('a[href="' + window.location.hash + '"]').addClass('active');
                }
            }
        },

        get: {
            fixedpageElementsHeight: function () {
                var elementsHeight = $('header.fixed, .pageHeader').outerHeight();
                if (!elementsHeight) {
                    elementsHeight = 0;
                }
                if ($('.fixed-element').length) {
                    $.each($('.fixed-element'), function (index, value) {
                        if ($(value).outerHeight()) {
                            elementsHeight += $(value).outerHeight();
                        }
                    });
                }
                return elementsHeight;
            }
        }

    };
    UX.sidebarSections = sidebarSections; // add to global namespace
})();