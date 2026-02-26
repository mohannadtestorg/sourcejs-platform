commerce.ShippingWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.shipping);
};

commerce.ShippingWidget.prototype = new literatum.Widget();

commerce.ShippingWidget.id = 'eCommerceCheckoutShippingWidget';
commerce.ShippingWidget.action = '/pb/widgets/commerce/shipping';

commerce.ShippingWidget.notifications = {
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
    zipCode: commerce.FieldNotification,
    shippingCost: commerce.FieldNotification

};

commerce.ShippingWidget.prototype.lostFocus = function () {
    if (this.find("form").length) {
        return literatum.widgets.render(this, {}, {});
    }
};

commerce.ShippingWidget.binders = {
    editShipping: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(literatum.utils.nextCheckoutSection);
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
    submitShipping: function (e, widget) {
        e.preventDefault();
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(literatum.utils.nextCheckoutSection);
        commerce.cart.addCallback(loading.done);
        commerce.cart.shipping.update(widget.find("form").serializeObject());
    },
    shippingOptions: function (e, widget) {
        e.preventDefault();
        var forms = widget.collectForms();
        commerce.cart.shipping.shippingOptions(forms.shipping.country, forms.shipping.state)
    },
    expand: function (e, widget) {
        widget.find(".checkout-expand").slideToggle();
    },
    countryChanged: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        var notification = widget.getNotification('shippingCost');
        if (notification) {
            notification.reset();
        }
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

            commerce.cart.shipping.getShippingCosts(countryCode, function (model) {
                if (model.shippingOptions.length != 1) {
                    var $shippingOptions = widget.find(".shipping-cost-select");
                    var $select = $shippingOptions.find("select");
                    $select.find("option:not([value='-1'])").remove();
                    model.shippingOptions.forEach(function (item) {
                        $select.append('<option value="' + item['id'] + '">' + item['description'] + '</option>'); // seriously?!
                    });
                    if (model.error) {
                        notification.reset();
                        notification.error();
                        notification.setMessage(model.error);
                        notification.show();
                    }
                    widget.find(".shipping-cost-one input").prop('disabled', true);
                    widget.find(".shipping-cost-select select").prop('disabled', false);
                    widget.find(".shipping-cost-one").hide();
                    widget.find(".shipping-cost-select").show();
                } else {
                    widget.find(".shipping-cost-select select").prop('disabled', true);
                    widget.find(".shipping-cost-one input[name='shippingCost']").prop('disabled', false);
                    widget.find(".shipping-cost-select").hide();
                    widget.find("input[name='shippingCost']").val(model.shippingOptions[0].id);
                    widget.find("input[name='shippingCostDescription']").val(model.shippingOptions[0].description);
                    widget.find(".shipping-cost-one").show();
                }
                loading.done();
            });
        });
    },
    selectAddress: function (e, widget) {
        var addressUuid = $(this).val();
        if (e.type == 'change') {
            if (addressUuid != '-1') {
                var loading = new literatum.FullPageLoading();
                loading.start();
                widget.render({}, {editing: true, uuid: addressUuid}, function () {
                    var $country = widget.find("select[name='country']");
                    if ($country.val() != '') {
                        commerce.cart.shipping.getShippingCosts($country.val(), function (model) {
                            var $shippingOptions = widget.find(".shippingOptions");
                            var $select = $shippingOptions.find("select");
                            $select.find("option:not([value='-1'])").remove();
                            model.shippingOptions.forEach(function (item) {
                                $select.append('<option value="' + item['id'] + '">' + item['description'] + '</option>'); // seriously?!
                            });
                            $shippingOptions.show();
                            loading.done();
                        });
                    } else {
                        loading.done();
                    }
                });
            } else {
                widget.updateForm('shipping', {});
            }
        }
    }
};

commerce.ShippingWidget.infoHandlers = {
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

commerce.ShippingWidget.prototype.triggerInfoHandlers = function (widget, model) {
    Object.getPrototypeOf(commerce.ShippingWidget.prototype).triggerInfoHandlers.call(this, widget, model);

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

commerce.ShippingWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.ShippingWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.ShippingWidget.id);
};

literatum.widgets.register(commerce.ShippingWidget);
