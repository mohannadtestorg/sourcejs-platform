(function () {
    $(document).ready(function () {
        UX.controller.init();
        if(!$(".source_example").length && $(".sticko , .sticko__md, .sticko__sm").length){
            UX.sticko.init();
        }
        if ( $('[data-toggle="nav"]').length) {
            UX.menu.init();
        }
        if ($('.coolBar').length){
            UX.coolbar.init();
        }
        if ($('[data-db-target-for]').length){
            UX.dropBlock.init();
        }
        if ($('[data-toggle="modal"]').length){
            UX.modal.init();
        }
        if ($('table').length){
            UX.toggleTable.init();
        }
        if ($('.facet').length){
            UX.toggle.init();
        }
        UX.facetDate.init();
        if ($('.accordion').length){
            UX.accordion.init();
        }
        if ($('.stickybar').length){
            UX.stickybar.init();
        }
        if ($('.refineSearch').length || $('.advanced-search').length ) {
            UX.refine.init();
        }
        if ($('figure').length) {
            UX.figureViewer.init();
        }
        if ($('.tab').length) {
            UX.tab.init();
        }
        if ($('.owl-carousel').length) {
            UX.slider.init();
        }
        if ($('.loi').length){
            UX.loi.init();
        }
        if ($('.quick-search').length){
            UX.quickSearch.init();
        }
        if ($('article').length) {
            UX.loader.init();
        }
        if ($('.advanced-search').length) {
            UX.searchFieldsCtrl.init();
        }
        if($(".table-fn").length || $('.ref.fn').length  || $(".scroll-to-target").length){
            UX.scrollo.init();
        }
        if ( $(".search__filters__ctrl__reset").length) {
            UX.appliedFacets.init();
        }
        if ( $('[data-toggle="transplant"]').length) {
            UX.transplant.init();
        }
        if ( $(".favoriteShortlist").length) {
            UX.favorites.init();
        }
        if ( $(".expandable-list").length) {
            UX.list.init();
        }
        if ( $(".loc.swipe__list").length) {
            UX.sliderTabs.init();
        }
        if ( $('.w-slide__btn').length) {
            UX.slide.init();
        }
        if ( $('.article-sections').length) {
            UX.section_sticky.init();
        }
        if ($('form.trusted-proxy-form').length) {
            UX.trustedPoxy.init();
        }
        if ( $("#institutionUsageReport").length) {
            UX.reports.init();
        }
        if ( $(".scrollThenFix").length) {
            UX.headerScrollFix.init();
        }
        UX.dropblockUl.init();
        UX.alerts.init();
        UX.searchResult.init();
        UX.enquireIt.init(); // important: keep it always last
    });
})();