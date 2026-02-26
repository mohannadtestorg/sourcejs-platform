(function(){
    var $body = $('body');

    var pdSearchCategories = {
        selector: null,

        init: function () {
            this.elSelect = ".categories-widget select";

            pdSearchCategories.controller();
        },

        controller: function () {
            $(pdSearchCategories.elSelect).on('change', function (e) {
                var optGroups = $(this).find("optgroup");
                var jcfInstance = jcf.getInstance(this);
                $(optGroups).each(function( index ) {
                    var parentId = $(this).attr("data-parent-id");
                    var parentSelected = $("#"+parentId)[0].selected;
                    var selectedOptionsCount = $(this).find("option:selected").length;
                    if ( selectedOptionsCount > 0 ) {
                        if (!parentSelected) {
                             $("#"+parentId)[0].selected = true;
                             jcfInstance.refresh();
                        }
                    }
                });
            });
        }

    }

    UX.pdSearchCategories = pdSearchCategories; // add to global namespace


})();