commerce.RedeemAllowanceWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
};

commerce.RedeemAllowanceWidget.prototype = new literatum.Widget();

commerce.RedeemAllowanceWidget.id = 'eCommerceRedeemOfferWidget';
commerce.RedeemAllowanceWidget.action = '/pb/widgets/commerce/redeemAllowance';

commerce.RedeemAllowanceWidget.binders = {
    expand: function (e, widget) {
        e.preventDefault();
        widget.find('.expand-purchase-options').toggleClass('expanded');
        widget.find(".add-allowance").slideToggle();
    }
};

commerce.RedeemAllowanceWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.RedeemAllowanceWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.RedeemAllowanceWidget.id);
};

literatum.widgets.register(commerce.RedeemAllowanceWidget);
