(function(){
    var dimensionsFn = UX.dropBlock.find.dimensions;

    function dimensions() {
        if(UX.dropBlock.$parent[0].classList.contains('header')) {
            var styles = {
                top: '39px',
                left: "0px",
                width: '100%'
            };

            UX.dropBlock.$target.css(styles);
        }else {
            dimensionsFn();
        }
    }

    UX.dropBlock.find.dimensions = dimensions;
})();