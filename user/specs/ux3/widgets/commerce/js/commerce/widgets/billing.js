commerce.BillingWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.shipping);
    this.register(commerce.cart.billing);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
};

commerce.BillingWidget.prototype = new literatum.Widget();

commerce.BillingWidget.id = 'eCommerceCheckoutBillingWidget';
commerce.BillingWidget.action = '/pb/widgets/commerce/billing';

commerce.BillingWidget.notifications = {
    info: commerce.Notification,
    givennames: commerce.FieldNotification,
    surname: commerce.FieldNotification,
    email: commerce.FieldNotification,
    phone: commerce.FieldNotification,
    organization: commerce.FieldNotification,
    address1: commerce.FieldNotification,
    city: commerce.FieldNotification,
    country: commerce.FieldNotification,
    state: commerce.FieldNotification,
    zipCode: commerce.FieldNotification

};

commerce.BillingWidget.prototype.lostFocus = function () {
    if (this.find("form").length) {
        return literatum.widgets.render(this, {}, {});
    }
};

commerce.BillingWidget.binders = {
    submitBilling: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(literatum.utils.nextCheckoutSection);
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.billing.update($("form[name='billing']").serializeObject());
    },
    editBilling: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();

        var d = literatum.widgets.render(widget, {}, {editing: true});
        literatum.widgets.all().forEach(function (item) {
            if (widget.widgetDef.id != item.widgetDef.id) {
                d = d.then(item.lostFocus());
            }
        });
        d.then(function () {
            literatum.utils.nextCheckoutSection();
            loading.done();
        });
    },
    sameAsShipping: function (e, widget) {
        if ($(this).is(":checked")) {
            var shippingWidgets = literatum.widgets.get('eCommerceCheckoutShippingWidget');
            var shippingWidget = shippingWidgets[0];
            if (shippingWidget) {
                var forms = shippingWidget.collectForms();
                widget.updateForm('billing', forms['shipping'], true);
                widget.find("select[name='country']").change();
            }

            var identityWidgets = literatum.widgets.get('eCommerceCheckoutIdentityWidget');
            var identityWidget = identityWidgets[0];
            if (identityWidget) {
                var forms = identityWidget.collectForms();
                widget.updateForm('billing', forms['personal-info'], true);
            }
        } else {
            literatum.utils.clearForm('billing', {});
        }
    },
    placeOrder: function (e, widget) {
        if (!commerce.validators.validate(widget.find("form[name='apg']"))) {
            e.preventDefault();
        }
    },
    expand: function (e, widget) {
        widget.find(".checkout-expand").slideToggle();
    },
    countryChanged: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        var countryCode = $(this).val();

        literatum.utils.getCountryState(countryCode, function (model) {
            var $states = widget.find(".state");
            var $select = $states.find("select");

            if (e.type == 'change') {
                $select.val(null);
            }

            $select.find("option:not([value='-1'])").remove();
            if (model.states.length > 0) {
                model.states.forEach(function (item) {
                    $select.append('<option value="' + item['id'] + '">' + item['description'] + '</option>'); // seriously?!
                });

                $states.show();
            } else {
                $states.hide();
            }
            loading.done();
        });
    },
    selectAddress: function (e, widget) {
        var addressUuid = $(this).val();
        if (e.type == 'change') {
            if (addressUuid != '-1') {
                var loading = new literatum.FullPageLoading();
                loading.start();
                widget.render({}, {editing: true, uuid: addressUuid}, function () {
                    loading.done();
                });
            } else {
                widget.updateForm('billing', {});
            }
        }
    }
};

commerce.BillingWidget.infoHandlers = {
    addressError: function (message, widget) {
        var notification = widget.getNotification('info');
        if (notification) {
            notification.error();
            notification.setMessage(message);
            notification.show();
        }
        literatum.utils.scroll('.errorMsgBox:visible', 0);
    }
};

commerce.BillingWidget.prototype.triggerInfoHandlers = function (widget, model) {
    Object.getPrototypeOf(commerce.BillingWidget.prototype).triggerInfoHandlers.call(this, widget, model);

    widget.find("input,select").each(function () {
        var $this = $(this);
        var name = $this.attr('name');
        var errorName = name + "Error";
        var notification = widget.getNotification(name);
        if (notification) {
            notification.reset();
            if (model && model.attributes && model.attributes[errorName]) {
                notification.error();
                notification.setMessage(model.attributes[errorName]);
                notification.show();
            }
        }
    });
};

commerce.BillingWidget.prototype.validateForm = function (cartInfo) {

};

commerce.BillingWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.BillingWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.BillingWidget.id);
};

literatum.widgets.register(commerce.BillingWidget);
