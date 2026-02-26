import '../../../ux3/js/all.js';
import '../basic/js/imports.js';
import '../components/js/imports.js';
import '../widgets/js/imports.js';
import '../templates/js/imports.js';
import '../../../plugins/dotdotdot/js/dotdotdot.js';
//import '../widgets/list-of-issues/js/override-loi';


import '../../../ux3/basic/colors/js/palette.js'
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
        if ($('.refineSearch').length) {
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
        if ( $('.paginationSlideshow').length) {
            UX.paginationSlideshow.init();
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
        UX.dropblockUl.init();
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
        if ($('.altmetric-container').length) {
            UX.altmetric.init();
        }

        if ($("#doi_altmetric_drawer_area").length) {
            UX.altmetricsArea.init();
        }

        if ($('form.trusted-proxy-form').length) {
            UX.trustedPoxy.init();
        }

        if ( $(".publication_list_slider").length ) {
            UX.publication_list_slider.init();
        }

        if ( $(".profile-pages").length ) {
            UX.profileMain.init();
        }

        if ( $("#institutionUsageReport").length) {
            UX.reports.init();
        }

        if ( $(".article-table-content").length ) {
            UX.tableViewer.init();
        }
        if ( $(".pageHeader").length) {
            UX.pageBody.init();
        }


        UX.alerts.init();
        UX.searchResult.init();
        UX.enquireIt.init(); // important: keep it always last
    });
})();