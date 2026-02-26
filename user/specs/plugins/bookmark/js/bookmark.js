(function () {
    var $window = $(window),
        $body = $('body'),
        $document = $(document);

    var bookmark = {
        init: function(){
            bookmark.control();
        },
        control: function(){

            $body.on('click', '.header__dropzone-bookmark',function () {
                bookmark.add_bookmark();
            });

        },
        add_bookmark: function () {
            if ($window.sidebar && $window.sidebar.addPanel) { // Mozilla Firefox Bookmark
                $window.sidebar.addPanel($document.title, $window.location.href, '');
            } else if ($window.external && ('AddFavorite' in $window.external)) { // IE Favorite
                $window.external.AddFavorite(location.href, $document.title);
            } else if ($window.opera && $window.print) { // Opera Hotlist
                this.title = $document.title;
                return true;
            } else { // webkit - safari/chrome
                alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
            }
        }
    };

    UX.bookmark = bookmark;

})();