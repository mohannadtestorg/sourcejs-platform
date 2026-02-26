$(document).ready(function () {

    if ($('.colors-palette').length) {

        $.each($(".rlist--inline.bg-colors li"), function (index, value) {
            var backgroundColor = rgb2hex($(value).find('.block').css("background-color"));
            $(value).append('<p> [' + backgroundColor + ']</p>')

        });

        $.each($(".rlist--inline.text-colors li"), function (index, value) {
            var color = rgb2hex($(value).find('.block').css("color"));
            $(value).append('<p> [' + color + ']</p>')

        });

        $.each($(".rlist--inline.border-colors li"), function (index, value) {
            var color = rgb2hex($(value).find('> div').css("border-top-color"));
            $(value).append('<p> [' + color + ']</p>')
        });
    }

    function rgb2hex(rgb) {
        var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if(colors){
            return "#" + hex(colors[1]) + hex(colors[2]) + hex(colors[3]);
        }
        else{
            return rgb;
        }

    }

    function hex(x) {
        var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }


});




