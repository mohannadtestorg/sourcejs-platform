(function () {
    var editInPlace =  {
        $editables: null,
        editable: null,
        editableInput: null,
        editableText: null,
        target: null,
        targetInput: null,
        targetText: null,
        CLASS_HIDDEN: "__hidden",

        init: function () {
            this.editable = ".js-editable";
            this.editableInput = ".js-editable__input";
            this.editableText = ".js-editable__text";
            this.$editables = $(this.editable);

            $.each(this.$editables, function (i, item) {
                if ($(item).find(editInPlace.editableText).text() == "") {
                    $(item).find(editInPlace.editableText).text("Click to edit");
                }
                $(item).find(editInPlace.editableInput).css("display","none");
            });
            editInPlace.controller();
        },
        controller: function () {
            editInPlace.$editables.on('click', editInPlace.on.show);
        },
        on:  {
            show: function(event) {
                event.stopPropagation();
                editInPlace.target = event.currentTarget;
                editInPlace.targetText = $(editInPlace.target).find(editInPlace.editableText);
                editInPlace.targetInput = $(editInPlace.target).find(editInPlace.editableInput);
                editInPlace.targetText.addClass(editInPlace.CLASS_HIDDEN);
                editInPlace.targetInput.show().focus();

                // hack to have cursor at the end of text in input
                var tmpStr = editInPlace.targetInput.val();
                editInPlace.targetInput.val('');
                editInPlace.targetInput.val(tmpStr);
                // end of hack

                editInPlace.targetInput.on('keyup', function(event) {
                    event.stopPropagation();
                    var keycode = event.keyCode;
                    switch (keycode) {
                        case 13:
                            editInPlace.on.save();
                            break;
                        case 27:
                            editInPlace.on.cancel();
                            break;
                        default:
                            return;
                    }
                });
                editInPlace.targetInput.on('blur', editInPlace.on.save);
            },
            cancel: function() {
                editInPlace.targetInput.val( editInPlace.targetText.text() );
                editInPlace.on.hide();

            },
            save: function() {
                editInPlace.targetText.text( editInPlace.targetInput.val() );
                editInPlace.on.hide();

            },
            hide: function() {
                editInPlace.targetText.removeClass(editInPlace.CLASS_HIDDEN);
                editInPlace.targetInput.off('blur', editInPlace.on.blur);
                editInPlace.targetInput.hide();
            }

        }
    };
    UX.editInPlace = editInPlace; // add to global namespace
})();

