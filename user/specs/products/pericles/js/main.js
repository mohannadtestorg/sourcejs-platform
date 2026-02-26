// Import components
import '../../../utility/js/namespace.js'

// Import variables
import '../variables/js/imports.js';

import '../../../plugins/jquery/jquery.js'

import '../../../plugins/jquery/jquery-migrate.js'

import '../../../plugins/enquireJs/js/enquire.js'

//import '../../../plugins/jQuery/jquery-3.1.1.js'

import '../../../plugins/panzoom/jquery.panzoom.js' // Todo: find how to prevent AMD define()

import '../../../plugins/touchSwipe/jquery.touchSwipe.js' // Todo: find how to prevent AMD define()

import '../../../plugins/sticko/js/sticko.js'

import '../../../plugins/controller/js/controller.js'

import '../../../plugins/sortable-table/js/sortable-table.js'

import '../../../plugins/fancybox/js/jquery.fancybox.js'

import '../../../ux3/basic/js/imports.js'

//import '../../../ux3/components/js/imports.js'

import '../../../plugins/drawer/js/drawer.js';

import '../basic/slide/js/slide.js';

import '../../../ux3/components/coolbar/js/coolbar.js';

import '../../../ux3/components/coolbar/js/stickybar.js';

import '../../../ux3/components/drop-block/js/drop-block.js';

import '../../../ux3/components/applied-facets/js/applied-facets.js'

import '../../../plugins/modal/js/modal.js';

import '../../../ux3/components/modal/js/modal.js';

import "../../../plugins/owl-carousel/js/owl.carousel.min.js";

import '../../../ux3/components/tables/js/tables.js';

import '../../../ux3/components/facet/js/toggle.js';

import '../../../ux3/components/facet-date/js/facet-date.js';

import '../../../ux3/components/accordion/js/accordion.js';

import '../../../ux3/components/refine-search/js/refine-search.js';

import '../../../ux3/components/figure-viewer/js/figure-viewer-script.js';

import '../../../plugins/lazyload/js/jquery.lazyload.js';

import '../../../plugins/truncate/js/truncate.js';

import '../../../plugins/dotdotdot/js/dotdotdot.js';

import '../../../ux3/components/teaser/js/teaser.js';

import '../../../ux3/components/lazy-load/js/lazy-load.js';

import '../../../plugins/tabs/js/tabs.js';

import '../../../ux3/components/tabs/js/tabs.js';

import '../../../plugins/slide/js/slide.js'; // import slide.js after tabs.js !!!




//import '../../../ux3/widgets/js/imports.js'

//***** Importing UX3 Widgets Javascript as needed *****//


import '../../../ux3/basic/inputs/js/inputs.js';

import '../basic/inputs/js/inputs.js'

import '../../../ux3/widgets/slideshow/js/slideshow.js';

//import '../../../ux3/widgets/list-of-issues/js/loi.js';

import '../../../ux3/widgets/trusted-proxy/js/trusted-proxy.js';

import '../../../ux3/widgets/register/js/register.js';

import "../../../plugins/magicSearch/js/magicsuggest.js";

import '../../../ux3/widgets/quick-search/js/quick-search.js';

import '../../../ux3/widgets/advanced-search/js/advanced-search.js';

import '../../../ux3/widgets/search-result/js/search-result.js';

import '../../../ux3/widgets/publication-content/js/publication-content.js';

import '../../../ux3/widgets/publication-content/js/crossref.js';

import '../../../ux3/widgets/ad-placeholder/js/ad-placeholder.js';

import '../../../ux3/widgets/cookie-policy-popup/js/cookie-policy-popup';

import '../../../ux3/widgets/administrators/js/administrators';

// import '../../../ux3/widgets/manage-alerts/js/manage-alerts.js';

import '../../../ux3/widgets/favorites/js/favorites.js';

import '../../../ux3/widgets/raa/js/raa.js';

import '../../../ux3/widgets/profile-main/js/profile-main.js';

// import '../../../ux3/widgets/usage-reports/js/usage-reports.js';

import '../../../plugins/transplant/js/transplant.js';

import '../../../ux3/widgets/profile-menu/js/profile-menu.js';

////////////////////////////////////////////

import '../../../ux3/templates/js/imports.js'



import '../components/js/imports.js'

import '../templates/js/imports.js'

import '../widgets/js/imports.js'

import '../../../plugins/controller/js/enquireIt.js' // important: keep it always last
/*
import '../variables/js/mimicked-services-variables.js'
import '../../../ux3/widgets/publication-content/js/override-publication-content.js';*/

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