(function () {
    var $body = $('body'),
    backTo = {
        init: function() {
            backTo.control();
        },

        control: function(){
            $body.on('click', '.back-to-top', function(e) {
                e.preventDefault();
                backTo.top();
            });
        },
        top: function(){
            $body.animate({scrollTop:0}, 500);
        }

    };
    UX.backTo = backTo; // add to global namespace
})();