commerce.BuyingItemWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.discounts);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.summary);
};

commerce.BuyingItemWidget.prototype = new literatum.Widget();

commerce.BuyingItemWidget.id = 'eCommerceCheckoutBuyingItemsWidget';
commerce.BuyingItemWidget.action = '/pb/widgets/commerce/buyingItems';

commerce.BuyingItemWidget.notifications = {
    info: commerce.Notification
};

commerce.BuyingItemWidget.binders = {
    applyDiscount: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.discounts.apply(widget.find("input[name='discount']").val());
    },
    removeDiscount: function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.discounts.remove($(this).data('discount'));
    },
    disableDiscount: function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.discounts.disable($(this).data('discount'));
    },
    enableDiscount: function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.discounts.enable($(this).data('discount'));
    },
    saveItem: function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var itemId = $(this).data("item-id");
        if (itemId) {
            commerce.cart.savedItems.saveById(itemId);
        } else {
            commerce.cart.savedItems.saveByDoi($(this).data("item-doi"));
        }
    },
    removeItem: function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.buyingList.remove($(this).data("item-id"));
    },
    increaseQuantity: function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.buyingList.increaseQuantity($(this).data("item-id"));
    },
    decreaseQuantity: function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.buyingList.decreaseQuantity($(this).data("item-id"));
    }
};

commerce.BuyingItemWidget.prototype.reset = function () {
    Object.getPrototypeOf(commerce.BuyingItemWidget.prototype).reset.call(this);
    this.find("input[name='discount']").removeClass("errorMsg");
    this.find(".promoCodeMsg .errorMsg").hide();
    this.find(".promoCodeMsg .infoMsg").hide();
};

commerce.BuyingItemWidget.infoHandlers = {
    discountError: function (message, widget) {
        widget.find(".promoCodeMsg .infoMsg").hide();
        widget.find("input[name='discount']").addClass("errorMsg");
        var $error = widget.find(".promoCodeMsg .errorMsg");
        $error.html(message);
        $error.show();
    },
    discountInfo: function (message, widget) {
        widget.find(".promoCodeMsg .errorMsg").hide();
        widget.find("input[name='discount']").removeClass("errorMsg");
        var $info = widget.find(".promoCodeMsg .infoMsg");
        $info.html(message);
        $info.show();
    },
    discount: function (message, widget) {
        $(widget.find("input[name='promoCode']")).val(message);
    },
    savedItemError: function (message, widget) {
        var notification = widget.getNotification('info');
        if (notification) {
            notification.error();
            notification.setMessage(message);
            notification.show();
        }
    },
    error: function (message, widget) {
        var notification = widget.getNotification('info');
        if (notification) {
            notification.error();
            notification.setMessage(message);
            notification.show();
        }
    }
};

commerce.BuyingItemWidget.prototype.registerListeners = function () {
    Object.getPrototypeOf(commerce.BuyingItemWidget.prototype).registerListeners.call(this);

    var widget = this;

    var $applyButton = this.find("#applyDiscountForm input.applyDiscount");
    var $discountField = this.find("input[name='discount']");

    $discountField.on('keyup', function () {
        if ($discountField.val()) {
            $applyButton.addClass('primary');
            $applyButton.prop('disabled', false);
        } else {
            $applyButton.removeClass('primary');
            $applyButton.prop('disabled', true);
            widget.find(".promoCodeMsg .errorMsg").hide();
            widget.find("input[name='discount']").removeClass("errorMsg");
            var $info = widget.find(".promoCodeMsg .infoMsg");
            $info.html(message);
            $info.show();
        }
    });
};

commerce.BuyingItemWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.BuyingItemWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.BuyingItemWidget.id);
};

literatum.widgets.register(commerce.BuyingItemWidget);
