(function () {
    var charCounter =  {
        $counters: null,
        counter: null,
        counterInput: null,
        counterOutput: null,
        $target: null,
        $targetInput: null,
        $argetOutput: null,
        maxlength: null,

        init: function () {
            this.counter = ".js-counter";
            this.counterInput = ".js-counter__input";
            this.counterOutput = ".js-counter__output";
            this.$counters = $(this.counterInput);

            charCounter.controller();
        },
        controller: function () {
            $.each(this.$counters, function (i, item) {
                $(item).closest(charCounter.counter).find(charCounter.counterOutput).html( $(item).attr("data-maxchars") - $(item).val().length );
            });
            charCounter.$counters.on('focus', charCounter.on.focus);
        },
        on:  {
            focus: function(event) {
                charCounter.$targetInput = $(event.currentTarget);
                charCounter.$targetOutput = charCounter.$targetInput.closest(charCounter.counter).find(charCounter.counterOutput);
                charCounter.$targetInput.on('keyup', charCounter.on.count);
                charCounter.$targetInput.on('blur', charCounter.on.blur);
                charCounter.maxlength = charCounter.$targetInput.attr("data-maxchars");
                charCounter.on.count();
            },
            blur: function() {
                charCounter.$targetInput.off('keyup', charCounter.on.count);
            },
            count: function() {
                var inputVal = charCounter.$targetInput.val();
                var inputLength = inputVal.length;
                var left = charCounter.maxlength - inputLength;
                if ( inputLength > charCounter.maxlength ) {
                    charCounter.$targetInput.val(inputVal.substr(0,charCounter.maxlength));
                    left = 0;
                }
                charCounter.$targetOutput.text(left);
            }
        }
    };
    UX.charCounter = charCounter; // add to global namespace
})();

