(function () {

    var $body=$("body");
    var responseMenu = {

        vPort: ["screen-sm"],
        isMobile: false, // variable use to determine if responsive mode is on or off
        $headerContainer:$(".header--first-row") ,
        logoWidth:null ,
        quickmenuWidth:null ,
        maxMenuItemWidth:135,
        $moreDropsown:$('#menubar > .dropdown-more'),
        $menu: $(".header--first-row >.drawer__nav"),
        $menuWrapper:$('.res-menu-nav'),

        init: function () {

            $('.res-menu-nav').each(function(index) {
                responseMenu.responsive(index);
            });
            responseMenu.control();
            responseMenu.on.build();

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
            $body.on('touchend','.dropdown-more >a, .dropdown.menu-parent>a ', function() {

                if($(this).parents(".dropdown-more").length >0 && !$(this).parent().hasClass(".dropdown-more")){
                    $(this).closest('ul').find(".js--opened:not(.dropdown-more)").not($(this).parent()).removeClass('js--opened');
                }
                else{
                    $(this).closest('ul').find(".js--opened").not($(this).parent()).removeClass('js--opened');
                }
                $(this).parent().toggleClass('js--opened');
                if(!$(this).parent().hasClass('js--opened')){
                    $(this).parent().addClass('js--forceClose');
                }
                else{
                    $(this).parent().removeClass('js--forceClose');
                }
            });

            $body.click(function(){
                $('.res-menu-nav .js--opened').removeClass('js--opened');
            });




        },
        on:{
            build:function () {
                responseMenu.$menuWrapper.show();
                responseMenu.modifyMenu();

                setTimeout(function() {
                    responseMenu.modifyMenu();
                }, 800);
            }
        }
        ,
        modifyMenu:function () {
            responseMenu.$menuWrapper.each(function(){
                responseMenu.$menuObj = $(this);
                responseMenu.menuContainer = responseMenu.$menuObj.closest('.responsive-menu-holder');
                responseMenu.takenSpace = 0;
                responseMenu.menuContainer.find('>div,.res-menu-taken-space').each(function(){
                    if(!$(this).hasClass('drawer__nav') && !$(this).hasClass('header__coolBar')){
                        responseMenu.takenSpace = responseMenu.takenSpace + $(this).outerWidth();
                    }
                });
                if($(window).innerWidth() <= 1820 && responseMenu.menuContainer.parent().hasClass('header--second-row')){
                    responseMenu.takenSpace = responseMenu.takenSpace + responseMenu.menuContainer.parent().find('.res-menu-taken-space').outerWidth();
                }
                responseMenu.takenSpace = responseMenu.takenSpace + 50;
                responseMenu.$moreDropsown = responseMenu.$menuObj.find('ul > .dropdown-more');
                if(responseMenu.isMobile==false){
                    var availableMenuWidth= responseMenu.menuContainer.width() -(responseMenu.takenSpace);
                    var menuWidth=  responseMenu.$menuObj.width();
                    if(availableMenuWidth>0 && menuWidth>0 ){
                        if(menuWidth >availableMenuWidth){
                            while(menuWidth >availableMenuWidth ) {
                                var $lastMenuItem=responseMenu.$menuObj.find('nav > ul > [role="menuitem"]:not(.dropdown-more),#loi-banner >a').last();
                                if($lastMenuItem.length >0){
                                    responseMenu.$moreDropsown.removeClass('hidden');
                                    responseMenu.$moreDropsown.find('>.dropdown__menu').prepend($lastMenuItem[0].outerHTML);
                                    $lastMenuItem.remove();
                                    menuWidth=responseMenu.$menuObj.width();
                                }
                                else{
                                    break;
                                }
                            }
                        }

                        else if(availableMenuWidth> menuWidth+ responseMenu.maxMenuItemWidth && !responseMenu.$moreDropsown.hasClass('hidden')){

                            var $moreItems=responseMenu.$moreDropsown.find('>.dropdown__menu [role="menuitem"]');
                            var $firstMoreItem=$moreItems.first();
                            if($firstMoreItem.length >0 ){
                                responseMenu.$moreDropsown.before($firstMoreItem[0].outerHTML);

                                if($moreItems.length<=1){
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
            });
        }
    };

    UX.responseMenu = responseMenu; // add to global namespace
})();