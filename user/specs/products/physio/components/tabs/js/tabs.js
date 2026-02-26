UX.tab.additionalControl = function() {
    var $featuredCont = $('.slashed__tabs__nav'),
        $arrows = "<li class=\"arrows-slide\"><i class=\"icon-arrow_l prev\"></i> <i class=\"icon-arrow_r next\"></i></li>";
    $('.tab').addClass("tab--res");
    if($featuredCont.find('.tab--res').length > 0) {
        $featuredCont.find('.tab__nav li:not(.active)').hide();
        $featuredCont.find('.tab__nav').append($arrows);
        $('.arrows-slide .next').click(function(e) {
            $activeNav = $(this).closest('.tab__nav').find('.active');
            $activeNavLi = $(this).closest('.tab').find(".tab__content li.active");
            if($activeNav.next().not(".arrows-slide").length > 0){
                $activeNav.removeClass('active').next().not(".arrows-slide").addClass('active').show();
                $activeNavLi.removeClass('active').next().addClass('active');
            }
        });
        $('.arrows-slide .prev').click(function(e){
            $activeNav = $(this).closest('.tab__nav').find('.active');
            $activeNavLi = $(this).closest('.tab').find(".tab__content li.active");
            if($activeNav.prev().not(".arrows-slide").length > 0){
                $activeNav.removeClass('active').prev().addClass('active').show();
                $activeNavLi.removeClass('active').prev().addClass('active');
            }
        });
    }
};