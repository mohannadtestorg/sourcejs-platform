(function () {
    var $body = $('body'),
        $document = $(document);


    var authorIndex = {
        init: function () {
            authorIndex.on.build();           
        },
     
        on: {
            build: function () {

                //author-index__filters
                var selectedletter=authorIndex.get.letter("alphabetRange");
                if(selectedletter && selectedletter!=null)
                   $(".author-index__filters .alphanumeric-title[title="+selectedletter+"]").addClass('is--selected');

                var $alpha_letters = $('#alphaFace .is--selected');
                $alpha_letters.each(function () {
                      $(".author-index__alphanumeric").append("<span class='letter'>"+ $(this).text() +"</span>");

                });
            },
          
        },
        get:{
            letter: function(name){
                name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
                var regexS = "[\\?&]"+name+"=([^&#]*)";
                var regex = new RegExp( regexS );
                var results = regex.exec(location.href );
                return results == null ? null : results[1];

            }
        }
    };

    UX.authorIndex = authorIndex; // add to global namespace
})();
