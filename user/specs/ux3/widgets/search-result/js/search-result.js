(function () {
    var $window = $(window),
        isMobile = false,
        $body = $('body');

    var searchResult = {
        url: location.href,
        init: function(){
            //searchResult.get.url();
            searchResult.control();
            searchResult.additionalInit();
            searchResult.additionalControl();
            searchResult.set.userPublicationLayout();
        },
        control: function () {
            $body.on('click', '#saveSearchTriggerButton', function () {
                searchResult.openSaveSearchDialog();
            });

            $body.on('submit', '#saveSearchDialog form', function (event) {
                return searchResult.onSaveSearchSubmitHandler(event);
            })

            $body.on('click', '.search__layout>span', function () {

                $(".search__layout>span").removeClass('active');
                $(this).addClass('active');

                if($(this).hasClass('search__layout-tile')){
                    $(".search-result__body").addClass('search-result--tile');
                    localStorage.setItem("userPublicationLayout", "tile");
                }
                else{
                    $(".search-result__body").removeClass('search-result--tile');
                    localStorage.setItem("userPublicationLayout", "list");
                }
            });


        },
        additionalControl: function () {
        },
        additionalInit: function () {
        },
        set:{
            userPublicationLayout:function () {
              if (localStorage.userPublicationLayout=="tile") {
                  $('.search__layout-tile').click();
              }
              else if (localStorage.userPublicationLayout=="list"){
                  $('.search__layout-list').click();
              }
          }
        },
        get: {
            url: function(){

            },
            text: function(name){
                name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
                var regexS = "[\\?&]"+name+"=([^&#]*)";
                var regex = new RegExp( regexS );
                var results = regex.exec( searchResult.url );
                return results == null ? null : results[1];
            },
            value: function(){
                $('.refineSearch').find('input').each(function(){
                    if(this.attr('type'=='text')) {

                    }
                })
            }
        },
        openSaveSearchDialog: function(){

            var openDialog = searchResult.getCookie("openDialog");
            if(openDialog != null && openDialog != ""){
                var saveSearchButton = $('#saveSearchTriggerButton');
                if(saveSearchButton.length > 0){
                    document.cookie="openDialog=;expires=Wed; 01 Jan 1970";
                    saveSearchButton.click();
                }
            }
        },
        getCookie: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(nameEQ) != -1) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },
        onSaveSearchSubmitHandler : function(e){
            $('#newSearchSaveButton').hide();
            $('.saveSearchProgress').show();
            $.ajax({
                type: "POST",
                url: "/action/doSaveSearch",
                data:  $(e.target).serialize(),
                success: searchResult.saveSearchSuccessHandler,
                error: function(data){
                    $('.error.saveSearchMsg').show('fade');
                    $('#newSearchSaveButton').show();
                    $('.saveSearchProgress').hide();
                    $('#saveSearchDialog').modal('toggle');
                }
            });
            return false;
        },
        saveSearchSuccessHandler : function(data){
            $('.success.saveSearchMsg').show('fade');
            $('#newSearchSaveButton').show();
            $('.saveSearchProgress').hide();
            $('#saveSearchDialog').modal('toggle');
            UX.modal.on.hide();
            searchResult.redrawSavedSearchesPanel(JSON.parse(data).favQueries);
        },
       redrawSavedSearchesPanel: function(jsonData){
            var savedSearchesPanel = $('.advancedSearch__tabs .saved-searches');
            var numOfMaxSavedSearches = $(savedSearchesPanel).data('queries');
            for(var i=0; i < numOfMaxSavedSearches; i++){
                if(jsonData[i] !=undefined){
                    var item = $(savedSearchesPanel).find('tbody tr')[i];
                    $(item).find('td:first-child').html(jsonData[i]["qName"]);
                    var goLink = "/action/doSearch?target=saved&runSaved=" + jsonData[i]["qId"];
                    $(item).find('[title="Run"]').attr('href',goLink);
                    var removeLink = "/action/doDeleteSearch?queryId=" + jsonData[i]["qId"] + "&searchType=saved";
                    $(item).find('[title="Delete"]').attr('href',removeLink);

                    if($(item).hasClass('hidden')){
                        $(item).removeClass('hidden');
                        $('.table-responsive').parent().removeClass('hidden');
                        $('.emptySavedSearches').remove();
                        //$(item).addClass('search-entry-row');
                    }
                }

            }
        }
    };
    UX.searchResult = searchResult; // add to global namespace
})();