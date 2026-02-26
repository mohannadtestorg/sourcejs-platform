commerce.CartIndicatorWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
};

commerce.CartIndicatorWidget.prototype = new literatum.Widget();

commerce.CartIndicatorWidget.id = 'eCommerceCartIndicatorWidget';
commerce.CartIndicatorWidget.action = null;

commerce.CartIndicatorWidget.prototype.update = function (model) {
    var $cartSize = this.find("*[data-id='cart-size']");
    if (model.size == 0) {
        $cartSize.hide();
        $cartSize.html(model.size);
    } else {
        $cartSize.show("hidden");
        $cartSize.html(model.size);
    }
};

commerce.CartIndicatorWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.CartIndicatorWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.CartIndicatorWidget.id);
};

literatum.widgets.register(commerce.CartIndicatorWidget);
