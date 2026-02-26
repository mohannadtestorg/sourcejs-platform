import '../../../utility/js/namespace.js';
import '../../../utility/js/set-content-padding.js';
import '../../../utility/js/observe-dom.js';


// Import variables
import '../../../ux3/variables/js/imports.js';
import '../variables/js/imports.js';

// ux3 resources
import '../../../ux3/components/drop-block/js/drop-block';
import '../../../plugins/tabs/js/tabs';
import '../../../plugins/touchSwipe/jquery.touchSwipe.js';
import '../../../plugins/touch-punch/jquery.ui.touch-punch.min';
import '../../../plugins/controller/js/controller.js';
import '../../../plugins/dataTables/js/datatables';
import '../../../plugins/dataTables/js/dataTables.fixedHeader';
import '../../../plugins/dataTables/js/dataTables.fixedColumns';
import '../../../plugins/enquireJs/js/enquire.js';
import '../../../plugins/outlinejs/js/outline.js';
import '../plugins/truncate/js/truncate.js';
import '../../../ux3/components/tabs/js/tabs';
import '../../../ux3/components/accordion/js/accordion';
// import '../../../ux3/components/figure-viewer/js/figure-viewer-script.js';
import '../../../ux3/widgets/quick-search/js/quick-search';
import '../../../ux3/widgets/publication-content/js/publication-content';


import '../basic/table/js/table.js';

import '../components/js/imports.js';

import '../widgets/js/imports.js';

import '../templates/js/imports.js';

import '../../../plugins/controller/js/enquireIt.js' // important: keep it always last
(function () {
    $(document).ready(function () {
        UX.controller.init();
        UX.setContentPadding.init();

        // if(!$(".source_example").length && $(".sticko , .sticko__md, .sticko__sm").length){
        //     UX.sticko.init();
        // }
        // if ( $('[data-toggle="nav"]').length) {
        //     UX.menu.init();
        // }
        // if ( $('.w-slide__btn').length) {
        //     UX.slide.init();
        // }
        if ( $('.mediaPlayer').length) {
            UX.mediaPlayer.init();
        }
        if ($('[data-db-target-for]').length){
            UX.dropBlock.init();
        }
        if($('.main-nav').length) {
            UX.drawer.init();
        }
        // if ($('[data-toggle="modal"]').length){
        //     UX.modal.init();
        // }
        // if ($('table').length){
        //     UX.toggleTable.init();
        // }
        // if ($('.facet').length){
        //     UX.toggle.init();
        // }
        // UX.facetDate.init();
        if ($('.accordion').length){
            UX.accordion.init();
        }
        // if ($('.coolBar').length){
        //     UX.coolbar.init();
        // }
        // if ($('.stickybar').length){
        //     UX.stickybar.init();
        // }
        if ($('article').length) {
            UX.loader.init();
        }
        // if ($('.refineSearch').length || $('.advanced-search').length ) {
        //     UX.refine.init();
        // }
        // if ($('.advanced-search').length) {
        //     UX.searchFieldsCtrl.init();
        // }
        if ($('figure').length) {
            UX.figureViewer.init();
        }
        if ($('.tab').length) {
            UX.tab.init();
        }
        // if ($('.owl-carousel').length) {
        //     UX.slider.init();
        // }
        // if ($('.loi__banner').length){
        //     UX.loi.init();
        // }
        if ($('.quick-search').length){
            UX.quickSearch.init();
        }
        if ($(".article-header")){
            UX.colorOverlay.init();
        }

        // UX.fieldsCtrl.init();
        // if ( $('[data-toggle="transplant"]').length) {
        //     UX.transplant.init();
        // }
        if ( $(".js__toggleAdForm").length || $(".js__adToHide").length) {
            UX.adplaceholder.init();
        }
        // if ( $(".trusted-proxy-form").length) {
        //     UX.trustedPoxy.init();
        // }
        // if ( $(".search__filters__ctrl__reset").length) {
        //     UX.appliedFacets.init();
        // }
        // UX.alerts.init();
        // if ( $("#institutionList").length) {
        //     UX.profileMain.init();
        // }
        // UX.dropblockUl.init();
        // UX.searchResult.init();
        // if ( $(".favoriteShortlist").length) {
        //     UX.favorites.init();
        // }
        // if ( $(".favoriteShortlist").length) {
        //     UX.favorites.init();
        // }
        // if ( $(".expandable-list").length) {
        //     UX.list.init();
        // }
        // if ( $(".header__dropzone-bookmark").length) {
        //     UX.bookmark.init();
        // }
        if (!$(".source_example").length && $(".fancyTable").length) {
            UX.stickyTables.init();
        }
        UX.outlinejs.init();
        UX.enquireIt.init(); // important: keep it always last
    });
})();