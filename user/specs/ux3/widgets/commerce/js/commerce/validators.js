// Later might be a better idea to create form objects so they can be overridden and each handled separately
commerce.validators = (function () {
    var instance = {};

    var creditCardsPattern = {};
    creditCardsPattern['visa'] = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
    creditCardsPattern['mastercard'] = new RegExp("^5[1-5][0-9]{14}$");
    creditCardsPattern['amex'] = new RegExp("^3[47][0-9]{13}$");
    creditCardsPattern['dinner'] = new RegExp("^3(?:0[0-5]|[68][0-9])[0-9]{11}$");
    creditCardsPattern['discover'] = new RegExp("^6(?:011|5[0-9]{2})[0-9]{12}$");
    creditCardsPattern['jcb'] = new RegExp("^6(?:011|5[0-9]{2})[0-9]{12}$");

    instance.creditcard = function (value, element) {

        var number = value.match(/\d/g);

        if (!number)
            return true;

        value = number.join("");

        var invalid = true;
        Object.keys(creditCardsPattern).forEach(function (k) {
            if (creditCardsPattern[k].test(value)) {
                invalid = false;
            }
        });
        return invalid;
    };

    instance.creditcardDate = function (value, element, form) {
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth(5) + 1;
        var currentYear = currentDate.getFullYear();
        value = value.split('/');
        var monthExpiry = value[0];
        var yearExpiry = value[1];

        var expireMonth = parseInt(monthExpiry);
        var expireYear = parseInt(yearExpiry);

        if (expireMonth > 12) {
            return true;
        }

        if (currentYear > expireYear) {
            return true;
        }

        if (currentYear == expireYear && currentMonth > expireMonth) {
            return true;
        }

        form.find("input[name='expMonth']").val(expireMonth);
        form.find("input[name='expYear']").val(expireYear);

        return false;
    };

    instance.notEmpty = function (value) {
        return !(!!(value));
    };

    instance.validate = function (form) {
        var $form = null;
        var invalid = true;

        if (form instanceof jQuery) {
            $form = form;
        } else {
            $form = $(form);
        }

        $form.find("input[data-validate]").each(function () {
            var $this = $(this);
            invalid = commerce.validators.validateField($this, $form) && invalid;
        });
        return invalid;
    };

    instance.validateField = function (field, form) {
        var $field = null;

        if (field instanceof jQuery) {
            $field = field;
        } else {
            $field = $(field);
        }

        var validatorName = $field.data("validate");
        var validator = instance[validatorName];
        var value = $field.val();
        return validator(value, $field, form);
    };

    instance.securityCode = function (value) {
        return !(/^[0-9]{3,4}$/.test(value));
    };

    return instance;
}());