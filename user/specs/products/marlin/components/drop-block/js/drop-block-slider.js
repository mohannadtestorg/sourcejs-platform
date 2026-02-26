(function () {
    UX.dropBlock.slider= function () {
        $('body').on("click",".dropBlock__slider__ctrl", function (e) {
            e.preventDefault();
            $(this).siblings(".dropBlock__slider__wrapper").addClass("js--open");
            $(this).closest("ul").addClass("js--open");
        })
        $('body').on("click",".dropBlock__slider__back", function (e) {
            e.preventDefault();
            $(this).parent().removeClass("js--open");
            $(this).closest("ul").removeClass("js--open");
        })
    };
    UX.dropBlock.slider();
})();