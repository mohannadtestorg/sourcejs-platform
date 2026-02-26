
(function () {

    var $window = $(window),
        $body = $('body'),
        isMobile = false; // variable use to determine if responsive mode is on or off

    var backToTop = {
        $backBtb: $('.back-to-top'),
        left:null,
        pageScrollValue: null,
        pageHeight: null,
        vPort: "screen-md", // default responsive break point


        init: function(){
            backToTop.left = $('.container').offset().left + $('.container').width() + 50;
            backToTop.$backBtb.css('left', backToTop.left);
            backToTop.pageScrollValue = $window.scrollTop() + $('.pageHeader').outerHeight();
            backToTop.pageHeight = $window.outerHeight() - $('.pageHeader').outerHeight();


            backToTop.control();
        },
        control: function() {

            $(document).on(backToTop.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                isMobile = true;
            });

            $(document).on(backToTop.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                isMobile = false;
            });



            $window.scroll(function(){
                backToTop.pageScrollValue = $window.scrollTop() + $('.pageHeader').outerHeight();

                if (isMobile) {
                    backToTop.left = $('.container').offset().left + $('.container').width() - 50;
                    backToTop.$backBtb.css('left', backToTop.left);
                }else {
                    backToTop.left = $('.container').offset().left + $('.container').width() + 50;
                    backToTop.$backBtb.css('left', backToTop.left);
                }


                if (backToTop.pageScrollValue > backToTop.pageHeight) {
                    backToTop.$backBtb.show()
                }else {
                    backToTop.$backBtb.hide()
                }
            });

            backToTop.$backBtb.on('click', function () {
                $body.stop().animate({scrollTop:0}, 500, 'swing');
            })
        },


    };
    UX.backToTop = backToTop; // add to global namespace
})();


