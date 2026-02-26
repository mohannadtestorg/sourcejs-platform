// Import components
import '../../utility/js/namespace.js';

// Import variables
import '../variables/js/imports.js';

//import './sourceJs.js'
import '../../plugins/jquery/jquery.js'

import '../../plugins/jquery/jquery-migrate.js'

import '../../plugins/jquery/jqueryLoaded.js'

//TODO: When LIT-157794 will be fixed, uncomment next line
// import '../../plugins/jquery-ui/jquery-ui.min.js';


/*JCF plugin*/
import '../../plugins/custom-form/js/jcf.js'
import '../../plugins/custom-form/js/jcf.select.js'
import '../../plugins/custom-form/js/jcf.file.js'
import '../../plugins/custom-form/js/jcf.button.js'
import '../../plugins/custom-form/js/jcf.checkbox.js'
import '../../plugins/custom-form/js/jcf.number.js'
import '../../plugins/custom-form/js/jcf.radio.js'
import '../../plugins/custom-form/js/jcf.range.js'
import '../../plugins/custom-form/js/jcf.scrollable.js'
import '../../plugins/custom-form/js/jcf.textarea.js'
import '../../plugins/custom-form/js/jcf.start.js'

import '../../plugins/panzoom/jquery.panzoom.js' // Todo: find how to prevent AMD define()

import '../../plugins/jquery-ui/jquery-ui.js'

import '../../plugins/touchSwipe/jquery.touchSwipe.js' // Todo: find how to prevent AMD define()

//import '../../plugins/literatum/imports'

import '../../plugins/sticko/js/sticko.js'
import '../../plugins/scrollo/js/scrollo.js'
import '../../plugins/enquireJs/js/enquire.js'
import '../../plugins/controller/js/controller.js'
import '../../plugins/header-scroll-fix/js/header-scroll-fix.js'
import '../../plugins/auto-hide-bar/js/auto-hide-bar.js'


import '../basic/js/imports.js'
import '../components/js/imports.js'
import '../widgets/js/imports.js'
import '../templates/js/imports.js'

import '../../plugins/controller/js/enquireIt.js' // important: keep it always last
// import '../variables/js/mimicked-services-variables.js'
//import '../widgets/publication-content/js/override-publication-content.js';


//LIT-157797
//import '../../plugins/literatum/imports'
//import '../widgets/raa/js/imports.js';

import '../basic/colors/js/palette.js'
import '../widgets/pd-grants/js/mimicked-funders.js';
import '../widgets/pd-authors/js/mimicked-pd-authos.js';
import '../widgets/pd-basic-metadata/js/mimicked-pd-basic-metadata.js';
import '../widgets/pd-action-bar/js/mimicked-pd-action-bar.js';
import '../widgets/publication-content/js/override-publication-content.js';
import '../../plugins/jquery-ui/jquery.ui.core.js'
(function () {
    $(document).ready(function () {
        UX.controller.init();
        if(!$(".source_example").length && $(".sticko , .sticko__md, .sticko__sm").length){
            UX.sticko.init();
        }
        if ( $('[data-toggle="nav"]').length) {
            UX.menu.init();
        }
        if ( $(".datepicker").length) {
            UX.datepicker.init();
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
        if($('.back-to-top').length){
            UX.backToTop.init();
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
        if ( $(".basic-metadata").length) {
            UX.basicMetadata.init();
        }
        if ( $(".supplemental-links").length) {
            UX.supplementalLinks.init();
        }
        if ( $(".funders").length) {
            UX.funders.init();
        }
        if ( $(".uploader").length) {
            UX.fileUploader.init();
        }
        if ($('.author-index').length){
            UX.authorIndex.init();
        }

        if ( $(".sortable-table").length) {
            UX.sortableTableRow.init();
        }

        if ( $(".submission-authors").length) {
            UX.submissionAuthors.init();
        }
        if ( $("#institutionUsageReport").length) {
            UX.reports.init();
        }

        if($('.cookiePolicy-popup').length){
            UX.cookiePolicyPopupWidget.init();
        }

        if ( $(".supplemental-files").length) {
            UX.supplementalFiles.init();
        }
        if ( $(".js-editable").length) {
            UX.editInPlace.init();
        }
        if ( $(".submission-list").length) {
            UX.submissionList.init();
        }
        if ( $(".pd-action-bar").length) {
            UX.pdActionBar.init();
        }
        if ( $(".js-counter").length) {
            UX.charCounter.init();
        }
        if ( $("#draftForm").length) {
            UX.draftForm.init();
        }
        if ( $(".pairing-management").length) {
            UX.pairingManagment.init();
        }
        if ( $(".device-pairing").length) {
            UX.devicePairing.init();
        }
        if ( $(".scrollThenFix").length) {
            UX.headerScrollFix.init();
        }
        if ( $(".categories-widget").length) {
            UX.pdSearchCategories.init();
        }

        if($('.client-pagination').length){
            UX.clientPagination.init();
        }
        if($('.remote-access-email-domains').length){
            UX.remoteAccessEmail.init();
        }
        if ($('.js__removeAdmins').length){
            UX.administrators.init();
        }

        if($('.responsive-menu-nav').length){
            UX.reponsiveMenu.init();
        }

        if ($('.js__removeAdmins').length){
            UX.administrators.init();
        }

        if ($('.multi-search').length){
            UX.multiSearch.init();
        }

        if($('.sections-block').length){
            UX.sidebarSections.init();
        }

        if($('.auto-hide-primary-bar').length){
            UX.autoHideBar.init();
        }

        if ( $("main.content").length) {
            UX.pageBody.init();
        }

        UX.enquireIt.init(); // important: keep it always last
    });
})();
