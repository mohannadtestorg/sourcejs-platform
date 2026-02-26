(function () {
    var altmetric = {
        init: function(){
            console.log("init");
            altmetric.get.altmetric();
            altmetric.control();
        },
        control: function () {
            $(".top-list__container").each(function () {
                var holder = $(this);

                if (holder.find('.altmetric-embed').length && holder.find('.altmetric-embed').html().length == 0) {
                    holder.addClass('without__cover__image');
                } else {
                    holder.removeClass('without__cover__image');
                }
            } );
            $(".top-list__container").bind("DOMSubtreeModified", function () {
                console.log("s")
                var holder = $(this);
                if (holder.find('.altmetric-embed').length && holder.find('.altmetric-embed').html().length == 0) {
                    holder.addClass('without__cover__image');
                } else {
                    holder.removeClass('without__cover__image');
                }
            });
        },
        get: {
            altmetric: function () {
                console.log("s");
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = window.location.protocol +"//d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        }
    };

    UX.altmetric = altmetric;
})();