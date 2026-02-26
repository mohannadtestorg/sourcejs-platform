commerce.cart = (function () {
    var instance = {};
    var cartInfo;
    var listeners = {};
    var callbacks = [];
    var errorHandler;

    function triggerRefresh(updatedCartInfo) {
        console.log("Trying to refresh current cart state...");

        Object.keys(listeners).forEach(function (key) {
            commerce.cart.notify(key, updatedCartInfo);
        });

        cartInfo = updatedCartInfo;
    }

    instance.refresh = function () {
        literatum.utils.send({
            action: 'showCart'
        }, triggerRefresh, errorHandler);
    };

    instance.identity = {
        name: 'identity',
        guest: function (email) {
            literatum.utils.send({
                action: 'guestCheckout',
                email: email
            }, commerce.cart.identity.refresh, errorHandler);
        },
        login: function (email, password) {
            literatum.utils.send({
                action: 'doLogin',
                email: email,
                password: password
            }, commerce.cart.identity.refresh, errorHandler);
        },
        registration: function (email) {
            literatum.utils.send({
                action: 'register',
                email: email
            }, commerce.cart.identity.refresh, errorHandler);
        },
        clear: function () {
            literatum.utils.send({
                action: 'resetCartAction'
            }, commerce.cart.identity.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.identity, cartInfo);
        },
        changed: function (updatedCartInfo) {
            return (cartInfo == null || cartInfo.identityHash != updatedCartInfo.identityHash);
        }
    };

    instance.buyingList = {
        name: 'buyingList',
        addItem: function (itemId) {
            literatum.utils.send({
                action: 'addToCart',
                id: itemId
            }, commerce.cart.buyingList.refresh, errorHandler);
        },
        remove: function (itemId) {
            literatum.utils.send({
                action: 'removeCartItem',
                id: itemId
            }, commerce.cart.buyingList.refresh, errorHandler);
        },
        decreaseQuantity: function (itemId) {
            literatum.utils.send({
                action: 'decreaseQuantity',
                id: itemId
            }, commerce.cart.buyingList.refresh, errorHandler);
        },
        increaseQuantity: function (itemId) {
            literatum.utils.send({
                action: 'increaseQuantity',
                id: itemId
            }, commerce.cart.buyingList.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.buyingList, cartInfo);
        },
        changed: function (updatedCartInfo) {
            return (cartInfo == null || cartInfo.buyingItemHash != updatedCartInfo.buyingItemHash);
        }
    };

    instance.restoreAccess = {
        name: 'restoreAccess',
        request: function (email) {
            literatum.utils.send({
                action: 'restoreContentAccess',
                email: email
            }, commerce.cart.restoreAccess.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.restoreAccess, cartInfo);
        },
        changed: function (updatedCartInfo) {
            return true;
        }
    };

    instance.discounts = {
        name: 'discounts',
        apply: function (discountCode) {
            literatum.utils.send({
                action: 'applyDiscount',
                discount: discountCode
            }, commerce.cart.discounts.refresh, errorHandler);
        },
        remove: function (discountCode) {
            literatum.utils.send({
                action: 'removeDiscount',
                discount: discountCode
            }, commerce.cart.discounts.refresh, errorHandler);
        },
        enable: function (discountCode) {
            literatum.utils.send({
                action: 'enableDiscount',
                discount: discountCode
            }, commerce.cart.discounts.refresh, errorHandler);
        },
        disable: function (discountCode) {
            literatum.utils.send({
                action: 'disableDiscount',
                discount: discountCode
            }, commerce.cart.discounts.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.discounts, cartInfo);
        },
        changed: function (updatedCartInfo) {
            return (cartInfo == null || cartInfo.cartHash != updatedCartInfo.cartHash);
        }
    };

    instance.summary = {
        name: 'summary',
        refresh: function () {
            commerce.cart.notify(commerce.cart.summary, cartInfo);
        },
        changed: function (updatedCartInfo) {
            return (cartInfo == null || cartInfo.cartHash != updatedCartInfo.cartHash);
        }
    };

    instance.shipping = {
        name: 'shipping',
        update: function (form) {
            var request = {};
            $.extend(request, {
                action: 'updateShippingAddress'
            }, form);
            literatum.utils.send(request, commerce.cart.shipping.refresh, errorHandler);
        },
        getShippingCosts: function (country, callback) {
            literatum.utils.send({
                action: 'getShippingCosts',
                country: country
            }, callback);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.shipping, cartInfo);
        },
        changed: function (updatedCartInfo) {
            return (cartInfo == null || cartInfo.shippingHash != updatedCartInfo.shippingHash || cartInfo.buyingItemHash != updatedCartInfo.buyingItemHash);
        }
    };

    instance.tax = {
        name: 'tax',
        update: function (form) {
            var request = {};
            $.extend(request, {
                action: 'updateTax'
            }, form);
            literatum.utils.send(request, commerce.cart.tax.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.tax, cartInfo);
        },
        changed: function (updatedCartInfo) {
            return (cartInfo == null || cartInfo.cartHash != updatedCartInfo.cartHash);
        }
    };

    instance.billing = {
        name: 'billing',
        update: function (form) {
            var request = {};
            $.extend(request, {
                action: 'updateBillingAddress'
            }, form);
            literatum.utils.send(request, commerce.cart.billing.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.billing, cartInfo);
        },
        changed: function (updatedCartInfo) {
            return (cartInfo == null || cartInfo.billingHash != updatedCartInfo.billingHash);
        }
    };

    instance.savedItems = {
        name: 'savedItems',
        saveById: function (itemId) {
            literatum.utils.send({
                action: 'saveItem',
                id: itemId
            }, commerce.cart.savedItems.refresh, errorHandler);
        },
        saveByDoi: function (doi) {
            literatum.utils.send({
                action: 'saveItem',
                doi: doi
            }, commerce.cart.savedItems.refresh, errorHandler);
        },
        remove: function (id) {
            literatum.utils.send({
                action: 'removeSavedItem',
                id: id
            }, commerce.cart.savedItems.refresh, errorHandler);
        },
        refresh: function (cartInfo) {
            commerce.cart.notify(commerce.cart.savedItems, cartInfo);
        },
        changed: function (updatedCartInfo) {
            return (cartInfo == null || cartInfo.savedItemsHash != updatedCartInfo.savedItemsHash);
        }
    };


    instance.register = function (service, callback) {
        console.log("Commerce Cart :: Registering service " + service.name + " listener...");
        if (service) {
            if (!listeners[service.name]) {
                listeners[service.name] = [];
            }
            listeners[service.name].push(callback);
        }
    };
    instance.notify = function (service, updatedCartInfo) {
        if (updatedCartInfo) {
            if (updatedCartInfo.sessionChanged) {
                location.reload();
                return;
            }
        }
        if (updatedCartInfo && cartInfo) {
            if (cartInfo.sessionHash != updatedCartInfo.sessionHash) {
                location.reload();
                return;
            }
        }

        var result = [];

        console.log("Commerce Cart :: Notifying " + service.name + " listeners...");
        if (service && service.changed && service.changed(updatedCartInfo) || literatum.utils.hasAttributes(updatedCartInfo.attributes)) {
            if (listeners[service.name]) {
                listeners[service.name].forEach(function (listener) {
                    var value = listener(updatedCartInfo);
                    result.push(value);
                });
            }
        }

        var clone = callbacks;

        $.when.apply($, result).then(function () {
            clone.forEach(function (callback) {
                callback();
            });
        });

        commerce.cart.clearCallbacks();

        if (updatedCartInfo) {
            cartInfo = updatedCartInfo;
        }
    };

    instance.setErrorHandler = function (handler) {
        errorHandler = handler;
    };

    instance.addCallback = function (callback) {
        callbacks.push(callback);
    };

    instance.clearCallbacks = function () {
        callbacks = [];
    };

    return instance;
}());
console.log("Cart Service initialized!");
