UX.favorites.additionalController = function(){

    UX.favorites.pager();

    $('body').on('click', '.delete-item' , function (e) {
        e.preventDefault();
        UX.favorites.favDelete($(this));
    });
};


UX.favorites.favDelete = function ($el) {
    UX.favorites.checkboxCheck($el);

    var form = $el.parents("form");
    // form.attr('action',action);

    var activeTab ="#" + $el.closest("li[role='tabpanel']").attr('id');
    sessionStorage.setItem('activeTab',activeTab );
    form.get(0).submit();
};


UX.favorites.checkboxCheck = function ($el) {
    var $tr = $el.parents('tr'),
        $checkbox = $tr.find('[type="checkbox"]'),
        $jfccheckbox = $tr.find('.jcf-checkbox');

    $checkbox.prop('checked', true);
    $jfccheckbox.addClass('jcf-checked');
};

UX.favorites.pager = function () {
    var pageSize = 3,
        currentPage = 0,
        $tr = $('.favoriteShortlist').find('tbody').find('tr');

    if (pageSize > 0) {
        $tr.each(function (index) {
            if (index % pageSize === 0) {
                currentPage++;
            }
            $(this).attr('data-page',currentPage);
            $(this).data('page',currentPage);
        });
    }
};

