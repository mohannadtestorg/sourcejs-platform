import '../../../utility/js/namespace.js';

import '../variables/js/imports.js';

import '../plugins/js/imports.js'

import '../basic/js/imports.js'

import '../components/js/imports.js';

import '../widgets/js/imports.js';

import '../templates/js/imports.js';

import '../../../plugins/controller/js/enquireIt.js' // important: keep it always last




import '../../../ux3/widgets/publication-content/js/override-publication-content.js';
import '../../../plugins/jquery-ui/jquery.ui.core.js'
import '../../../ux3/basic/colors/js/palette.js'
(function () {
    $(document).ready(function () {
        UX.controller.init();

        if ( $('[data-toggle="nav"]').length) {
            UX.menu.init();
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
        if ($('article').length) {
            UX.loader.init();
        }


        if ($('figure').length) {
            UX.figureViewer.init();
        }

        if ($('.tab').length) {
            UX.tab.init();
        }
        if ($('.accordion').length){
            UX.accordion.init();
        }

        if ($('.loi__banner').length){
            UX.loi.init();
        }

        if ($('.owl-carousel').length) {
            UX.slider.init();
        }

        if($('.back-to-top').length){
            UX.backToTop.init();
        }

        if ($('.refineSearch').length || $('.advanced-search').length ) {
            UX.refine.init();
        }
        if ($('.advanced-search').length) {
            UX.searchFieldsCtrl.init();
        }

        if ($('.quick-search').length){
            UX.quickSearch.init();
        }

        if ($('.issue-item').length){
            UX.issueItem.init();
        }

        if ( $('[data-toggle="transplant"]').length) {
            UX.transplant.init();
        }

        if($('.search-result ').length){
            UX.searchResult.init();
        }
        if ($('.facet').length){
            UX.toggle.init();
        }
        if ( $(".search__filters__ctrl__reset").length) {
            UX.appliedFacets.init();
        }
        if($('.responsive-menu-nav').length){
            UX.reponsiveMenu.init();
        }

        if(!$(".source_example").length && $(".sticko , .sticko__md, .sticko__sm").length){
            UX.sticko.init();
        }

        if($('.sections-block').length){
            UX.sidebarSections.init();
        }

        if($(".table-fn").length || $('.ref.fn').length || $(".scroll-to-target").length){
            UX.scrollo.init();
        }

        if($('main').length){
            UX.pageBody.init();
        }

        UX.enquireIt.init(); // important: keep it always last
    });
})();