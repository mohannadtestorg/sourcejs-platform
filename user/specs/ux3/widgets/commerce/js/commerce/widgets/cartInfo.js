commerce.CartInfoWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.discounts);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.billing);
    this.register(commerce.cart.shipping);
};

commerce.CartInfoWidget.prototype = new literatum.Widget();

commerce.CartInfoWidget.id = 'eCommerceCartInfoWidget';
commerce.CartInfoWidget.action = null;

commerce.CartInfoWidget.prototype.update = function () {
    var notification = commerce.Notification.get(this.find(".cartInfo"));
    if (notification) {
        notification.reset();
    }
};

commerce.CartInfoWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.CartInfoWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.CartInfoWidget.id);
};

literatum.widgets.register(commerce.CartInfoWidget);
