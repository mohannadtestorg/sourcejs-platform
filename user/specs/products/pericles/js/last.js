(function () {
    $(document).ready(function () {
        UX.controller.init();
        if(!$(".source_example").length && $(".sticko , .sticko__md, .sticko__sm").length){
            UX.sticko.init();
        }
        if ( $('[data-toggle="nav"], .hubpage-menu').length) {
            UX.menu.init();
        }
        if ($('.coolBar').length){
            UX.coolbar.vPort = "screen-md";
            UX.coolbar.init();
        }
        if ($('.stickybar').length){
            UX.stickybar.vPort = "screen-md";
            UX.stickybar.init();

            UX.setStickeyTop.init();
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
        if ($('#dateFacet .range-slider').length) {
            UX.facetDate.init();
        }

        if ($('.accordion').length){
            UX.accordion.init();
        }
        if ($('.refineSearch').length) {
            UX.refine.init();
        }
        if ($('figure').length) {
            UX.figureViewer.init();
        }
        if ($('.tab').length) {
            UX.tab.vPort = "screen-md";
            UX.tab.init();
        }
        if ($('.owl-carousel').length) {
            UX.slider.init();
        }
        if ($('.quick-search').length){
            UX.quickSearch.vPort = "screen-lg";
            UX.quickSearch.init();
        }
        if ($('article').length) {
            UX.loader.init();
        }
        if ($('.advanced-search').length) {
            UX.searchFieldsCtrl.init();
        }
        if ( $(".search__filters__ctrl__reset").length) {
            UX.appliedFacets.init();
        }
        if ( $('[data-toggle="transplant"]').length) {
            UX.transplant.init();
        }
        if ( $(".expandable-list").length) {
            UX.list.init();
        }
        if ( $(".loc.swipe__list").length) {
            UX.sliderTabs.init();
        }
        if ( $('.usageReports').length) {
            UX.reports.init();
        }
        if ( $('.popover').length) {
            UX.popover.init();
        }
        if ( $('.ip-ranges').length) {
            UX.ipRanges.init();
        }
        UX.alerts.init();
        UX.searchResult.init();
        if ($('.loi').length){
            UX.loi.init();
        }
        if ( $('.favoriteShortlist').length) {
            UX.favorites.init();
        }

        if ( $('.bookSeries').length) {
            UX.loadAbst.init();
        }

        if ( $('.js-pager').length) {
            UX.pager.init();
        }

        if ( $('.table--sortable').length) {
            UX.sortableTable.init();
        }
        UX.fieldsCtrl.init();
        if ($('.readCube-sharing').length) {
            UX.readCubeShare.init();
        }
        if ($('.slot-license-usage').length) {
            UX.slotLicense.init();
        }

        if ($('.mrw-toc-meta__info').length) {
            UX.mrw.init();
        }

        if ($('.facet').length){
            UX.toggle.init();
        }

        if ($('.institutionDetails').length){
            UX.institutionDetails.init();
        }

        if ($('.profile-menu').length){
            UX.profileMenu.vPort = "screen-md";
            UX.profileMenu.init();
        }

        if ($('.js__removeUsers').length){
            UX.manageArticleSelect.init();
        }

        if ($('.js__removeAdmins').length){
            UX.administrators.init();
        }

        if ($('.holdingContainer').length){
            UX.holdings.init();
        }


        if ( $('.w-slide__btn').length) {
            UX.slide.vPort = "screen-md";
            //UX.slide.backLabel = "About";// it effects the slide back label btn in all cases
            UX.slide.init();
        }

        if ( $("#institutionUsageReport").length) {
            UX.reports.init();
        }
        if($('.cookiePolicy-popup').length){
            UX.cookiePolicyPopupWidget.init();
        }

        if ( $("#fakeEmail").length) {
            UX.email.init();
        }

        if ( $(".slotLicenseConsumption").length) {
            UX.accessDenial.init();
        }
        if ( $(".back-to-top").length) {
            UX.backToTop.init();
        }
        UX.scroll.init();

        UX.enquireIt.init(); // important: keep it always last
    });
})();