$(document).ready(function(){

    jcf.setOptions('Select', {
        wrapNative: false,
        wrapNativeOnMobile: false,
        maxVisibleItems: 5,
        multipleCompactStyle: true
    });

    $('.jcf').not(".Taxonomy__select,.primary__subject").each(function() {
       jcf.replace($(this));
    });

    jcf.setOptions('Select', {
        maxVisibleItems: 12,
    });

    jcf.replace('.Taxonomy__select');

    jcf.setOptions('Select', {
        maxVisibleItems: 10,
    });

    jcf.replace('.primary__subject');

})