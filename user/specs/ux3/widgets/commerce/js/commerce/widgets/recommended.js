commerce.RecommendedWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
    this.register(commerce.cart.identity);
    this.register(commerce.cart.buyingList);
    this.register(commerce.cart.savedItems);
};

commerce.RecommendedWidget.prototype = new literatum.Widget();

commerce.RecommendedWidget.id = 'eCommerceCheckoutRecommendedItemsWidget';
commerce.RecommendedWidget.action = '/pb/widgets/commerce/recommended';

commerce.RecommendedWidget.binders = {
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
    addItem: function (e) {
        if (!$(e.target).parents('.disable-click').length) {
            var loading = new literatum.FullPageLoading();
            loading.start();
            commerce.cart.addCallback(loading.done);
            e.preventDefault();
            var key = $(this).attr("data-key");
            commerce.cart.buyingList.addItem(key);
        }
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
    }
};

commerce.RecommendedWidget.prototype.registerListeners = function () {
    Object.getPrototypeOf(commerce.RecommendedWidget.prototype).registerListeners.call(this);
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


commerce.RecommendedWidget.find = function () {
    var $result = $("*[widget-def='" + commerce.RecommendedWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + commerce.RecommendedWidget.id);
};

literatum.widgets.register(commerce.RecommendedWidget);
