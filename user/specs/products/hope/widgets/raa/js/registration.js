(function () {

    var  showCountryStates = {
        init: function () {
            showCountryStates.on.build();
        },
        on: {
            build: function () {
                showCountryStates.edit.on('change', '.country', function() {
                    var value = $(this).val();
                    var $states = showCountryStates.edit.find('.state');
                    $states.attr('disabled', true).val('').hide();
                    var $current = $states.filter('.' + value);
                    if ($current.length) {
                        $current.removeAttr('disabled').show();
                        $current.val( $current.find('option:eq(1)').val());
                    }
                    $states.closest('.input-group').toggleClass('hidden', !$current.length);
                });
            }
        },
        edit: $(".edit")
    };

    UX.showCountryStates = showCountryStates; // add to global namespace

})();