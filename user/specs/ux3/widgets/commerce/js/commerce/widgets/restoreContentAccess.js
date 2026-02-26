commerce.RestoreAccessWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.restoreAccess);
};

commerce.RestoreAccessWidget.prototype = new literatum.Widget();

commerce.RestoreAccessWidget.id = 'eCommerceRestoreContentAccessWidget';
commerce.RestoreAccessWidget.action = '/pb/widgets/commerce/restoreAccess';

commerce.RestoreAccessWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.RestoreAccessWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.RestoreAccessWidget.id);
};

commerce.RestoreAccessWidget.binders = {
    request: function (e, widget) {
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(loading.done);
        e.preventDefault();
        commerce.cart.restoreAccess.request(widget.find("input[name='email']").val());
    }
};

commerce.RestoreAccessWidget.prototype.update = function (model) {
    // no need to update this widget's view, only trigger info handlers
    this.triggerInfoHandlers(this, model);
    this.loaded();
};

commerce.RestoreAccessWidget.infoHandlers = {
    restoreError: function (message, widget) {
        widget.find('.restore-info').hide();
        widget.find('.restore-error').hide();
        var notification = commerce.Notification.get(widget.find(".restore-error"));
        notification.setMessage(message);
        notification.error();
        notification.show();
    },
    error: function (message, widget) {
        widget.find('.restore-info').hide();
        var $inputGroup = widget.find("input[name='email']").closest(".input-group");
        var notification = commerce.FieldNotification.get($inputGroup);
        if (notification) {
            notification.error();
            notification.setMessage(message);
            notification.show();
        }
    },
    info: function (message, widget) {
        widget.find('.restore-error').hide();
        var $inputGroup = widget.find("input[name='email']").closest(".input-group");
        var notification = commerce.Notification.get(widget.find(".restore-info"));
        var fieldNotification = commerce.FieldNotification.get($inputGroup);
        if (fieldNotification) {
            fieldNotification.reset();
            fieldNotification.hide();
        }
        if (notification) {
            notification.setMessage(message);
            notification.info();
            notification.show();
        }
    }
};

literatum.widgets.register(commerce.RestoreAccessWidget);
