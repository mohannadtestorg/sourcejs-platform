// Import components
import '../../../utility/js/namespace.js';

import '../../../plugins/enquireJs/js/enquire.js'
import '../../../plugins/controller/js/controller.js';
import "../../../plugins/owl-carousel/js/owl.carousel.min.js";

import '../variables/js/imports.js';
import '../basic/js/imports.js';
import '../components/js/imports.js';
import '../widgets/js/imports.js';

import '../../../plugins/controller/js/enquireIt.js' // important: keep it always last
import '../../../ux3/basic/colors/js/palette.js'
(function () {
    $(document).ready(function () {
        UX.controller.init();
        UX.navButton.init();
        if ($('[data-db-target-for]').length){
            UX.dropBlock.init();
        }
        if ($('.owl-carousel').length) {
            UX.slider.init();
        }
        if ( $('[data-toggle="nav"]').length) {
            UX.menu.init();
        }
        UX.enquireIt.init(); // important: keep it always last
    });
})();