(function () {
    $(document).ready(function () {
        UX.controller.init();
        if ($('.quick-search').length){
            $('.quick-search').quickSearch();
        }
        if ($('.pub').length){
            $('.pub').publications($pubModalButton);
        }
        if ($('.pub-modal').length){
            var $pubModalButton = $(".pubModal_button");
            if($pubModalButton.length) {
                $('.pub-modal').pubModal($pubModalButton);
            }
        }
        if ($('.header_burger-menu').length){
            $('.header_burger-menu').burgerMenu();
        }
        if ($('.header_my-activity').length){
            $('.header_my-activity').myActivity();
        }
        if ($('.accordion').length){
            UX.accordion.init();
        }
        if ($('[data-db-target-for]').length){
            UX.dropBlock.init();
        }
        if ($('.niHeader').length){
            UX.niHeader.init();
        }
        UX.enquireIt.init(); // important: keep it always last
    });
})();