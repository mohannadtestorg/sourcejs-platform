(function () {
    UX.loader.getContent = function(){ // get content using ajax request
        $('.tab__spinner').show(); // show spinner pane

        var loadUrl="/specs/ux3/widgets/publication-content/ajax/figures.html";

        if((UX.loader.target.indexOf("pane-pcw-references") >= 0)){
            loadUrl="/specs/ux3/widgets/publication-content/ajax/references.html";
        }

        $(UX.loader.target).load( loadUrl, function( response, status, xhr ){


            if ( status == "error" ) {
                var msg = "Sorry but there was an error: ";
                console.log( msg + xhr.status + " " + xhr.statusText );
            }
            $('.tab__spinner').hide(); // hide spinner pane
            $(UX.loader.target).removeClass("empty");
            UX.loader.attach();
            $(UX.loader.target).trigger('content-loaded');
        });
    }
})();