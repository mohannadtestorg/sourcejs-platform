$(document).ready(function () {

    checkMenuItem('#authorBio');
    checkMenuItem('#bookReviews');

    if ($('.menuBook--tab').length) {
        $('.menuBook--tab').find('li:first-child a').click();
    }

    $('.abstract-preview__zoom').fancybox({
        helpers: {
            title: null
        }
    });

});

function checkMenuItem(id) {
    if ($(id+ '-pane').length == 0) {
        $(id).remove()
    }
}

