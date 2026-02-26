$(document).ready(function () {

    var checkout = location.hash.indexOf("checkout") > -1 || location.href.indexOf('checkout') > -1;

    if (checkout && $(".cartLabel .shopping-cart").html() > 0) {
        commerce.page.cart.show();
    }

    if (checkout) {
        literatum.utils.nextCheckoutSection();
    }

    commerce.page.cart.checkoutButton({size: $(".cartLabel .shopping-cart").html()});

    $(document).on('click', '.add-journal-to-cart header, .add-journal-to-cart .tab-nav a', function (e) {

        if ($(this).parent().hasClass('disable-click')) {
            return false;
        } else {
            $(this).next(".journal-options-expanded").slideToggle();
            $(this).toggleClass("open");
            setTimeout(function () {
                $('.eCommerceCheckoutSavedForLaterItemsWidget .journal-options-expanded,.eCommerceCheckoutRecommendedItemsWidget .journal-options-expanded,.eCommerceCheckoutRecentlyViewedItemsWidget .journal-options-expanded').each(function () {
                    //if ($(this).is(':visible')) {
                    var expandedMargin = $(this).height() + 21;
                    if (expandedMargin > 25 && $(this).is(':visible')) {
                        $(this).closest('.add-journal-to-cart').css('margin-bottom', expandedMargin);
                    } else {
                        $(this).closest('.add-journal-to-cart').css('margin-bottom', '10px');
                    }
                    //}

                });
            }, 400);
            if ($(this).closest('.purchaseArea').css('position') == 'absolute' && !$(e.target).closest('.tab-nav').length) {
                $('.add-journal-to-cart').toggleClass('disable-click');
                $(this).closest('.add-journal-to-cart').toggleClass("disable-click");
            }
        }
        return false;
    });
});

$(document).on("keyup", ".js__verifyAddress input", function (e) {
    var pattern = new RegExp('[PO.]*\\s?B(ox)?.*\\d+', 'i');
    if ($(this).val().match(pattern) && $(this).val().indexOf("PO BOX") != 0) {
        $(this).addClass("error");
        if ($(this).siblings(".errorMsg").length == 0)
            $(this).after("<span class='errorMsg'>PO BOX addresses should start with 'PO BOX'</span>");
    } else {
        $(this).removeClass("error");
        $(this).siblings(".errorMsg").remove();
    }
});

$(window).resize(function () {
    commerce.page.cart.checkoutButton({size: $(".cartLabel .shopping-cart").html()});
});

literatum.events.register('user-action', function () {
    literatum.widgets.all().forEach(function (item) {
        item.reset()
    });
});

literatum.events.register('widget-rendered', function () {
    $(document).Tabs();
});

commerce.cart.setErrorHandler(function () {
    location.reload();
});
