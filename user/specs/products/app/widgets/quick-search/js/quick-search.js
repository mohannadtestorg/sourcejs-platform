
(function () {
    UX.quickSearch.additionalController = function() {
        $('.quick-search__item').on('click', function(e) {
            e.preventDefault();

            $(this).siblings('.quick-search').toggle();
            $(this).toggleClass('active');

            var $loiBanner=$(".loi__banner.loi--res");
            if($loiBanner.length>0){
                if( $(this).hasClass('active'))
                    $loiBanner.css("z-index","0");
                else
                    $loiBanner.css("z-index","10");
            }

        });
    }
})();