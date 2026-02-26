(function () {

    var $window = $(window);

    var adplaceholder = {
        time: 7000,
        timer: null,
        adToHide: null,
        adToHideHeight: null,
        adToHideSelector: ".js__adToHide",
        scrolledDown: false,

        init: function () {
            observeDOM( document.querySelector('.adplaceholder--header'), function() {
                document.querySelector('.adplaceholder--header').style.display = "flex";
            });
            this.adToHide = $(this.adToHideSelector);
            this.addToHideHeight = this.adToHide.outerHeight() || 0;
            $window.on('scroll', this.on.scroll);
            $('body').on('click', this.clearTimer);

            if ($(".js__toggleAdForm").length > 0) {
                $(".js__toggleAdForm").on("click", function (e) {
                    e.preventDefault();
                    var elemToToggle = "#" + $(this).data("toggle");
                    $(elemToToggle).slideToggle();
                });
            }
        },
        setTimer: function() {
            adplaceholder.clearTimer();
            adplaceholder.timer = setTimeout(adplaceholder.on.hide, adplaceholder.time);
        },
        clearTimer: function() {
            clearTimeout(adplaceholder.timer);
            adplaceholder.timer = null;
        },
        on: {
            hide: function() {
                adplaceholder.adToHide.hide();
                if (UX.drawer.update.top !== "undefined") {
                    UX.drawer.update.top($(".menu-drawer__ctrl"));
                }
                if (UX.setContentPadding) {
                    UX.setContentPadding.init();
                }
                if (UX.articleTools) {
                    UX.articleTools.on.scroll();
                }
                if (UX.article) {
                    UX.article.tOffset = 250;
                    UX.article.scrollToOffset = 200;
                    UX.article.on.scroll();
                }
            },
            scroll: function(e) {
                var scrollTop = $(window).scrollTop();
                if (scrollTop <= 0 ) {
                    adplaceholder.clearTimer();
                    if (adplaceholder.scrolledDown) {
                        adplaceholder.adToHide.css({"display":"flex"});
                        adplaceholder.scrolledDown = false;
                    }

                    if (UX.drawer.update.top !== "undefined") {
                        UX.drawer.update.top($(".menu-drawer__ctrl"));
                    }
                    if (UX.setContentPadding) {
                        UX.setContentPadding.init();
                    }
                    if (UX.articleTools) {
                        UX.articleTools.on.scroll();
                    }
                    if (UX.article) {
                        UX.article.tOffset = 350;
                        UX.article.scrollToOffset = 300;
                    }
                }
                else {
                    if (!adplaceholder.scrolledDown) {
                        adplaceholder.setTimer();
                    }
                    adplaceholder.scrolledDown = true;
                }
            }
        }
    };

    UX.adplaceholder = adplaceholder; // add to global namespace
})();