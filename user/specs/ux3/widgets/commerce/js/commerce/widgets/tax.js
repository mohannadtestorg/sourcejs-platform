commerce.TaxWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.billing);
    this.register(commerce.cart.shipping);
    this.register(commerce.cart.tax);
};

commerce.TaxWidget.prototype = new literatum.Widget();

commerce.TaxWidget.id = 'eCommerceCheckoutTaxWidget';
commerce.TaxWidget.action = '/pb/widgets/commerce/tax';

commerce.TaxWidget.prototype.lostFocus = function () {
    if (this.find("form").length) {
        return literatum.widgets.render(this, {}, {});
    }
};

commerce.TaxWidget.binders = {
    updateTax: function (e, widget) {
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
    tax: function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(literatum.utils.nextCheckoutSection);
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.tax.update($("form.tax").serializeObject());
    }
};

commerce.TaxWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.TaxWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.TaxWidget.id);
};

literatum.widgets.register(commerce.TaxWidget);
