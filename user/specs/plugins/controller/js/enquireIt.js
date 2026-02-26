(function () {
    var enquireIt = {
        init: function(){
            // console.log("max-width:"+  (parseInt(UX.grid.screenSm) -1) +"px");
            // Responsive behavior controllers ( media query listeners )
            UX.controller.enabled = true;
            enquire
                .register("screen and (max-width:"+ (parseInt(UX.grid.screenXs) -1)  +"px)", {
                    match : function() {
                        $(document).trigger("screen-xs-on"); // screen is xs
                        $(document).trigger("smartResize"); // resize have been made
                    },
                    unmatch : function() {
                        $(document).trigger("screen-xs-off"); // screen is not xs anymore
                        $(document).trigger("smartResize"); // resize have been made
                    }
                })
                .register("screen and (max-width:"+  (parseInt(UX.grid.screenSm) -1) +"px)", {
                    match : function() {
                        $(document).trigger("screen-sm-on"); // screen is sm
                        $(document).trigger("smartResize"); // resize have been made

                    },
                    unmatch : function() {
                        $(document).trigger("screen-sm-off"); // screen is not sm anymore
                        $(document).trigger("smartResize"); // resize have been made
                    }
                })
                .register("screen and (max-width:"+ (parseInt(UX.grid.screenMd) -1) +"px)", {
                    match : function() {
                        $(document).trigger("screen-md-on"); // screen is md
                        $(document).trigger("smartResize"); // resize have been made

                    },
                    unmatch : function() {
                        $(document).trigger("screen-md-off"); // screen is not md anymore
                        $(document).trigger("smartResize"); // resize have been made

                    }
                }).register("screen and (max-width:"+ (parseInt(UX.grid.screenLg) -1) +"px)", {
                    match : function() {
                        $(document).trigger("screen-lg-on"); // screen is md
                        $(document).trigger("smartResize"); // resize have been made

                    },
                    unmatch : function() {
                        $(document).trigger("screen-lg-off"); // screen is not md anymore
                        $(document).trigger("smartResize"); // resize have been made

                    }
                }).register("screen and (min-width:"+ UX.grid.screenLg +"px)", {
                    match : function() {
                        $(document).trigger("screen-xlg-on"); // screen is md
                        $(document).trigger("smartResize"); // resize have been made

                    }
                    /*unmatch : function() {
                        $(document).trigger("screen-xlg-off"); // screen is not md anymore
                        $(document).trigger("smartResize"); // resize have been made

                    }*/
                });

        }
    };

    UX.enquireIt = enquireIt; // add to global namespace
})();
