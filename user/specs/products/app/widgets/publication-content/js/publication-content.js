UX.loader.truncation.linesToShow =2;
UX.loader.additionalController=function () {
    UX.tableViewer.init();
}
UX.loader.figures.figureCaption={};
var tableViewer = {
    holder: $('.article-table-viewer'),
    tables: $('.article-table-holder'),

    init: function () {
        tableViewer.control();
    },
    control: function () {

        tableViewer.tables.each(function (i) {
           $(this).attr('data-order',i);
        });
        $(document).on("click", ".article-table-holder__opener a", function (e) {
            e.preventDefault();
            tableViewer.open(this);
        });
        $(document).on("click", ".article-table-viewer__ctrl a", function (e) {
            e.preventDefault();
            var nextTableOrder;
            if($(this).attr('data-nav') == 'prev'){
                nextTableOrder = parseInt(tableViewer.holder.attr('data-current-order'))-1;
            }
            else{
                nextTableOrder = parseInt(tableViewer.holder.attr('data-current-order'))+1;
            }
            tableViewer.move(nextTableOrder,this);
        });
        $(document).on("click", ".table__viewer__closer,.article-table-viewer__overlay", function (e) {
            e.preventDefault();
            tableViewer.close();
        });
        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
                tableViewer.close();
            }
        });
    },
    move: function(index,elem){
        var nextTable = $('.article-table-holder').eq(index).find('.article-table-content');

        $('.article-table-viewer__wrapper').html(nextTable.html());
        tableViewer.holder.attr('data-current-order',index);
        tableViewer.hideShowNav(index);

    },
    hideShowNav: function(index){
        if(index >= $('.article-table-holder').length-1){
            $('.article-table-viewer__ctrl__next').hide();
        }
        else{
            $('.article-table-viewer__ctrl__next').show();
        }
        if(index==0){
            $('.article-table-viewer__ctrl__prev').hide();
        }
        else{
            $('.article-table-viewer__ctrl__prev').show();
        }
    },
    open: function (elem) {
        var tableHtml = $(elem).parents('.article-table-holder').find(".article-table-content").html();
        $('.article-table-viewer__wrapper').html(tableHtml);
        tableViewer.holder.show();
        tableViewer.holder.attr('data-current-order',$(elem).parents('.article-table-holder').attr('data-order'));
        tableViewer.hideShowNav($(elem).parents('.article-table-holder').attr('data-order'));
        $('body').addClass('modal-open');
    },
    close: function(){
        tableViewer.holder.hide();
        $('body').removeClass('modal-open');
    }
};


UX.tableViewer = tableViewer;