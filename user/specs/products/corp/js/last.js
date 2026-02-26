(function () {
    $(document).ready(function () {
        UX.controller.init();
        UX.navButton.init();
        if ($('[data-db-target-for]').length){
            UX.dropBlock.init();
        }
        if ($('.owl-carousel').length) {
            UX.slider.init();
        }
        if ( $('[data-toggle="nav"]').length) {
            UX.menu.init();
        }
        UX.enquireIt.init(); // important: keep it always last
    });
})();