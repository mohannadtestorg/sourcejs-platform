UX.sticko.get.fixedpageElementsHeight=function () {
    var elementsHeight= 0;

    if($('.fixed-element').length){
        $.each($('.fixed-element'), function( index, value ) {
            if($(value).outerHeight()){
                elementsHeight+=$(value).outerHeight();
            }
        });
    }
    return elementsHeight;
}


UX.sticko.forceDisableMobileSticky=function () {
    UX.sticko.forceDisableMobileSticky=true;
}