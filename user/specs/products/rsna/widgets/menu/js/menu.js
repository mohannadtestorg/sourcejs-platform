(function () {

    var $body=$("body");
    var responseMenu = {

        vPort: ["screen-sm"],
        isMobile: false, // variable use to determine if responsive mode is on or off
        $headerContainer:$(".header--first-row .container") ,
        logoWidth:null ,
        quickmenuWidth:null ,
        maxMenuItemWidth:135,
        $moreDropsown:$('#menubar > .dropdown-more'),
        $menu: $(".header--first-row .drawer__nav"),
        $menuWrapper:$('.res-menu-nav'),

        init: function () {

            $('.res-menu-nav').each(function(index) {
                responseMenu.responsive(index);
                responseMenu.control();
                responseMenu.on.build();
            });

        },

        responsive: function (index) {
            $(document).on(responseMenu.vPort[index] + '-on', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                responseMenu.isMobile = true;
            });

            $(document).on(responseMenu.vPort[index] + '-off', function () { // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                responseMenu.isMobile = false;
            });
        },

        control: function () {
            $(window).on('resize', function() {
                responseMenu.modifyMenu();
            })

            $body.on('touchend','.dropdown-more', function() {
                $(this).toggleClass('js--opened');
                if(!$(this).hasClass('js--opened')){
                    $(this).addClass('js--forceClose');
                }
                else{
                    $(this).removeClass('js--forceClose');
                }
            })

        },
        on:{
            build:function () {
                responseMenu.$menuWrapper.show();
                responseMenu.modifyMenu();

                setTimeout(function() {
                    responseMenu.modifyMenu();
                }, 800);
            }
        },
        modifyMenu:function () {
            responseMenu.$menuWrapper.css({"overflow": "visible", "width": "auto"});
            responseMenu.logoWidth=$(".header--logo").width();
            responseMenu.quickmenuWidth=$(".header--quick-menu").width();

            if(responseMenu.isMobile==false){
                var availableMenuWidth= responseMenu.$headerContainer.width() -(responseMenu.logoWidth + responseMenu.quickmenuWidth+35)
                var menuWidth=  responseMenu.$menu.width();
                if(availableMenuWidth>0 && menuWidth>0 ){
                    if(menuWidth >availableMenuWidth){
                        responseMenu.$moreDropsown.css("display", "inline-block");
                        while(menuWidth >availableMenuWidth ){
                            var $lastMenuItem=$('#menubar > li:not(.dropdown-more)').last();
                            if($lastMenuItem.length >0){
                                responseMenu.$moreDropsown.removeClass('hidden');
                                responseMenu.$moreDropsown.children('.dropdown__menu').prepend($lastMenuItem[0].outerHTML);
                                $lastMenuItem.remove();
                                menuWidth=responseMenu.$menu.width();
                            }
                            else{
                                break;
                            }
                        }
                    }
                    else if(availableMenuWidth> menuWidth+ responseMenu.maxMenuItemWidth && !responseMenu.$moreDropsown.hasClass('hidden')){
                        var $moreItems=responseMenu.$moreDropsown.children('.dropdown__menu').children('li');
                        var $firstMoreItem=$moreItems.first();
                        if($firstMoreItem.length >0 ){
                            responseMenu.$moreDropsown.before($firstMoreItem[0].outerHTML);

                            if($moreItems.lenght<=1){
                                responseMenu.$moreDropsown.addClass('hidden');
                            }

                            $firstMoreItem.remove();

                            menuWidth=responseMenu.$menu.width();
                            if(menuWidth >availableMenuWidth){
                                responseMenu.modifyMenu();
                            }
                        }
                    }
                }
            }
            else {
                if( !responseMenu.$moreDropsown.hasClass('hidden')){
                    responseMenu.$moreDropsown.addClass('hidden');
                    responseMenu.$moreDropsown.before(responseMenu.$moreDropsown.find('.dropdown__menu').html());
                    responseMenu.$moreDropsown.find('.dropdown__menu').empty();
                }
            }
        }

    };

    UX.responseMenu = responseMenu; // add to global namespace
})();