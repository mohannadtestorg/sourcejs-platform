import '../../../utility/js/namespace.js';

// Import variables
import '../../../ux3/variables/js/imports.js';
import '../variables/js/imports.js';

import '../../../plugins/jquery/jquery.js';

import '../../../plugins/custom-form/js/jcf.js'
import '../../../plugins/custom-form/js/jcf.select.js'
import '../../../plugins/custom-form/js/jcf.file.js'
import '../../../plugins/custom-form/js/jcf.button.js'
import '../../../plugins/custom-form/js/jcf.checkbox.js'
import '../../../plugins/custom-form/js/jcf.number.js'
import '../../../plugins/custom-form/js/jcf.radio.js'
import '../../../plugins/custom-form/js/jcf.range.js'
import '../../../plugins/custom-form/js/jcf.scrollable.js'
import '../../../plugins/custom-form/js/jcf.textarea.js'
import '../../../plugins/custom-form/js/jcf.start.js'

import '../../../plugins/touchSwipe/jquery.touchSwipe.js';
import '../../../plugins/enquireJs/js/enquire.js'
import '../../../plugins/controller/js/controller.js';


import '../basic/js/imports.js';

import '../components/js/imports.js';

import '../widgets/js/imports.js';

import '../templates/js/imports.js';

import '../../../plugins/controller/js/enquireIt.js';
(function () {
    $(document).ready(function () {
        UX.controller.init();
        if ($('.quick-search').length){
            $('.quick-search').quickSearch();
        }
        if ($('.pub').length){
            $('.pub').publications($pubModalButton);
        }
        if ($('.pub-modal').length){
            var $pubModalButton = $(".pubModal_button");
            if($pubModalButton.length) {
                $('.pub-modal').pubModal($pubModalButton);
            }
        }
        if ($('.header_burger-menu').length){
            $('.header_burger-menu').burgerMenu();
        }
        if ($('.header_my-activity').length){
            $('.header_my-activity').myActivity();
        }
        if ($('.accordion').length){
            UX.accordion.init();
        }
        if ($('[data-db-target-for]').length){
            UX.dropBlock.init();
        }
        if ($('.niHeader').length){
            UX.niHeader.init();
        }
        UX.enquireIt.init(); // important: keep it always last
    });
})();