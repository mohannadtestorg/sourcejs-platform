UX.coolbar.holder = $('.coolBar--sections .article-sections');
UX.coolbar.topbar = $('.article-top-section .coolBar__drop');
UX.coolbar.init = function(){
    UX.coolbar.get.sections();
    UX.coolbar.fill.sections();
    UX.coolbar.control();
    UX.coolbar.fill_top.sections();
};
UX.coolbar.fill_top = {
    sections : function(){
        if ($('.article-top-section').length && UX.coolbar.sections.length > 1) {
            var top_sections = $('<ul class="rlist w-slide--list"/>')
                .appendTo(UX.coolbar.topbar);
            UX.coolbar.sections.each(function(){
                var $this = $(this);
                var li_top = $('<li/>')
                    .attr('role', 'menuitem')
                    .appendTo(top_sections);
                var link = $('<a class="w-slide__hide"/>')
                    .attr('href',"#" + $this.attr('id'))
                    .appendTo(li_top);
                var spaner = $('<span/>')
                    .text($(this).text())
                    .appendTo(link);
            });
        } else {
            $('.article-top-section').remove();
        }
    }
}
