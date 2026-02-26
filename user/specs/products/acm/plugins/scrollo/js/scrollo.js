(function () {

    UX.scrollo.adjustAnchor= function () {
            var $anchor = $(':target');
            var fixedElementsHeigh =UX.scrollo.get.fixedpageElementsHeight()+10;

            if ($anchor.length > 0)
            {
                $('html, body').animate({
                    scrollTop:  $anchor.offset().top  - fixedElementsHeigh
                }, 50);
            }

        }

})();