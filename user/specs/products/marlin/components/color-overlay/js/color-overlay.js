(function () {
    // if Pb is open no content truncation should take effect
    var colorOverlay = {
        init: function () {
            var isNotPb = $('#pb-editor [data-pb-dropzone]').length == 0;
            var isMobile= false,
                vPort= "screen-md";

            if (isNotPb) {
                var toTrunk8 = '.loa';
                if ( $(window).width() < UX.grid.screenMd) {
                    isMobile = true;
                }

                $(document).on(vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                    isMobile = true;
                    transformTruncate(toTrunk8);
                });

                $(document).on(vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                    isMobile = false;
                    transformTruncate(toTrunk8);
                });


                transformTruncate(toTrunk8);

                // transformTruncate(toTrunk8);
                function transformTruncate(element) {
                    if ($(element).length > 0 ) {
                        $(element).truncate("destroy");
                        var lines = 5;
                        if (!isMobile) {
                            lines = 2;
                        }

                        $(element).truncate({
                            lines: lines,
                            type: 'list',
                            seeMoreLink: true,
                            seeMoreText: 'Show all authors',
                            seeLessText: 'Show less',
                            position: 'beforeLast'
                        });
                    }
                }
            }
        }
    };
    UX.colorOverlay = colorOverlay;
})();