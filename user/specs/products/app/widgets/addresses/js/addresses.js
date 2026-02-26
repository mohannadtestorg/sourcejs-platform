(function () {
    var $body = $('body');
    var  addresses = {
        init: function () {
            addresses.control();
        },

            control: function () {
                $body.on('change', '[name="address.country"]', function() {
                    var value = $(this).val();
                    var $states = $('[name="address.state"]');
                    $states.attr('disabled', true).val('').hide();
                    var $current = $states.filter('.' + value);
                    if ($current.length) {
                        $current.removeAttr('disabled').show();
                        $current.val( $current.find('option:eq(1)').val());
                    }
                    $states.closest('.input-group').toggleClass('hidden', !$current.length);
                });
            }


    };

    UX.addresses = addresses; // add to global namespace

})();