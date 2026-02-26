(function () {
    var $window = $(window);

    var transplant = {
        $element : null,
        $target  : null,
        $order: null,
        $cloneData: null,

        init: function(){

            var transArray = $('[data-toggle="transplant"]');

            transArray.each(function(index){

                transplant.$element = $(this).data('transplant');
                transplant.$target = $($(this).data('target'));
                transplant.$direction = $($(this).data('direction'));
                transplant.$order = $(this).data('transplant-order');

                transplant.$remove = $(this).data('remove');
                transplant.$targetClass = $(this).data('target-class');
                transplant.$classNames = $(this).data('class-names');

                if (transplant.$direction == "to" || typeof (transplant.$direction) == 'undefined') {
                    if (transplant.$element === 'self') {
                        transplant.$element = $(this);
                    } else {
                        transplant.$element = $(this).find(transplant.$element);
                    }
                    transplant.$cloneData =  transplant.$element.clone(true,true).removeAttr('data-toggle').attr('data-transplant-order',transplant.$order );

                    transplant.clone();
                    if (transplant.$targetClass){
                        transplant.$target.find('.transplanted-clone').addClass(transplant.$targetClass)
                    }
                    if (transplant.$classNames){
                        transplant.$element.addClass(transplant.$classNames)
                    }
                    if (transplant.$remove == true){
                        transplant.remove();
                    }

                } else {
                    transplant.$target = $(this);

                    var array = $(this).data('target').split(",");
                    $.each(array, function(index, item) { // go through selectors
                        transplant.$element = $(item);
                        transplant.$cloneData =  transplant.$element.clone(true, true).attr('data-transplant-order',transplant.$order );
                        transplant.clone();

                        if (transplant.$targetClass){
                            transplant.$element.addClass(transplant.$targetClass)
                        }

                        if (transplant.$classNames){
                            transplant.$target.find(".transplanted-clone").addClass(transplant.$classNames)
                        }
                        if (transplant.$remove == true){
                            transplant.remove();
                        }
                    });
                }

            });
            transplant.order()

        },

        clone: function(){
            if (transplant.$element.hasClass('cloned')) return;

            if (transplant.$target.find('.transplanted-clone').length <= 0){
                transplant.$target.append('<div class="transplanted-clone"></div>');
            }
            transplant.$target.find('.transplanted-clone').append(transplant.$cloneData);

            transplant.$element.addClass('cloned');
        },
        order: function(){
            var clonedItems = transplant.$target.find('.transplanted-clone').children();

            clonedItems.sort(function(a, b){
                return $(a).data("transplant-order")-$(b).data("transplant-order")
            });

            transplant.$target.find('.transplanted-clone').html(clonedItems);

        },
        remove: function(){
            if (transplant.$target){
                transplant.$element.remove();
            } else{
                transplant.$source.remove();
            }
        }
    };
    UX.transplant = transplant; // add to global namespace
})();