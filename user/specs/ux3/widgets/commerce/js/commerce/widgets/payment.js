commerce.PaymentWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.billing);
    this.register(commerce.cart.shipping);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.discounts);
    this.register(commerce.cart.tax);

    var $error = this.find('.errorMsgBox').not('.hidden');

    if ($error.length == 0) {
        $error = this.find(".label.error");
    }

    if ($error.length > 0) {
        commerce.page.cart.show();
        literatum.utils.scroll($error, 800, 100);
    }
};

commerce.PaymentWidget.prototype = new literatum.Widget();

commerce.PaymentWidget.id = 'eCommerceCheckoutPaymentWidget';
commerce.PaymentWidget.action = '/pb/widgets/commerce/payment';

commerce.PaymentWidget.notifications = {
    holderName: commerce.FieldNotification,
    realNumber: commerce.FieldNotification,
    creditcardDate: commerce.FieldNotification,
    secNumber: commerce.FieldNotification
};

commerce.PaymentWidget.binders = {
    expandPayment: function (e, widget) {
        e.preventDefault();
        widget.find(".payment").slideToggle();
    },
    placeOrder: function (e, widget) {
        var $form = widget.find("form[name='apg']");

        var valid = true;
        $form.find("input[data-validate]").each(function () {
            var $this = $(this);
            var $group = $this.closest(".input-group");
            var invalid = commerce.validators.validateField($this, $form);
            var notification = widget.getNotification($group.data('notification'));
            if (!notification) {
                return;
            }
            if (invalid) {
                notification.reset();
                notification.setMessage('');
                notification.error();
                notification.show();
            } else {
                notification.reset()
            }
            valid = !invalid && valid;
        });

        if (!valid) {
            e.preventDefault();
        } else {
            var loading = new literatum.FullPageLoading();
            loading.setMessage("Do not close your browser while we are processing your payment"); // Figure out later how to move it to resource bundle
            loading.start();
        }
    },
    expand: function (e, widget) {
        var $header = widget.find(".checkout-expand");
        $header.stop(true, true);
        $header.slideToggle();
    }
};

commerce.PaymentWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.PaymentWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.PaymentWidget.id);
};

commerce.PaymentWidget.prototype.registerListeners = function () {

    Object.getPrototypeOf(commerce.PaymentWidget.prototype).registerListeners.call(this);

    var widget = this;
    var $date = $(this.find("input[name='expireDate']"));

    $date.on('keyup', function (e) {
        var thisVal = $(this).val();

        if (thisVal.length == 0)
            $(this).closest(".input-group").removeClass("focused");
        else
            $(this).closest(".input-group").addClass("focused");

        var numChars = $(this).val().length;

        if (numChars === 2) {
            if (thisVal > 12) {
                thisVal = 12;
            }
            if (!/\//.test(thisVal)) {
                thisVal += '/';
            }
            $(this).val(thisVal);
        }

        if (e.which == 8 && numChars === 2) {
            thisVal = thisVal.substring(0, thisVal.length - 2);
            $(this).val(thisVal);
        }
    });

    $date.on('blur', function () {
        var dateValue = $date.val().split('/');
        var numChars = $date.val().length;
        var thisVal = $date.val();
        if (this.value) {
            $(widget.find("input[name='expYear']")).val(dateValue[1]);
            $(widget.find("input[name='expMonth']")).val(dateValue[0]);
        } else {
            $(widget.find("input[name='expYear']")).val("");
            $(widget.find("input[name='expMonth']")).val("");
        }
        if (numChars > 6) {
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear();
            var value = thisVal.split('/');
            var yearExpiry = value[1];
            var expireYear = parseInt(yearExpiry);

            // if (currentYear > expireYear) {
            //     thisVal = value[0] + '/' + currentYear;
            //     $date.val(thisVal);
            // }
        }
    });

    $(this.find("input[data-validate]")).on("blur", function (e) {
        var $form = widget.find("form[name='apg']");

        var $this = $(this);
        var $group = $this.closest(".input-group");
        var invalid = commerce.validators.validateField($this, $form);
        var notification = widget.getNotification($group.data('notification'));
        if (!notification) {
            return;
        }
        if (invalid) {
            notification.reset();
            notification.setMessage('');
            notification.error();
            notification.show();
        } else {
            notification.reset()
        }
    });


    $(document).ready(function () {
        var $confirmOrderMsg = $('.eCommerceCheckoutPaymentWidget .infoMsgBox');
        if ($confirmOrderMsg.is(':visible')) {
            $confirmOrderMsg[0].scrollIntoView();
        }

    });
};

literatum.widgets.register(commerce.PaymentWidget);
