import '../../../ux3/js/all.js';

// Import variables
import '../variables/js/imports.js';

import '../components/js/imports.js';

import '../widgets/js/imports.js';

import '../templates/js/imports.js';

import '../plugins/advertisement/js/header-advertisement.js'

import '../plugins/advertisement/js/scroll-advertisement.js'

import '../plugins/headerToggleScroll/js/headerToggleScroll.js'
import '../../../ux3/basic/colors/js/palette.js'

import '../../../ux3/widgets/pd-grants/js/mimicked-funders.js';

import '../../../ux3/widgets/pd-authors/js/mimicked-pd-authos.js';

import '../../../ux3/widgets/pd-basic-metadata/js/mimicked-pd-basic-metadata.js';

import '../../../ux3/widgets/publication-content/js/override-publication-content.js';

(function () {
    $(document).ready(function () {
        UX.controller.init();
        if(!$(".source_example").length && $(".sticko , .sticko__md, .sticko__sm").length){
            UX.sticko.init();
        }
        if ( $('[data-toggle="nav"]').length) {
            UX.menu.init();
        }

        if ( $('.res-menu-nav').length) {
            UX.responseMenu.init();
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
        if ( $(".favoriteShortlist").length) {
            UX.favorites.init();
        }
        if ( $(".expandable-list").length) {
            UX.list.init();
        }
        if ( $(".header__dropzone-bookmark").length) {
            UX.bookmark.init();
        }
        if ( $(".book-toc").length) {
            UX.bookToc.init();
        }
        if($('.profile-menu').length){
            UX.profileMenu.init();
        }
        if($('.header__advertisement').length){
            UX.headerAdv.init();
        }
        if($('.scroll_adv').length){
            UX.scrollAdv.init();
        }
        if($('.book-chapter').length){
            UX.bookChapter.init();
        }
        if($('.homepage').length){
            UX.homepage.init();
        }
        if ( $(".pairing-management").length) {
            UX.pairingManagment.init();
        }
        if ( $(".device-pairing").length) {
            UX.devicePairing.init();
        }

        if($('.address-widget').length){
            UX.addresses.init();
        }
        if($('.remote-access-email-domains').length){
            UX.remoteAccessEmail.init();
        }
        if($('.mob-toggle-header').length){
            UX.headerToggleScroll.init();
        }
        if($('.toc-item__bottom-link').length){
            UX.tocLinksTrim.init();
        }

        UX.enquireIt.init(); // important: keep it always last
    });
})();