commerce.SavedItemsWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
};

commerce.SavedItemsWidget.prototype = new literatum.Widget();

commerce.SavedItemsWidget.id = 'eCommerceCheckoutSavedForLaterItemsWidget';
commerce.SavedItemsWidget.action = '/pb/widgets/commerce/savedItems';

commerce.SavedItemsWidget.notifications = {
    info: commerce.Notification
};

commerce.SavedItemsWidget.binders = {
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
    removeSavedItem: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.savedItems.remove($(this).data("item-id"));
    },
    expand: function (e) {
        e.preventDefault();
        $(this).closest(".add-to-cart").toggleClass("opened");
        var offerVisibility = $(this).next(".purchaseArea").is(':visible');
        $(".purchaseArea").slideUp();
        if (!offerVisibility) {
            $(this).next(".purchaseArea").slideToggle();
            var subject = $(".demo");
            if (e.target.id != subject.attr('id')) {
                subject.show();
            }
        }
    },
    addItem: function (e, widget) {
        if (!$(e.target).parents('.disable-click').length) {
            var loading = new literatum.FullPageLoading();
            loading.start();
            commerce.cart.addCallback(loading.done);
            e.preventDefault();
            var key = $(this).attr("data-key");
            commerce.cart.buyingList.addItem(key);
        }
    }
};

commerce.SavedItemsWidget.prototype.registerListeners = function () {
    Object.getPrototypeOf(commerce.SavedItemsWidget.prototype).registerListeners.call(this);
    if ($(window).width() >= 992) {
        $(document).on('touchend click', function (e) {
            var container = $(".demoContainer");
            if (!$(e.target).closest('.superDemo').length) {
                $(".add-to-cart.opened").removeClass("opened");
                container.hide();
                container.find('.add-journal-to-cart').removeClass('disable-click');
                container.find('.add-journal-to-cart header').removeClass('open');
                container.find('.journal-options-expanded').hide();
                container.find('.add-journal-to-cart').css('margin-bottom', '10px');
                e.stopPropagation();
            }
        });
    }
};

commerce.SavedItemsWidget.infoHandlers = {
    savedItemError: function (message, widget) {
        var notification = widget.getNotification('info');
        if (notification) {
            notification.setMessage(message);
            notification.error();
            notification.show();
        }
    }
};


commerce.SavedItemsWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.SavedItemsWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.SavedItemsWidget.id);
};

literatum.widgets.register(commerce.SavedItemsWidget);
