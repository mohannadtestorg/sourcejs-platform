UX.pageBody.on.setContentTopPadding=function () {
    $("header .header--first-row .pull-left").height($("header .header--first-row .pull-right").height());
    $('main.content').css('padding-top',  $(".header").css("position") == "fixed" ? $('.header.fixed').height() : "0px" );
    return true;
}

