(function () {
    var scroller = {
        elements: [],
        add: function (selector) {
            if (scroller.elements.indexOf(selector) === -1) {
                console.log("element doesn't exist");
                scroller.elements.push(selector);
                scroller.watch(selector);
            }
            else {
                console.log("element exist");
            }
            return "reached-"+ selector;
        },
        watch: function (selector) {
            $(window).scroll(function () {
                if ($("."+ selector).length > 0) {
                    var top=  $("."+ selector).position();
                    var stickypoint = top.top + $("."+ selector).innerHeight()
                    // console.log(temp);
                    if ($(window).scrollTop() > stickypoint) {
                        $(document).trigger("reached-"+selector);
                    } else {
                        $(document).trigger("not-reached-"+ selector);
                    }
                }
            });
        }
    };

    UX.scroller= scroller;
})();