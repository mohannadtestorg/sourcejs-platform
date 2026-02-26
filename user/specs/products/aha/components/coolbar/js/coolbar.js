(function () {
    var $window = $(window),
        $body = $('body');

    UX.coolbar.control = function(){
        if ( $('.journal-home').length) {
            UX.coolbar.vPort= "screen-md";
        }

        $(document).on(UX.coolbar.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
            UX.coolbar.isMobile = true;
        });

        $(document).on(UX.coolbar.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
            UX.coolbar.isMobile = false;
            if (typeof(UX.controller) !== 'undefined') {
                UX.controller.check();
            }
        });



    };
})();