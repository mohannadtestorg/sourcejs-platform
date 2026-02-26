commerce.IdentityWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
};

commerce.IdentityWidget.prototype = new literatum.Widget();

commerce.IdentityWidget.id = 'eCommerceCheckoutIdentityWidget';
commerce.IdentityWidget.action = '/pb/widgets/commerce/identity';

commerce.IdentityWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.IdentityWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.IdentityWidget.id);
};

commerce.IdentityWidget.notifications = {
    identity: commerce.Notification,
    email: commerce.FieldNotification
};

commerce.IdentityWidget.binders = {
    guest: function (e, widget) {
        e.preventDefault();
        var loading = new literatum.FullPageLoading();
        loading.start();
        commerce.cart.addCallback(literatum.utils.nextCheckoutSection);
        commerce.cart.addCallback(loading.done);
        commerce.cart.identity.guest(widget.find("input[name='email'].user").val());
    },
    showUserLogin: function (e, widget) {
        e.preventDefault();
        var $loginForm = widget.find(".frmLogin");
        var email = widget.find("input[name='email'].user").val();

        widget.find(".checkoutLogin").hide();
        $loginForm.show();
        $loginForm.find("input[name='login']").val(email).focus();
    },
    register: function (e, widget) {
        var email = widget.find("input[name='email'].user").val();
        if (email) {
            e.preventDefault();
            window.location = "/action/registration?email=" + encodeURIComponent(email) + "&redirectUri=" + encodeURIComponent(location.href);
        }
    },
    cancelLogin: function (e, widget) {
        e.preventDefault();
        var notification = widget.getNotification("identity");
        if (notification) {
            notification.reset();
        }
        widget.find(".message.error").remove();
        widget.find(".checkoutLogin").show();
        widget.find(".frmLogin").hide();
    },
    userLogin: function (e) {
        var loading = new literatum.FullPageLoading();
        loading.start();
    },
    resetCart: function (e) {
        //e.preventDefault();
        //commerce.cart.identity.clear();
        var loading = new literatum.FullPageLoading();
        loading.start();
    },
    expand: function (e, widget) {
        widget.find(".checkout-expand").slideToggle();
    }
};

commerce.IdentityWidget.prototype.registerListeners = function () {
    Object.getPrototypeOf(commerce.IdentityWidget.prototype).registerListeners.call(this);

    var $loginInput = this.find(".frmLogin .login");
    var $passwordInput = this.find(".frmLogin .password");
    var $continueButton = this.find(".frmLogin input[type='submit']");

    $continueButton.removeClass("primary");
    $continueButton.prop('disabled', true);

    $loginInput.on('keyup', function () {
        if ($loginInput.val() && $passwordInput.val()) {
            $continueButton.addClass("primary");
            $continueButton.prop('disabled', false);
        } else {
            $continueButton.removeClass("primary");
            $continueButton.prop('disabled', true);
        }
    });

    $passwordInput.on('keyup', function () {
        if ($loginInput.val() && $passwordInput.val()) {
            $continueButton.addClass("primary");
            $continueButton.prop('disabled', false);
        } else {
            $continueButton.removeClass("primary");
            $continueButton.prop('disabled', true);
        }
    });
};


commerce.IdentityWidget.infoHandlers = {
    identityError: function (message, widget) {
        var notification = widget.getNotification("identity");
        if (notification) {
            notification.setMessage(message);
            notification.error();
            notification.show();
        }
    },
    emailError: function (message, widget) {
        var notification = widget.getNotification("email");
        if (notification) {
            notification.error();
            notification.setMessage(message);
            notification.show();
        }
    }
};

literatum.widgets.register(commerce.IdentityWidget);
