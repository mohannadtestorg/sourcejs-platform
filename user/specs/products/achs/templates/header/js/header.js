(function () {

    $.fn.myActivity = function () {
        return $(this).each(function () {
            var $body = $("body");
            var $myActivity = $(this);
            var $button = $(this).find("> a");
            var $opend_class = "header_my-activity_opened";

            $button.click(function () {
                $myActivity.toggleClass($opend_class);
            });

            $body.click(function (e) {
                if($myActivity.hasClass($opend_class)) {
                    if(!$(e.target).is($myActivity) &&
                        !$(e.target).parents("."+$opend_class).length) {
                        $myActivity.removeClass($opend_class);
                    }
                }
            });

            $(document).keyup(function(e) {
                if (e.keyCode === 27) {
                    $myActivity.removeClass($opend_class);
                }
            });
        });
    };

    $.fn.burgerMenu = function () {
        return $(this).each(function () {
            var $menu = $(this);
            var $pubModal = $(".pub-modal")
            var $menu_button = $(this).children("a");
            var $body = $("body");
            var $parents_items = $(this).find(".header_burger-menu_content > ul li");
            var $child_items = $parents_items.find("ul");
            var $opend_class = "header_burger-menu_opened";
            var $opend_item_class = "header_burger-menu_item_opened";
            var $vPort = "screen-sm";
            var $isMobile = false;

            $(document).on($vPort+'-on',function(){
                $isMobile= true;
            });

            $(document).on($vPort+'-off',function(){
                $isMobile= false;
                $child_items.show();
            });

            $menu_button.click(function (e) {
                e.preventDefault();
                $menu.toggleClass($opend_class);

                if($isMobile) {
                    $pubModal.hide();
                    $("body").removeClass("acs_noscroll");
                    $parents_items.each(function(){
                        var $childList = $(this).children("ul");
                        var $animationSpeed = 500;
                        if($(this).hasClass($opend_item_class)){
                            $(this).removeClass($opend_item_class);
                            $childList.slideUp($animationSpeed);
                            return;
                        }
                    });
                }
            });

            $parents_items.click(function (e) {
                e.preventDefault();
                var $childList = $(this).children("ul");
                var $animationSpeed = 500;

                if($isMobile) {
                    if($childList.length) {
                        if($(this).hasClass($opend_item_class)) {
                            $(this).removeClass($opend_item_class);
                            $childList.slideUp($animationSpeed);
                        }
                        else {
                            $child_items.slideUp($animationSpeed);
                            $parents_items.removeClass($opend_item_class);
                            $(this).addClass($opend_item_class);
                            $childList.slideToggle($animationSpeed);
                        }
                    }
                    else {
                        $child_items.slideUp($animationSpeed);
                        $parents_items.removeClass($opend_item_class);
                    }
                }
            });

            $body.click(function (e) {
                if($menu.hasClass($opend_class)) {
                    if(!$(e.target).is($menu) &&
                        !$(e.target).parents("."+$opend_class).length &&
                        !$(e.target).is($pubModal) &&
                        !$(e.target).parents(".pub-modal").length) {
                        $menu.removeClass($opend_class);
                        $pubModal.hide();
                    }
                }
            });
        });
    };
})();