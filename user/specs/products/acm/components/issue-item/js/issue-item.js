(function () {
    var $body = $('body');

    var issueItem = {
        init: function () {
            issueItem.control();
        },
        control: function () {
            $body.on('change', '.issue-Item__checkbox', function (e) {
               if($('.issue-Item__checkbox:checked').length){
                   $('.item-results__msg').hide();
                   $('.item-results__buttons').css('display', 'inline-block');
               }
               else{
                   $('.item-results__msg').show();
                   $('.item-results__buttons').hide();
               }
            });

            $body.on('change', '.item-results__checkbox input', function (e) {
                if($('.item-results__checkbox input:checked').length){
                    $('.issue-Item__checkbox').prop('checked','true');
                    $('.item-results__msg').hide();
                    $('.item-results__buttons').css('display', 'inline-block');
                }
                else{
                    $('.issue-Item__checkbox').removeAttr('checked');
                    $('.item-results__msg').show();
                    $('.item-results__buttons').hide();
                }
            });
        }



       
    };

    UX.issueItem = issueItem; // add to global namespace
})();
