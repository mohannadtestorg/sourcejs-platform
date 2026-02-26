$(document).on('click', '.checkoutStickyBtn .button', function () {
    commerce.page.cart.show();
    literatum.utils.nextCheckoutSection();
});

$(document).on('scroll', function (e) {
    if ($(".checkoutStickyBtn").length) {
        var freezePoint = window.pageYOffset + $(window).height() - 50;
        var parentTop = $(".checkoutStickyBtn").parent().offset().top;
        if (freezePoint >= parentTop) {
            $(".checkoutStickyBtn").addClass("freeze");
        } else {
            $(".checkoutStickyBtn").removeClass("freeze");
        }
    }
});

$(document).on('click touchstart', '.checkoutProcessRightCol .icon-close_thin', function (e) {
    if ($(window).width() < 993 && $('.checkoutProcessRightCol').is(':visible')) {
        $('.checkoutProcessRightCol').toggle();
        $('.checkoutProcessLeftCol').toggle();
        $('.pageHeader').toggle();
        $('.pageFooter').toggle();
        e.preventDefault();
        e.stopPropagation();
    }
});

commerce.page.cart.show = function () {
    if ($(window).width() < 993 && $('.checkoutProcessRightCol').length != 0) {
        $('.checkoutProcessRightCol').toggle();
        $('.checkoutProcessLeftCol').toggle();
        $('.pageHeader').toggle();
        $('.pageFooter').toggle();

        if ($('.checkoutProcessRightCol .icon-close_thin').length == 0)
            $('.eCommerceCheckoutFieldsWidget').before('<div class="clearfix close-btn-container"><a href="#" class="icon-close_thin hidden-lg hidden-md"></a></div>');
    }
};

commerce.page.cart.checkoutButton = function (data) {
    var $leftCol = $('.checkoutProcessLeftCol');
    if (data.size == 0) {
        $leftCol.removeClass('no-buying');
    } else {
        $leftCol.addClass('no-buying');
    }

    if (data.size > 0 && $(window).width() < 993 && $('.checkoutStickyBtn').length == 0 && $leftCol.length) {
        $leftCol.append('<div><div class="checkoutStickyBtn"><input class="button primary" type="button" title="checkout" value="checkout"></div></div>');
    }
    if (!data.size || $(window).width() >= 993) {
        $('.checkoutStickyBtn').remove();
    }
};

commerce.cart.register(commerce.cart.buyingList, commerce.page.cart.checkoutButton);
commerce.cart.register(commerce.cart.savedItems, commerce.page.cart.checkoutButton);
