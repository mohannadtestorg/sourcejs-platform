// (c) Atypon
PB.define(
    ['jquery-ui', 'underscore', 'backbone'],

    function ($, _, Backbone) {

        function initialize($el){
            // Add the drag handles and style elements
            var $container = $el.find('fieldset > .controls');
            var $messageOrder = $el.find('[name="messagesOrder"]');

            $container.find('>.control-group').each(function () {
                var $handle = $('<div class="drag-handle"><i class="fa fa-sort"></i></div>');
                $handle.css({
                    'font-size': '200%',
                    position: 'absolute',
                    top: '4px',
                    right: '10px',
                    color: '#ccc',
                    cursor: 'move'
                });
                $(this).css({
                    position: 'relative',
                    border: '1px solid #ccc',
                    'border-radius': '4px',
                    padding: '4px',
                    background: 'white'
                });
                $(this).append($handle);
            });

            // enable drag and drop
            $container.sortable({
                axis: 'y',
                handle: '.drag-handle',
                update: function (event, ui) {
                    var newOrder = "";
                    $el.find('fieldset > .controls > .control-group > label > input')
                        .not($messageOrder)
                        .each(function () {
                            if (newOrder.length) {
                                newOrder += ",";
                            }
                            newOrder += this.name
                        });
                    $messageOrder.val(newOrder);
                }
            });

        }

        var self = {
            execute: function ($el) {


                // Allow ordering of messages

                var $messageOrder = $el.find('[name="messagesOrder"]');
                if (!$messageOrder.length) {
                    return;
                }
                var $container = $el.find('fieldset > .controls');

                if(!$container.find('>.control-group .drag-handle').length){
                    initialize($el);
                }

                // apply the existing order of messages
                var $reordered = [];
                $.each($messageOrder.val().split(','), function (i, name) {
                    try {
                        var $item = $el.find('[name="' + name + '"]').closest('.controls');
                        $reordered.push($item);
                    } catch (ex) {
                        //
                    }
                });
                $container.prepend($reordered);


            }
        };

        return self;

    }
);
