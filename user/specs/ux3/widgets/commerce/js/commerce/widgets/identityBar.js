commerce.IdentityBarWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
};

commerce.IdentityBarWidget.prototype = new literatum.Widget();

commerce.IdentityBarWidget.id = 'literatumNavigationLoginBar';
commerce.IdentityBarWidget.action = '/pb/widgets/commerce/identityBar';

commerce.IdentityBarWidget.binders = {
    expand: function (e, widget) {
        widget.find(".navigation-login-dropdown-container").toggle();
    }
};

commerce.IdentityBarWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.IdentityBarWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.IdentityBarWidget.id);
};

literatum.widgets.register(commerce.IdentityBarWidget);
