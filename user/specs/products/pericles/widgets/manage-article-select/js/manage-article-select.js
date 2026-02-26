(function () {

    var manageArticleSelect = {
        $removeUsersBtn: $('.js__removeUsers'),
        $confirmationModal: $('#confirmRemoveUser'),
        selectAllCheckbox:'[name="markallInPage"]',
        $body: $('body'),

        init: function(){

            $(window).on('load', function(e) {
                if (window.location.hash == '#PERMISSIONS')
                    $('[title="PERMISSIONS"]').click();
            });

            manageArticleSelect.controller();
        },
        controller: function(){
            manageArticleSelect.$removeUsersBtn.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                manageArticleSelect.form.submit();
            });

            manageArticleSelect.$body.on('click', manageArticleSelect.selectAllCheckbox, function(e) {
                var $targetrows=$(this).closest('.selectMenuLabel').find('~.table-responsive tr:visible');
                var checkboxes =  $targetrows.find('[type="checkbox"]');
                checkboxes.prop('checked', $(this).prop('checked'));
            });
        },
        clearSelectAll:function () {
            var $selectAllchk=$(manageArticleSelect.selectAllCheckbox);
           if($selectAllchk.is(':checked')){
               $selectAllchk.prop('checked', false);
               var $targetrows=$selectAllchk.closest('.selectMenuLabel').find('~.table-responsive tr');
               var checkboxes =  $targetrows.find('[type="checkbox"]');
               checkboxes.prop('checked',false);
           }
        },
        form: {
            submit: function () {
                var hasUserChecked = manageArticleSelect.form.conflictCheck();

                if(!hasUserChecked){
                    manageArticleSelect.form.error_msg();
                    return;
                } else {

                    var usrName = [];

                    manageArticleSelect.$confirmationModal.find('.usersName').html(usrName);

                    manageArticleSelect.$confirmationModal.closest('form').find('[type="checkbox"][name!="markallInPage"]:checked').each(function () {
                        var name = $(this).closest('tr').find('td:last-child').html();
                        usrName.push(name);
                    });

                    for (var i in usrName) {

                        if (i < (usrName.length - 1))
                            manageArticleSelect.$confirmationModal.find('.usersName').append(usrName[i] + ', ');
                        else
                            manageArticleSelect.$confirmationModal.find('.usersName').append(usrName[i]);
                    }

                    manageArticleSelect.$confirmationModal.modal('show');
                }
            },
            conflictCheck: function () {
                return manageArticleSelect.$removeUsersBtn.closest('form').find('[type="checkbox"]:checked').length !== 0;
            },
            error_msg: function () {
                alert('Please select at least one user.');
            }
        }
    };

    UX.manageArticleSelect = manageArticleSelect; // add to global namespace
})();