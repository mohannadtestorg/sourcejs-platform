import './menu-accessability.js';

(function () {
    //document.activeElement

    var $body = $('body'),
        $window = $(window),
        tabKey = 9,
        shift = 16,
        escKey = 27,
        nestedMenu;


    var menu = {
        $toggle: $('[data-toggle="nav"]'),
        $target: null,
        revers: false,
        lastItem: null,
        items: null,
        vPort: ["screen-sm"],
        isMobile: false, // variable use to determine if responsive mode is on or off

        init: function () {
            var menu1 = new menubar('menubar', false);
            $('.main-nav').each(function(index) {
                menu.$target = $(this);
                menu.check.viewPort(index);
                menu.responsive(index);
            });
            menu.items = $('.main-nav').find('a, button, input');  //$(".header__nav a, .header__nav button, .header__nav input");
            menu.control();
            menu.addtionalControl();

        },

        responsive: function (index) {
            $(document).on(menu.vPort[index] + '-on', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                menu.isMobile = true;
                $('.main-nav').each(function() {
                    if ($(this).find('.drawer__nav').data('ctrl-res') ==  menu.vPort[index]){
                        $(this).addClass("menu--res"); // class will be used in our scss (to replace media queries)
                        menu.on.rebuild.responsive(); // rebuild menu to be responsive - drawer
                    }
                });
            });

            $(document).on(menu.vPort[index] + '-off', function () { // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                menu.isMobile = false;
                $('.main-nav').each(function() {
                    if ($(this).find('.drawer__nav').data('ctrl-res') ==  menu.vPort[index]){
                        $(this).removeClass("menu--res"); // class will be used in our scss (to replace media queries)
                        menu.on.rebuild.original(); // return menu as default
                    }
                });
            });
        },

        addtionalControl:function () {

        },
        control: function () {

            $body.on('click', '[data-toggle="nav"]', function (e) {
                e.preventDefault();
                menu.$toggle = $(this);
                menu.$target = $('#' + menu.$toggle.data('target'));

                menu.items = menu.$target.find('a, button, input');  //$(".header__nav a, .header__nav button, .header__nav input");
                menu.items.each(function (index) {
                    if (index === menu.items.length - 1) {
                        menu.lastItem = $(this);
                    }
                });


                menu.on.show();
            });

            $body.on('click', '.js--open[data-toggle="nav"]', function (e) {
                e.preventDefault();
                menu.on.hide();
            });


            $body.on('click', function (e) {
                $("a.dropdown__toggle.hover").removeClass("hover");
                if (!$(e.target).hasClass("icon-arrow_r") && !$(e.target).parents('.main-nav.menu--res').length && $('.lock-screen[data-active="menu"]').length) {
                    menu.on.hide();
                }
            });

            $body.on('click', '.main-nav a', function (e) {
                if($(this).attr('href')=="#") {
                    e.preventDefault();
                }
            });

            $body.on('click', '[data-toggle="dropdown"]', function (e) {
                e.preventDefault();
                nestedMenu = $(this);
                menu.on.nested(e);
            });
            $body.on('click', '.menu-header i.icon-arrow_r', function (e) {
                e.preventDefault();

                if (menu.isMobile) {
                    menu.on.hideNested();
                }
            });
            $body.on('keydown', '.drawer__nav, [data-toggle="nav"]', function (e) {
                if (menu.isMobile) {

                    if ((e.keyCode || e.which) === tabKey) {
                        if (!menu.revers) {
                            menu.on.tab();
                        } else {
                            menu.on.tabRevers();

                        }
                    }

                }


            });

            $body.on('click', function(e) {
                $("a.dropdown__toggle.hover").removeClass("hover");
            });


            $window.on('keyup', function (e) {
                menu.revers = false;
                if (e.shiftKey && e.keyCode === tabKey) {
                    menu.revers = true;
                }
                if (!menu.isMobile) {
                    if ((e.keyCode || e.which) === tabKey) {

                        if (!menu.revers) {
                            menu.on.tabDesktop(e);
                        } else {
                            menu.on.tabReversDesktop(e);

                        }
                    }

                    if ((e.keyCode || e.which) === escKey) {
                        menu.on.escDesktop(e);
                    }
                }

            });

        },
        on: {
            show: function () {
                if (typeof(UX.controller) != "undefined") {
                    UX.controller.check();
                }
                $body.addClass('lock-screen').attr('data-active', 'menu');
                menu.$toggle.addClass('js--open');

                menu.$target.closest('.main-nav').css('top', $window.scrollTop());
                $('header').css('top', $window.scrollTop());
                $('.coolBar--res').removeClass('trans').css('top', $window.scrollTop() + $('header').height());
                $('.loi__banner.loi--res').css('top', $window.scrollTop() + $('header').height());
                menu.$target.attr("style", "display: block !important");
                menu.$toggle.focus();

                menu.on.showAdditional();

            },
            showAdditional: function () {

            },
            showNested: function () {
                nestedMenu.next('.dropdown__menu').toggleClass('sub-menu__opened');
                nestedMenu.parent().toggleClass('menu-parent__opened');
                nestedMenu.find('i').toggleClass('opposite-arrow');
                nestedMenu.parent().siblings('li').toggleClass('prev-items');
                nestedMenu.toggleClass('prev-items');
                var $menuTitle = nestedMenu.html();

                if ($('.menu-header').length) {
                    $('.menu-header').html($menuTitle);
                }

            },
            hideNested: function () {

                var $menuHeader = $('.menu-header');
                var $parenNestedMenut;


                if( typeof(nestedMenu) != 'undefined' ) {

                    $parenNestedMenut = nestedMenu.parent().parent(); // first parent list
                    nestedMenu = $parenNestedMenut.parent().find('.dropdown__toggle'); // first parent dropdown toggle link

                    $parenNestedMenut.find('.sub-menu__opened').removeClass('sub-menu__opened');
                    $parenNestedMenut.find('.menu-parent__opened').removeClass('menu-parent__opened');
                    $parenNestedMenut.find('.prev-items').removeClass('prev-items');

                    if($parenNestedMenut.hasClass('sub-menu__opened')){
                        $menuHeader.find('span').html(nestedMenu.find('span').html());
                    }
                    else {
                        $menuHeader.html('HOME');
                    }

                } else {
                    nestedMenu = $menuHeader;
                }

            },
            hide: function () {
                menu.$toggle.removeClass('js--open');
                $('.main-nav, header').css('top', 0);
                $('.coolBar--res').addClass('trans').css('top', $('header').height()); // The magic number contains 1px of border and
                $('.loi__banner.loi--res').css('top', $('header').height());
                $body.removeAttr('data-active').removeClass('lock-screen');
            },
            escape: function () {
                menu.on.hide();
                menu.$toggle.focus();
            },
            tab: function () {
                menu.$toggle.off();
                menu.lastItem.off().on('focusout', function () {
                    menu.$toggle.focus();
                });

            },
            tabRevers: function () {

                menu.lastItem.off();
                menu.$toggle.off().on('focusout', function () {
                    menu.lastItem.focus();
                });

            },
            tabDesktop: function(e){

                if ($(e.target).hasClass("dropdown__toggle")) {
                    if ($(e.target).closest(".hover").length == 0) {
                        $('.dropdown__toggle').removeClass('hover');
                    }
                    $(e.target).closest("a").addClass("hover");
                }else {
                    $(e.target).closest("ul").find('.hover').each(function () {
                        $(this).removeClass('hover')
                    })
                }

            },
            tabReversDesktop: function (e) {
                if ($(e.target).hasClass("dropdown__toggle")) {
                    if ($(e.target).closest(".hover").length == 0) {
                        $('.dropdown__toggle').removeClass('hover');
                    }
                    $(e.target).closest("a").addClass("hover");
                }else if  ($(e.target).closest(".hubpage-menu").length == 0 && $(e.target).closest(".main-nav").length == 0) {
                    $('.dropdown__toggle').removeClass('hover');
                }

            },
            escDesktop: function(e){
                $(e.target).closest(".dropdown__toggle").removeClass("hover");
            },
            rebuild: {

                responsive: function () {
                    menu.on.hide();
                },
                original: function () {
                    menu.on.hide();
                    menu.$target.show();
                }
            },
            nested: function(e){
                //e.preventDefault();
                if (menu.isMobile) {
                    menu.on.showNested();
                }
            }
        },
        check: {
            viewPort: function (index) {
                if (menu.$target.find('.drawer__nav').attr('data-ctrl-res')) {
                    menu.vPort[index] = menu.$target.find('.drawer__nav').attr('data-ctrl-res');
                }
                ;

            }
        }
    };

    UX.menu = menu; // add to global namespace
})();