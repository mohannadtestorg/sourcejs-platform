(function () {

    UX.loi.addtionalControls = function () {
        if ($('[data-issues-group-by]').length) {
            UX.loi.on.groupIssues();
        }
    };

    UX.loi.on.groupIssues = function () {
        var issuesGroups = $('ul[data-issues-group-by]');
        issuesGroups.each(function () {
            var issuesGroup = $(this);
            issuesGroup.find("li[data-cover-date]").each(function () {
                var issue = $(this);
                var coverDate = issue.data("cover-date");

                if (!issuesGroup.find(".parent__group__container").length)
                    var parent = $( "<li class='parent__group__container'></li>" ).appendTo( issuesGroup );

                if (!$( "ul[data-month-group='"+coverDate+"']" ).length)
                    $( "<ul class='col-xs-12 col-sm-12 col-md-6 col-lg-4' data-month-group='"+coverDate+"'><li><p class='tab__item__title'>"+coverDate+"</p></li></ul>" ).appendTo( issuesGroup.find(".parent__group__container") );

                $(issue).appendTo( $("ul[data-month-group='"+coverDate+"']") );
            });
        });
    };

})();
