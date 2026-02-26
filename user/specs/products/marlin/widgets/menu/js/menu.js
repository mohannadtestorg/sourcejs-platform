(function () {
    var $body = $('body');
    var drawer = {
        $controller: $(".menu-drawer"),
        offesty:"",
        init: function () {
            drawer.offesty = window.pageYOffset;
            drawer.control();
            drawer.cloneLinks();
        },
        control: function () {
            $body.on('click','.menu-drawer__ctrl', function (e) {
                e.preventDefault();
                if (!$(this).hasClass("js--open")) {
                    drawer.offesty = window.pageYOffset;
                }
                if ($(window).width() >= UX.grid.screenSm) {
                    drawer.open($('.menu-drawer .dropdown__toggle').first());
                }
                if ($(this).hasClass("js--open")) {
                    $('body').css({"overflow":"auto","position":"static",  "height": "auto"});
                    console.log(drawer.offesty);
                    $(window).scrollTop(drawer.offesty);
                    drawer.closeAll();
                }
                $(this).toggleClass('js--open');
                drawer.update.top($(this));
                $(this).siblings(".menu-drawer__nav").toggleClass('js--open');
                if ($(this).hasClass("js--open")) {
                    $('body').css({"overflow":"hidden","position":"fixed", "width": "100%", "height": "100%", "top": -drawer.offesty + "px"});
                }
                $('body').toggleClass("lock-screen");
            });
            $body.on('click','.dropdown__toggle', function (e) {
                e.preventDefault();
                drawer.open($(this));
            })
            $body.on('click','.menu-drawer__back__ctrl', function (e) {
                e.preventDefault();
                drawer.closeAll();
            })
        },
        open: function ($element) {
            drawer.closeAll();
            drawer.fill($element);
            $element.toggleClass('js--open');
            $element.siblings(".dropdown__menu").addClass('js--open');
            $body.css({
                "position": "fixed",
                "width": "100%"
            }); // because body is not in ux3 scope
            $('header').closest(".ux3").prepend('<div class="body__overlay"></div>');
        },
        closeAll: function () {
            drawer.empty();
            $('.menu-drawer .dropdown__menu').removeClass('js--open');
            $('.menu-drawer .dropdown__toggle').removeClass('js--open');
            $('.body__overlay').remove();
        },
        fill: function ($element) {
            $(".menu-drawer--holder").text($element.text());
        },
        hide:function () {
            $('.menu-drawer .menu-drawer__ctrl').removeClass('js--open');
            $('.menu-drawer .menu-drawer__nav').removeClass('js--open');
            $body.css({
                "position": "static"
            });
            $('.body__overlay').remove();
        },
        empty: function () {
            $(".menu-drawer--holder").text("");
        },
        update: {
            top: function (element) {
                var headeHeight = $("header").outerHeight();
                element.siblings(".menu-drawer__nav").css("top",headeHeight);
            }
        },
        cloneLinks: function () {
            if ($(".profile-links__register").length) {
                var li1 = $('<li role="menuitem" aria-label="Home" id="menu-item-main-menu-reg" class="menu-item hidden-lg"/>').appendTo($(".menubar"));
                $(".profile-links__register a").clone().appendTo(li1);
            }
            if ($(".profile-links__subscribe").length) {
                var li2 = $('<li role="menuitem" aria-label="Home" id="menu-item-main-menu-sub" class="menu-item hidden-lg"/>').appendTo($(".menubar"));
                $(".profile-links__subscribe a").clone().appendTo(li2);
            }
            if ($(".profile-links__claim").length) {
                var li3 = $('<li role="menuitem" aria-label="Home" id="menu-item-main-menu-cla" class="menu-item hidden-lg"/>').appendTo($(".menubar"));
                $(".profile-links__claim a").clone().appendTo(li3);
            }
        }
    };
    UX.drawer = drawer; // add to global namespace
})();