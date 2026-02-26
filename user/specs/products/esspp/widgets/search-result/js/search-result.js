
    UX.searchResult.additionalInit = function () {

        var accordionWidth= $('.meta__footer .accordion__control').width();
        if(accordionWidth>0){
            $('.meta__extraLinks').css('left',accordionWidth)
        }
    };
