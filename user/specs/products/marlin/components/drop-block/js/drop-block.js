(function () {
    UX.tab.on.dropdownBuild = function (elem, index) { // rebuild tabs to be as drop down
        UX.dropBlock.init();
        elem.wrap('<div class="dropBlock" data-db-parent-of="dbTab-' + index + '"></div>');

        var $dropdownContainer = elem.closest('.dropBlock');
        var $activeTab = elem.find('.active a');

        $dropdownContainer.prepend('<a href="#" data-db-target-for="dbTab-' + index + '"><span class="dropBlock__selected">' + $activeTab.text() + '</span><i class="dropBlock__selected icon-arrows pull-right" aria-hidden="true"></i></a>')
        elem.attr('data-db-target-of', 'dbTab-' + index);
    };
    UX.dropBlock.on.show= function () {

        if (!UX.dropBlock.$controller.closest(".dropBlock__holder").length) {
            if (typeof(UX.controller) != "undefined"){
                UX.controller.check();
            }
        }
        UX.dropBlock.$target.addClass("js--open");
        UX.dropBlock.$controller.addClass("js--open");
        if (UX.dropBlock.$controller.closest(".figure-viewer").length) {
            UX.dropBlock.$controller.closest(".figure-viewer").find(".figure-viewer__caption-body").css("overflow-y","hidden");
        }
        $("body").attr('data-active', 'dropBlock');
        UX.dropBlock.$target.closest("[class*='sticko']").addClass("js--open");
        UX.dropBlock.switch.icon();

        var isLoi = UX.dropBlock.$target.find('.loi').length > 0;

        if (isLoi) {
           UX.dropBlock.$target.find('.loi__list').each(function(){
                UX.loi.on.recalculate($(this));
            });

        }
        $("body").on('click', '.dropBlock__ctrl--close', function(event) {
            event.preventDefault();
            UX.dropBlock.on.hide();
        });

        var searchbar = UX.dropBlock.$target.find('.quick-search__searchbar input');
        if (searchbar) {
            searchbar.focus();
        }
    };
    UX.dropBlock.on.hide= function (e) {
        if (UX.dropBlock.$targets) {
            var resetComponent = true;
            UX.dropBlock.$targets.each(function(){
                var targetId = $(this).attr("data-db-target-of"); // get this dropblock holder controller
                var thisClicked = e && $(this).is($(e.target).closest('.accordion-tabbed__content'));

                if (!(UX.dropBlock.$controller.closest($(this)).length > 0) && $(this).hasClass("js--open")) { //check if this is not nested drop-block
                    if (!e || !thisClicked) {
                        $(this).removeClass("js--open"); // close this dropblock holder
                        $('[data-db-target-for=' + targetId + ']').removeClass("js--open"); // remove class from this holder
                    } else {
                        resetComponent = false;
                    }
                } else {
                    return;
                }
            });
            if (resetComponent) {
                UX.dropBlock.$controllers = $("[data-db-target-for]");
                UX.dropBlock.$controllers.removeClass("js--open");
                if ($("body").attr('data-active')== "dropBlock") {
                    $("body").removeAttr('data-active');
                }
                UX.dropBlock.$target.closest("[class*='sticko']").removeClass("js--open");
                if (UX.dropBlock.$controller.closest(".figure-viewer").length) {
                    UX.dropBlock.$controller.closest(".figure-viewer").find(".figure-viewer__caption-body").css("overflow-y","auto");
                }
                UX.dropBlock.switch.back();
            }
        }
    }
})();