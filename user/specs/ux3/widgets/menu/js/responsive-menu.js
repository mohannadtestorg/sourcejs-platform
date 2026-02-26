(function () {
    var $body=$("body");
    var reponsiveMenu = {
        vPort: "screen-sm",
        isMobile: false, // variable use to determine if responsive mode is on or off
        $menuContainer:$(".responsive-menu-container") ,
        leftSectionWidth:null ,
        rightSectionWidth:null ,
        maxMenuItemWidth:135,
        $moreDropsown:$('.responsive-menu-nav .menubar > .dropdown-more'),
        $menu: $(".responsive-menu-nav >.drawer__nav"),
        $menuWrapper:$('.responsive-menu-nav'),

        init: function () {
                reponsiveMenu.responsive();
                reponsiveMenu.control();
                reponsiveMenu.on.build();
        },

        responsive: function () {
            $(document).on(reponsiveMenu.vPort + '-on', function () {
                reponsiveMenu.isMobile = true;
            });

            $(document).on(reponsiveMenu.vPort + '-off', function () {
                reponsiveMenu.isMobile = false;
            });
        },

        control: function () {
            $(window).on('resize', function() {
                reponsiveMenu.modifyMenu();
            })

            $body.on('touchend','.dropdown-more >a, .dropdown.menu-parent>a ', function() {


                if($(this).parents(".dropdown-more").length >0 && !$(this).parent().hasClass(".dropdown-more")){
                    $(".responsive-menu-nav .js--opened:not(.dropdown-more)").not($(this).parent()).removeClass('js--opened');
                }
                else{
                    $(".responsive-menu-nav .js--opened").not($(this).parent()).removeClass('js--opened');
                }


                $(this).parent().toggleClass('js--opened');
                if(!$(this).parent().hasClass('js--opened')){
                    $(this).parent().addClass('js--forceClose');
                }
                else{
                    $(this).parent().removeClass('js--forceClose');
                }
            })

            $body.click(function(){
                $('.responsive-menu-nav .js--opened').removeClass('js--opened');
            });




        },
        on:{
            build:function () {
                reponsiveMenu.$menuWrapper.show();
                reponsiveMenu.modifyMenu();

                setTimeout(function() {
                    reponsiveMenu.modifyMenu();
                }, 800);
            }
        }
        ,
        modifyMenu:function () {

            reponsiveMenu.leftSectionWidth=$(".responsive-menu-container >.left-section").width();
            reponsiveMenu.rightSectionWidth=$(".responsive-menu-container >.right-section").width();




            if(reponsiveMenu.isMobile==false){
                var availableMenuWidth= reponsiveMenu.$menuContainer.width() -(reponsiveMenu.leftSectionWidth + reponsiveMenu.rightSectionWidth+35)
                var menuWidth=  reponsiveMenu.$menu.width();
                if(availableMenuWidth>0 && menuWidth>0 ){
                    if(menuWidth >availableMenuWidth){
                        while(menuWidth >availableMenuWidth ){
                            var $lastMenuItem=$('.responsive-menu-nav .menubar > [role="menuitem"]:not(.dropdown-more)').last();
                            if($lastMenuItem.length >0){
                                reponsiveMenu.$moreDropsown.removeClass('hidden');
                                reponsiveMenu.$moreDropsown.find('>.dropdown__menu').prepend($lastMenuItem[0].outerHTML);
                                $lastMenuItem.remove();
                                menuWidth=reponsiveMenu.$menu.width();
                            }
                            else{
                                break;
                            }
                        }
                    }
                    else if(availableMenuWidth> menuWidth+ reponsiveMenu.maxMenuItemWidth && !reponsiveMenu.$moreDropsown.hasClass('hidden')){
                        var $moreItems=reponsiveMenu.$moreDropsown.find('>.dropdown__menu [role="menuitem"]');
                        var $firstMoreItem=$moreItems.first();
                        if($firstMoreItem.length >0 ){
                            reponsiveMenu.$moreDropsown.before($firstMoreItem[0].outerHTML);

                            if($moreItems.length<=1){
                                reponsiveMenu.$moreDropsown.addClass('hidden');
                            }

                            $firstMoreItem.remove();

                            menuWidth=reponsiveMenu.$menu.width();
                            if(menuWidth >availableMenuWidth){
                                reponsiveMenu.modifyMenu();
                            }
                        }
                    }
                }
            }
            else {
                if( !reponsiveMenu.$moreDropsown.hasClass('hidden')){
                    reponsiveMenu.$moreDropsown.addClass('hidden');
                    reponsiveMenu.$moreDropsown.before(reponsiveMenu.$moreDropsown.find('.dropdown__menu').html());
                    reponsiveMenu.$moreDropsown.find('.dropdown__menu').empty();
                }
            }

        }
    };

    UX.reponsiveMenu = reponsiveMenu; // add to global namespace
})();