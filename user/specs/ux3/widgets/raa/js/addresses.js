$(function() {
    $('.addresses').each(function() {
        var $widget = $(this);

        var $change = $widget.find('.switch-address');
        var $edit = $widget.find('.edit');
        var $addresses = $widget.find('.address');

        var clear = function() {
            $edit.find('.dynamic').val('');
            $edit.find('.error').removeClass('error');
            $edit.find('.state').attr('disabled', true);
            $edit.find('.state').closest('.input-group').addClass('hidden');
            $edit.find('.message').text('');
        };

        $change.change(function() {
            var uuid = $change.val();
            $edit.addClass('hidden');
            $addresses.addClass('hidden');
            clear();
            if (uuid) {
                $addresses.filter('.' + uuid).removeClass('hidden');
            } else {
                $edit.removeClass('hidden');
            }
        });

        $widget.on('click', '.edit-address', function(e) {
            e.preventDefault();
            var $address = $(this).closest('.address');
            $address.find('[data-name]').each(function() {
                var $this = $(this);
                var $holder = $edit.find('#address\\.' + $this.data().name);
                var text = $this.text();
                if ($holder.is('select')) {
                    console.log($holder.find('option').filter(function() {
                        return $(this).val() == text || $(this).text() == text;
                    }));
                    $holder.find('option').removeAttr('selected').filter(function() {
                        return $(this).val() == text || $(this).text() == text;
                    }).prop('selected',true);
                } else {
                    $holder.val(text);
                }
            });
            var country = $edit.find('.country').val();
            if (country) {
                var $states = $edit.find('.state.' + country);
                if ($states.length) {
                    var state = $address.find('[data-name="state"]').text();
                    $states.find('option').removeAttr('selected').filter(function() {
                        return $(this).val() == state || $(this).text() == state;
                    }).prop('selected',true);
                    $states.removeAttr('disabled');
                    $states.closest('.input-group').removeClass('hidden');
                }
            }
            $address.addClass('hidden');
            $edit.removeClass('hidden');
        });

        $widget.on('change', '.country', function() {
            var value = $(this).val();
            var $states = $edit.find('.state');
            $states.attr('disabled', true).val('');
            var $current = $states.filter('.' + value);
            if ($current.length) {
                $current.removeAttr('disabled');
            }
            $states.closest('.input-group').toggleClass('hidden', !$current.length);
        });
    });
});