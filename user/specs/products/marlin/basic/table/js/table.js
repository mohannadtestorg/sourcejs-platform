
(function () {
    var $body = $('body'),
        $window = $(window),
        $document = $(document),
        isMobile = false; // variable use to determine if responsive mode is on or off

    var stickyTables = {
        $wrapper: $(".table--sticky"),
        $stickyobject:"",
        firstTr:"",
        secondTr:"",
        ths:"",
        tds:"",
        myTables: "",
        init: function(){
            stickyTables.check();
            stickyTables.control();
        },
        control:function(){
            $(document).on('smartResize', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                stickyTables.destroy();
                stickyTables.check();
            });

        },
        check: function () {
            $('.fancyTable table').each(function(){
                var thisTable = $(this);
                if (!thisTable.find("tbody").find("tbody").length) {
                    stickyTables.build(thisTable);
                }
            });
            $(".DTFC_ScrollWrapper").find("table").attr("aria-hidden","true");
            $(".dataTables_scrollBody").find("table").attr("aria-hidden","false");
        },
        build: function (thisTable) {
            if ( $.fn.dataTable.isDataTable( thisTable ) ) {
                stickyTables.myTables = thisTable.DataTable();
            } else {
                if (thisTable.hasClass("fancyTable--header")) {
                    stickyTables.myTables = thisTable.DataTable( {
                        scrollY:        ((60/100)*stickyTables.get.screenHeight())+"px",
                        searching:      false,
                        scrollX:        true,
                        scrollCollapse: true,
                        info:           false,
                        paging:         false,
                        ordering:       false,
                        responsive:     true,
                        sScrollX : "100%"
                    } );
                } else {
                    stickyTables.myTables = thisTable.DataTable( {
                        scrollY:        ((60/100)*stickyTables.get.screenHeight())+"px",
                        searching:      false,
                        scrollX:        true,
                        scrollCollapse: true,
                        info:           false,
                        paging:         false,
                        ordering:       false,
                        responsive:     true
                    } );
                }
            }


        },
        get: {
            screenHeight: function () {
                return $(window).height();
            }
        },
        destroy: function () {
            if (stickyTables.myTables) {
                stickyTables.myTables.destroy();
            }
            stickyTables.check();
        }
    };

    UX.stickyTables = stickyTables; // add to global namespace
})();
