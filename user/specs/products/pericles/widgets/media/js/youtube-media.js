//(function () {

var players = $('.yt-player');

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.



window.onYouTubeIframeAPIReady = function () {
    players.each(function () {
        var player_data;
        player_data = $(this);
        var player_id = player_data.attr('id');
        var url = player_data.data('url');
        var autoplay = player_data.data('autoplay');
        var wmode = player_data.data('wmode');
        var videoid = YouTubeGetID(url);

        if (videoid != null) {
            console.log("video id = ", videoid);
        } else {
            console.log("The youtube url is not valid.");
        }
        new YT.Player(player_id, {
            height: '100%',
            width: '100%',
            playerVars: {autoplay: autoplay},
            wmode: wmode,
            videoId: videoid,

        });
    });

}

//get youtube video id
function YouTubeGetID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    }
    else {
        ID = url;
    }
    return ID;
}

//})();
