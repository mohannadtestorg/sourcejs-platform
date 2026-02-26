commerce.PurchaseOptionsWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.savedItems);
    this.register(commerce.cart.buyingList);
    var $obj = this.find(".scroll-into-view").closest(".purchaseArea");
    if ($obj && $obj.length > 0) {
        literatum.utils.scroll($obj, 1000, 50);
        this.find("*[data-bind='expandSection']").click();
    }
};

commerce.PurchaseOptionsWidget.prototype = new literatum.Widget();

commerce.PurchaseOptionsWidget.id = 'eCommercePurchaseAccessWidget';
commerce.PurchaseOptionsWidget.action = '/pb/widgets/commerce/purchaseOptions';

commerce.PurchaseOptionsWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.PurchaseOptionsWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.PurchaseOptionsWidget.id);
};

commerce.PurchaseOptionsWidget.binders = {
    saveItem: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var key = $(this).attr("data-doi");
        commerce.cart.savedItems.saveByDoi(key);
    },
    addItem: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        var key = $(this).attr("data-key");
        commerce.cart.buyingList.addItem(key);
    },
    expandSection: function (e, widget) {
        e.preventDefault();
        // TODO: UI Review if all of this still needed
        widget.find('.purchaseAreaList_expanded').slideUp();
        widget.find('.purchaseAreaList_expand').attr("aria-expanded", false);
        if ($(e.target).hasClass('active')) {
            $(e.target).removeClass('active');
            $(e.target).siblings('.purchaseAreaList_expanded').slideUp();
            $(e.target).attr("aria-expanded", false);
        } else {
            $(e.target).addClass('active');
            widget.find(".purchaseAreaList_expand").not($(e.target)).removeClass('active');
            $(e.target).siblings('.purchaseAreaList_expanded').slideDown();
            $(e.target).attr("aria-expanded", true);
        }
    }
};


commerce.PurchaseOptionsWidget.prototype.update = function (model) {
    // no need to update this widget's view, only trigger info handlers
    this.triggerInfoHandlers(this, model);
    this.loaded();
};


commerce.PurchaseOptionsWidget.infoHandlers = {
    info: function (message, widget, model) {
        var key = model.attributes['itemAdded'];
        var notification = commerce.Notification.get(widget.find(".purchaseMessage[data-item='" + key + "']"));
        if (notification) {
            notification.setMessage(message);
            notification.info();
            notification.show();
        }
        $(widget.find("*[data-entity='" + key + "']")).hide();
    },
    error: function (message, widget, model) {
        var key = model.attributes['itemAdded'];
        var notification = commerce.Notification.get(widget.find(".purchaseMessage[data-item='" + key + "']"));
        if (notification) {
            notification.setMessage(message);
            notification.error();
            notification.show();
        }
        $(widget.find("*[data-entity='" + key + "']")).hide();
    },
    savedItemInfo: function (message, widget) {
        var notification = commerce.Notification.get(widget.find(".savedItem-info"));
        if (notification) {
            notification.setMessage(message);
            notification.info();
            notification.show();
        }
        $(widget.find(".save-for-later-link")).hide();
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

literatum.widgets.register(commerce.PurchaseOptionsWidget);