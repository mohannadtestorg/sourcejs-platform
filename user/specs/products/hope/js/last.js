(function () {
    $(document).ready(function () {
        UX.controller.init();
        if ( $('.podcasts__player').length) {
            UX.podcast.init();
        }
        if ( $('.events__player').length) {
            UX.event.init();
        }
        if(!$(".source_example").length && $(".sticko , .sticko__md, .sticko__sm").length){
            UX.sticko.init();
        }
        if ( $('[data-toggle="nav"]').length) {
            UX.menu.vPort = ["screen-sm"];
            UX.menu.on.nested = "";
            UX.menu.init();
        }
        if ( $('.back-to-top').length) {
            UX.backTo.init();
        }
        if ( $('.w-slide__btn').length) {
            UX.slide.init();
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
        /*if ($('.sidebar-region').length){
            UX.sidebarToggle.init();
        }*/
        UX.facetDate.init();
        if ($('.accordion').length){
            UX.accordion.init();
        }
        if ($('.coolBar').length){
            UX.coolbar.init();
        }
        if ($('.stickybar').length){
            UX.stickybar.init();
        }
        if ($('article').length) {
            UX.loader.init();
        }
        if ($('.refineSearch').length || $('.advanced-search').length ) {
            UX.refine.init();
        }
        if ($('.advanced-search').length) {
            UX.searchFieldsCtrl.init();
        }
        if($(".table-fn").length || $('.ref.fn').length || $(".scroll-to-target").length){
            UX.scrollo.init();
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
        if ($('.loi__banner').length){
            UX.loi.init();
        }
        if ($('.quick-search').length){
            UX.quickSearch.init();
        }
        UX.fieldsCtrl.init();
        if ( $('[data-toggle="transplant"]').length) {
            UX.transplant.init();
        }
        if ( $(".js__toggleAdForm").length) {
            UX.adplaceholder.init();
        }
        if ( $(".trusted-proxy-form").length) {
            UX.trustedPoxy.init();
        }
        if ( $(".search__filters__ctrl__reset").length) {
            UX.appliedFacets.init();
        }
        UX.alerts.init();
        if ( $("#institutionList").length) {
            UX.profileMain.init();
        }
        UX.dropblockUl.init();
        UX.searchResult.init();

        if ( $(".favoriteShortlist").length) {
            UX.favorites.init();
        }
        if ( $(".expandable-list").length) {
            UX.list.init();
        }
        if ($('.royalSlider').length) {
            UX.royalSlider.init();
        }
        if ($('.purchaseArea').length) {
            UX.scrollAccessDenial.init();
        }
        if ($('.pb-review-edits-panel').length) {
            UX.pbReviewMode.init();
        }

        if ($(".registration-form").length) {
            UX.showCountryStates.init();
        }

        if ( $("#institutionUsageReport").length) {
            UX.reports.init();
        }

        UX.enquireIt.init(); // important: keep it always last
    });
})();