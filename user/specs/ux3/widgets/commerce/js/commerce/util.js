//const circle = require('../../../../../plugins/literatum/imports');

literatum.utils = {
    send: function (request, callback, error) {
        if (!request)
            return;

        request.ajaxRequest = true;

        return $.ajax({
            url: '/action/' + request.action,
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            crossDomain: true,
            xhrFields: {withCredentials: true},
            data: request,
            success: callback,
            error: error
        });
    },
    copyForm: function (source, to) {
        $(source).find('input').each(function () {
            var name = $(this).attr('name');
            var targetField = $(to).find("input[name='" + name + "']");
            targetField.val($(this).val());
        });

        $(source).find('select').each(function () {
            var value = $(this).find('option:selected').val();
            $(to).find("select[name='" + $(this).attr('name') + "']").find("option[value='" + value + "']").attr('selected', '');
        });
    },
    clearForm: function (form) {
        $(form).click(function () {
            $(this).find("input[type=text], select, textarea").val('');
        });
    },
    hasErrors: function (attributes) {
        var hasErrors = false;
        Object.keys(attributes).forEach(function (key) {
            hasErrors |= (key.toLowerCase().indexOf("error") > -1);
        });
        return hasErrors;
    },
    hasAttributes: function (attributes) {
        return attributes && Object.keys(attributes).length > 0;
    },
    scroll: function (selector, speed, offset) {
        var $object = null;

        if (selector instanceof jQuery) {
            $object = selector;
        } else {
            $object = $(selector);
        }

        if (!$object || $object.length == 0)
            return;

        if (typeof speed === 'undefined') {
            speed = 2000;
        }

        if (typeof offset === 'undefined') {
            offset = $object.offset().top;
        } else {
            offset = $object.offset().top - offset
        }

        $('html, body').animate({
            scrollTop: offset
        }, speed);
    },
    nextCheckoutSection: function () {
        var $widget = $(".eCommerceCheckoutFieldsWidget .scroll-focus").closest('.widget');
        if ($(window).width() > 992) {
            literatum.utils.scroll($widget, 800, 10);
        } else {
            literatum.utils.scroll($widget, 800, 60);
        }
    },
    getCountryState: function (iso2Alpha, callback) {
        return literatum.utils.send({
            action: 'getCountryStates',
            country: iso2Alpha
        }, callback);
    }
};


///////////////////////////////// TEMP

$(".add-to-cart").click(function (e) {
    e.stopPropagation();
    $(this).toggleClass("opened");
    //$(this).find(".purchaseArea").slideToggle();

    var purchaseAreaWidth = $(this).parent().width();
    $(this).find(".purchaseArea").css('width', purchaseAreaWidth);

});

if ($(".add-to-cart").length > 0) {
    $("body").click(function (e) {
        var $target = $(e.target);
        if (!$target.hasClass("add-to-cart") && $target.closest(".add-to-cart").length == 0) {
            $(".add-to-cart").removeClass("opened");
            $(".add-to-cart").find(".purchaseArea").slideUp();
        }
    });
}

// Needs review
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    console.log("Form");
    console.log(a);
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};