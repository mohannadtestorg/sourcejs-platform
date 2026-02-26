

(function(){
    var isMobile = false;
    var flag = false;

    $( document ).ready(function() {
        $(document).on('screen-sm-on',function(){ 
            isMobile = true;

            if(!flag) {
                control();
                flag = true;
            }
        });


    });  
        
    function control() {
        $(document).on("click", 'li.menu-parent', function (event) {
            event.stopPropagation();
            
            var link = $(this); //preselect the link
            if (!$(event.target).parents('.menu-sub').length && link.hasClass('hover')) {
                link.removeClass('hover');
                return true;
                } 
            else {
                link.addClass('hover');
                $('ul > li.menu-parent').not(this).removeClass('hover');
                event.preventDefault();
                return false; //extra, and to make sure the function has consistent return points
                }
            });
        

        $(document).on('click',function(event){
            var target = $(event.target);    

            if(!target.is('.menu-parent') || !target.parents('.menu-parent').length){
            $(".menu-parent").each(function(){
                $(this).removeClass("hover");
            });
            
            }
        });
    }
})();

    