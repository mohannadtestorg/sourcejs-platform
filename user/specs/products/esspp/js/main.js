import '../../../ux3/js/all.js';

// import Product Scripts
import '../variables/js/imports.js';
import '../components/js/imports.js';
import '../templates/js/imports.js';
import '../widgets/js/imports.js';

// import '../variables/js/mimicked-services-variables.js'
//import '../widgets/publication-content/js/override-publication-content.js';


//LIT-157797
//import '../../plugins/literatum/imports'
//import '../widgets/raa/js/imports.js';

import '../../../ux3/basic/colors/js/palette.js'
import '../../../ux3/widgets/pd-grants/js/mimicked-funders.js';
import '../../../ux3/widgets/pd-authors/js/mimicked-pd-authos.js';
import '../../../ux3/widgets/pd-basic-metadata/js/mimicked-pd-basic-metadata.js';
import '../../../ux3/widgets/pd-action-bar/js/mimicked-pd-action-bar.js';

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
        if ($('.author-index').length){
            UX.authorIndex.init();
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
        if ( $(".sortable-table").length) {
            UX.sortableTableRow.init();
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
        if ( $(".submission-authors").length) {
            UX.submissionAuthors.init();
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
        if ( $(".pd-pdf").length) {
            UX.pdPdf.init();
        }
        if ( $(".categories-widget select").length) {
            UX.pdSearchCategories.init();
        }

        UX.enquireIt.init(); // important: keep it always last
    });
})();