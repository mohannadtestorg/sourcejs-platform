(function () {

    var setContentPadding = {
        $contentElement: null,
        $header: null,
        headerHeight: null,

        init: function () {
            this.$header = $(".header.fixed");
            this.headerHeight = this.$header.outerHeight() || 0;
            this.$contentElement = $("main.content");
            this.$contentElement.css("padding-top",this.headerHeight);
        }
    };

    UX.setContentPadding = setContentPadding; // add to global namespace
})();