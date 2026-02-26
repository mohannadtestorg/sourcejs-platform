(function () {

    var $body = $('body');

    var submissionList = {
        submissionList: null,
        $submissionList: null,
        submissionListItem: null,
        $submissionListItem: null,
        selector: null,
        $selector: null,
        doi: null,
        widgets: [],

        init: function(){
            this.submissionList = ".submission-list";
            this.submissionListItem = ".submission-list-item";
            this.selector = ".submission__select";
            this.$submissionList = $(this.submissionList);
            this.$submissionListItems = $(this.submissionListItem);
            this.$selector = $(this.selector);
            this.widgets.push({class:'.pdActionBar',url:'/pb/widgets/preprint/submissionActionBar'});
            this.widgets.push({class:'.pbArticleView',url:'/pb/widgets/preprint/submissionContent'});

            submissionList.controller();
            submissionList.on.change(submissionList.$selector[0]);
        },
        controller: function() {
            $body.on('change', submissionList.selector, function(e) {
                e.preventDefault();
                submissionList.on.change(this);
            });

            submissionList.$submissionList.on('click', submissionList.submissionListItem, function(e) {
                e.preventDefault();
                submissionList.on.click(this);
            });

        },
        on: {
            change: function (el) {
                submissionList.$submissionListItems.hide();
                if (el.value=="")
                    submissionList.$submissionListItems.show();
                else
                    $("[data-category='"+el.options[el.selectedIndex].text+"']").show();
            },
            click: function (el) {
                submissionList.$submissionListItems.removeClass("selected");
                $(el).addClass("selected");
                submissionList.doi = $(el).data('doi');
                submissionList.on.load();
            },
            load: function () {
                submissionList.widgets.forEach(function(widget) {
                    var $widget = $(widget.class);
                    var pbContext = $("[name='pbContext']").attr('content');
                    $.ajax({
                        type: 'GET',
                        url: widget.url,
                        dataType: 'html',
                        data: {
                            doi: submissionList.doi,
                            widgetId: $widget.data("widget-id"),
                            pbContext: pbContext
                        },
                        success: function(html) {
                            $widget.replaceWith(html);
                            if ($widget[0].className == "pdActionBar") {
                                UX.pdActionBar.init();
                                UX.charCounter.init();
                            }
                            if ($widget[0].className == "pbArticleView") {
                                UX.accordion.init();
                            }
                        },
                        error: function() {
                            var html = '<div class="warning-text-color">Oops. Something went wrong!</div>'
                            $widget.replaceWith(html);
                        }
                    });
                });
            }
        }
    };

    UX.submissionList = submissionList; // add to global namespace
})();