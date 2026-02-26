commerce.Notification = function (element) {
    if (element instanceof jQuery) {
        this.$element = element;
    } else {
        this.$element = $(element);
    }
    this.$p = $(this.$element.find("p"));
};

commerce.Notification.dummy = new commerce.Notification("<div></div>");

commerce.Notification.prototype.show = function () {
    this.$element.show();
};

commerce.Notification.get = function (element) {
    return new commerce.Notification(element);
};

commerce.Notification.create = function (element) {
    if (!(element instanceof jQuery)) {
        element = $(element);
    }
    element.html("<p></p>");
    return new commerce.Notification(element);
};

commerce.Notification.prototype.hide = function () {
    this.$element.hide();
};

commerce.Notification.prototype.reset = function () {
    this.$p.removeClass("itemAddedMsgBox");
    this.$p.removeClass("errorMsgBox");
    this.$element.hide();
};

commerce.Notification.prototype.error = function () {
    this.$p.removeClass("itemAddedMsgBox");
    this.$p.addClass("errorMsgBox");
};

commerce.Notification.prototype.warning = function () {
    this.$p.removeClass("itemAddedMsgBox");
    this.$p.addClass("errorMsgBox");
};

commerce.Notification.prototype.info = function () {
    this.$p.removeClass("errorMsgBox");
    this.$p.addClass("itemAddedMsgBox");
};

commerce.Notification.prototype.setMessage = function (message) {
    this.$p.html(message);
};

/////////////////////////////////////////
commerce.FieldNotification = function (element) {
    if (element instanceof jQuery) {
        this.$element = element;
    } else {
        this.$element = $(element);
    }
    this.$message = $(this.$element.find(".message"));
    this.$label = $(this.$element.find(".label"));
    this.$show = $(this.$element.find(".field-info"));
};


commerce.FieldNotification.prototype.show = function () {
    if (this.$message.text().length > 0) {
        this.$show.show();
    } else {
        this.$show.hide();
    }
};

commerce.FieldNotification.get = function (element) {
    return new commerce.FieldNotification(element);
};

commerce.FieldNotification.prototype.hide = function () {
    this.$show.hide();
};

commerce.FieldNotification.prototype.error = function () {
    this.$label.removeClass("warning");
    this.$label.removeClass("info");
    this.$label.addClass("error");
};

commerce.FieldNotification.prototype.warning = function () {
    this.$label.removeClass("error");
    this.$label.removeClass("info");
    this.$label.addClass("warning");
};

commerce.FieldNotification.prototype.info = function () {
    this.$label.removeClass("warning");
    this.$label.removeClass("error");
    this.$label.addClass("info");
};

commerce.FieldNotification.prototype.reset = function () {
    this.hide();
    this.$label.removeClass("warning");
    this.$label.removeClass("error");
    this.$label.removeClass("info");
    this.setMessage("");
};

commerce.FieldNotification.prototype.setMessage = function (message) {
    this.$message.html(message);
};