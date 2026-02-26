(function () {

    var institutionDetails = {
        countrySelect: ".countrySelect",
        stateSelect: ".stateSelect",
        stateContainer: ".stateContainer",
        noStatesContainer: ".noStates",
        terms: '#acceptTerms',
        activateBtn: '#activateAccountBtn',

        init: function(){
            institutionDetails.controller();
            institutionDetails.activateBtnState();
        },
        controller: function(){
            $(institutionDetails.countrySelect).change(function() {
                institutionDetails.country_select($(this));
            });
            $(institutionDetails.stateSelect).change(function() {
                institutionDetails.state_select($(this));
            });

            $(document).ready(function() {
                institutionDetails.country_select($(institutionDetails.countrySelect));
            });

            $(document).on('change',".institutionalProfileActivation ", function(event){
                institutionDetails.activateBtnState();
            });


            $(document).on('input',"form.institutionDetails ", function(event){
                var values = false;
                var $form = $(this);


                $form.find('input:not([type="hidden"]), select').each(function () {

                    if ($(this).val() &&  $(this).val() != -1) {
                        values = true;
                        return;
                    }


                });

                if (values) {
                    $form.find('[value="cancel"]').attr('disabled', false);
                } else {
                    $form.find('[value="cancel"]').attr('disabled', true);
                }


            });
        },
        country_select: function ($select) {
            var value = $select.val();
            institutionDetails.disableAllStateSelect();
            if (value != '-1') {
                var $state = $('#country'+value);
                institutionDetails.showStateSelect($state);
            }
        },
        state_select: function ($select) {
            var value = $select.val();
            $(institutionDetails.noStatesContainer).find('input').val(value);
        },
        showStateSelect: function ($state) {
            if ($state.length !== 0) {
                // $(institutionDetails.noStatesContainer).addClass('hidden');
                $state.parents(institutionDetails.stateContainer).removeClass('hidden');
                $state.parents(institutionDetails.stateContainer).find('select').attr('disabled',false);
            }
        },
        disableAllStateSelect: function () {
            $(institutionDetails.stateContainer).addClass('hidden');
            $(institutionDetails.stateContainer).find('select').attr('disabled',true);
            // $(institutionDetails.noStatesContainer).removeClass('hidden');
            $(institutionDetails.noStatesContainer).find('input').val('');
        },
        activateBtnState: function () {
            var disabled = !$(institutionDetails.terms).is( ":checked" );
            $(institutionDetails.activateBtn).attr('disabled',disabled);
        }
    };

    UX.institutionDetails = institutionDetails; // add to global namespace
})();