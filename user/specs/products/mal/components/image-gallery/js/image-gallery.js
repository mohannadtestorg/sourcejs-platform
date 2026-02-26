(function () {
    var MultiSwap = {
        $wrapper: $('.image-gallery'),
        period: null,
        timer: null,
        index: 0,
        src: null,
        allData: null,
        $imgData: [],
        init: function () {
            MultiSwap.control();
        },
        control: function () {
            $(document).on('mouseover focus', '.image-gallery', function (e) {
                MultiSwap.mouseover($(this));
            });
            $(document).on('mouseout blur', '.image-gallery', function (e) {
                MultiSwap.mouseout();
            });

        },
        swap: function () {
            if (this.index == this.$imgData.length)
                this.index = 0;
            MultiSwap.$wrapper.attr('src', this.$imgData[ this.index++ ].src)
        },
        mouseout: function () {
            clearInterval(MultiSwap.timer);
        },
        mouseover: function (el) {
            MultiSwap.$wrapper = el;
            MultiSwap.period = MultiSwap.$wrapper.data("image-gallery")[0];
            MultiSwap.src = MultiSwap.$wrapper.attr("src");
            MultiSwap.allData = MultiSwap.$wrapper.data("image-gallery");
            for (var i = 2, j = 0; i < MultiSwap.allData.length; i++, j++) {
                MultiSwap.$imgData[j] = new Image();
                MultiSwap.$imgData[j].src = MultiSwap.allData[i];
            }
            MultiSwap.timer = setInterval(function () {
                MultiSwap.swap();
            }, MultiSwap.period);
        }
    };
    UX.MultiSwap = MultiSwap; // add to global namespace
})();
