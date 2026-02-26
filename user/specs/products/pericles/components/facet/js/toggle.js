UX.toggle.control = function () {

    $('body').on('click', '.facet .show-more', function (e) {
        e.preventDefault();
        UX.toggle.on.toggle($(this));
        $(this).closest(".accordion__content").find('li:nth-child(6) a').focus();
    });

    $('body').find('.facet .dropdown__toggle').off();

    $('body').on('click', '.facet .facet__toggle', function (e) {
        e.preventDefault();
        $(this).toggleClass('icon-add_box icon-squared-minus')
        UX.toggle.on.toggleFacet($(this).siblings('.dropdown__toggle'));
    });
};
