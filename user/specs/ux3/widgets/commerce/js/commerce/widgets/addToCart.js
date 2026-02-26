commerce.AddToCartWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.buyingList);
};

commerce.AddToCartWidget.prototype = new literatum.Widget();

commerce.AddToCartWidget.id = 'eCommerceCheckoutAddToCartWidget';
commerce.AddToCartWidget.action = '/pb/widgets/commerce/addToCart';

commerce.AddToCartWidget.binders = {
    expand: function (e, widget) {
        e.preventDefault();
        if (widget.find(".add-journal-to-cart-container").length > 0) {
            var addToCart = document.createElement('div');
            $(addToCart).addClass('eCommerceCheckoutAddToCartWidgetExpanded');
            $(addToCart).appendTo('body');
            $('body').css('overflow', 'hidden');
            widget.find(".add-journal-to-cart-container").clone().prepend('<a href="#" class="close float-right"><i class="icon-close_thin"></i></a>').appendTo(addToCart).slideToggle().find("a").first().focus();
            var overlay = document.createElement('div');
            $(overlay).addClass('overlay-fixed');
            $(overlay).appendTo('.eCommerceCheckoutAddToCartWidgetExpanded');
            $(overlay).find("a").first().focus();
        }
        widget.registerListeners();
    },
    addItem: function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var key = $(this).attr("data-key");
        commerce.cart.buyingList.addItem(key);
    }
};

commerce.AddToCartWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.AddToCartWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.AddToCartWidget.id);
};

commerce.AddToCartWidget.infoHandlers = {
    info: function (message, widget, model) {
        var key = model.attributes['itemAdded'];
        var notification = commerce.Notification.get($(".eCommerceCheckoutAddToCartWidgetExpanded .purchaseMessage[data-item='" + key + "']"));
        if (notification) {
            notification.setMessage(message);
            notification.info();
            notification.show();
        }
        $(".eCommerceCheckoutAddToCartWidgetExpanded *[data-entity='" + key + "']").hide();
    },
    error: function (message, widget, model) {
        var key = model.attributes['itemAdded'];
        var notification = commerce.Notification.get($(".eCommerceCheckoutAddToCartWidgetExpanded .purchaseMessage[data-item='" + key + "']"));
        if (notification) {
            notification.setMessage(message);
            notification.error();
            notification.show();
        }
        $(".eCommerceCheckoutAddToCartWidgetExpanded *[data-entity='" + key + "']").hide();
    },
    savedItemInfo: function (message, widget) {
        var notification = commerce.Notification.get(widget.find(".savedItem-info"));
        if (notification) {
            notification.setMessage(message);
            notification.info();
            notification.show();
        }
        $(".eCommerceCheckoutAddToCartWidgetExpanded .save-for-later-link").hide();
    },
    savedItemError: function (message, widget) {
        var notification = commerce.Notification.get(widget.find(".savedItem-info"));
        if (notification) {
            notification.setMessage(message);
            notification.error();
            notification.show();
        }
    },
    nextAction: function (message) {
        if (message == 'refreshPage') {
            setTimeout(function () {
                location.reload();
            }, 5000);
        }
    }
};

commerce.AddToCartWidget.prototype.render = function (model, params) {
    params['doi'] = this.find("a[data-doi]").attr("data-doi");
    Object.getPrototypeOf(commerce.AddToCartWidget.prototype).render.call(this, model, params);
};

commerce.AddToCartWidget.prototype.registerListeners = function () {

    Object.getPrototypeOf(commerce.AddToCartWidget.prototype).registerListeners.call(this);

    $(document).on('click', function (event) {
        if (!$(event.target).closest('.eCommerceCheckoutAddToCartWidgetExpanded').length && !$(event.target).closest('.eCommerceCheckoutAddToCartWidget').length && $('.eCommerceCheckoutAddToCartWidgetExpanded').is(':visible')) {
            event.preventDefault();
            $('.eCommerceCheckoutAddToCartWidgetExpanded').remove();
            $('body').css('overflow', 'auto');
        }
    });

    $(document).on('click', '.eCommerceCheckoutAddToCartWidgetExpanded .close', function () {
        $('.eCommerceCheckoutAddToCartWidgetExpanded').remove();
        $('body').css('overflow', 'auto');
    });
    // FIXME: this is a workaround because of how currently the content of this widget is being copied
    // FIXME: which ruins how this widget works.

    $(".eCommerceCheckoutAddToCartWidgetExpanded *[data-bind='addItem']").off();

    $(".eCommerceCheckoutAddToCartWidgetExpanded *[data-bind='addItem']").click(function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var key = $(this).attr("data-key");
        commerce.cart.buyingList.addItem(key);
    });
};

literatum.widgets.register(commerce.AddToCartWidget);
