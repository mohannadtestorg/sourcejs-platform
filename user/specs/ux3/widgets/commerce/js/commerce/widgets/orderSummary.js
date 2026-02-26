commerce.OrderSummaryWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.discounts);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.shipping);
    this.register(commerce.cart.billing);
    this.register(commerce.cart.tax);
    this.register(commerce.cart.summary);
};

commerce.OrderSummaryWidget.prototype = new literatum.Widget();

commerce.OrderSummaryWidget.id = 'eCommerceCheckoutSummaryWidget';
commerce.OrderSummaryWidget.action = '/pb/widgets/commerce/orderSummary';

commerce.OrderSummaryWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.OrderSummaryWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.OrderSummaryWidget.id);
};

literatum.widgets.register(commerce.OrderSummaryWidget);
