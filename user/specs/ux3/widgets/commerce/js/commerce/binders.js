commerce.binders = (function () {
    var instance = {};

    instance.removeDiscount = function (e) {
        e.preventDefault();
        commerce.cart.discounts.remove($(this).data('discount'));
    };

    instance.disableDiscount = function (e) {
        e.preventDefault();
        commerce.cart.discounts.disable($(this).data('discount'));
    };

    instance.removeItem = function (e) {
        e.preventDefault();
        commerce.cart.buyingList.remove($(this).data("item-id"));
    };


    instance.submitBilling = function (e) {
        e.preventDefault();
        commerce.cart.billing.update($("form.billing").serializeObject());
    };

    instance.editBilling = function (e) {
        e.preventDefault();
        literatum.widgets.billing.render({}, {editing: true});
    };

    instance.expandBilling = function (e) {
        e.preventDefault();
        $(".billingAddress").slideToggle();
    };

    instance.sameAsShipping = function (e) {
        if ($(this).is(":checked")) {
            literatum.utils.copyForm('.checkoutShipping form', '.billingPayment form')
        } else {
            literatum.utils.clearForm('.billingPayment form');
        }
    };

    instance.countryChanged = function (e) {
        var countryCode = $(this).val();

        var $state = $(this).closest("form").find("select[name='state']");

        if ($state.find("option[data-country='" + countryCode + "']").length > 0) {
            $state.find("option:not([data-country='" + countryCode + "'])").hide();
            $state.find("option[data-country='" + countryCode + "']").show();
            if (!$state.is(":visible")) {
                $state.parent().slideDown(); // review
            }
        } else {
            $state.parent().slideUp(); // review
        }

        $state.val(null);
    };

    instance.bind = function () {
        $("*[data-bind]").each(function () {
            var binderName = $(this).data("bind");
            console.log("Binding '" + binderName + "' to element '" + this + "'");
            var binder = instance[binderName];
            $(this).on('click', binder);
        });
    };

    instance.unbind = function () {
        $("*[data-bind]").each(function () {
            try {
                var binderName = $(this).data("bind");
                //console.log("Unbinding '" + binderName + "' to element '" + this + "'");
                var binder = instance[binderName];
                $(this).off('click', binder);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return instance;
}());

function registerListeners() {
    // Always unbind before binding again
    try {
        commerce.binders.unbind();
    } catch (e) {
        console.log(e);
    }
    try {
        //console.log("Binding events to candidate elements");
        commerce.binders.bind();
    } catch (e) {
        //console.log("Failed to bind events, rolling back...");
        commerce.binders.unbind();
    }
}
