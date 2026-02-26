(function () {
    $(document).ready(function () {
        transplantTarget.init();
    });

    var transplantTarget = {
        elements: $('.transplant'), // transplant parent
        targets: null, // transplant target
        remove: false,// flag to remove cloned element
        targetClasess: null, // classes to be added to cloned element

        init: function(){
            transplantTarget.elements.each(function(){
                var $this = $(this);
                transplantTarget.targets = $this.attr('data-tr-targets'); // targeted element
                transplantTarget.targetClasess = $this.attr('data-tr-target-class'); // extract classes to be added to original element
                transplantTarget.remove = $this.attr('data-tr-uinique'); // extract remove flag to remove original if true
                transplantTarget.order($this); // $this = transparent element
            })
        },

        order: function(element){ // keep selectors in order not dom order
            var array = transplantTarget.targets.split(","); // array of selectors
            $.each(array, function(index, item) { // go through selectors
                transplantTarget.clone(element, $(item)); // clone element at a time to keep order
            });
        },

        clone: function(element, $item){
            var cloned =  $item.clone(true, true);
            if (transplantTarget.remove == "true") { // check if remove original element is enabled
                $(transplantTarget.targets).remove(); // remove original element
            } else {
                if (transplantTarget.targetClasess !== null){ // class to orignal element if provided
                    $item.addClass(transplantTarget.targetClasess);
                }
            }
            if (typeof  cloned !== "undefined" ) { // check if original element exist
                transplantTarget.cleanup(); // clean up before clone
                element.append(cloned);
            }
        },

        cleanup: function(){ // remove original element's ID
            $(transplantTarget.targets).removeAttr("id");
        }
    };
    UX.transplantTarget = transplantTarget; // add to global namespace
})();