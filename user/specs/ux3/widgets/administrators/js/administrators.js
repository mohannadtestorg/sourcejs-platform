(function () {

    var administrators = {
        $removeBtn: $('.js__removeAdmins'),

        init: function(){
            administrators.controller();
        },

        controller: function(){
            administrators.$removeBtn.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                administrators.form.submit();
            });
        },

        form: {
            submit: function () {
                var hasUserChecked = administrators.form.conflictCheck();

                if(!hasUserChecked){
                    administrators.form.error_msg();
                    return;
                } else {
                    administrators.$removeBtn.closest('form').submit();
                }
            },
            conflictCheck: function () {
                return administrators.$removeBtn.closest('form').find('[type="checkbox"]:checked').length !== 0;
            },
            error_msg: function () {
                alert('Please select an administrator to remove.');
            }
        }
    };

    UX.administrators = administrators; // add to global namespace
})();