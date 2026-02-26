A17.Behaviors.PopUpWindow = function(bt) {
    var height = 500;
    var width = 500;
    var scrollbars = 'no';

    function _pop(href) {

        var style = (style == null) ? 'standard' : style;
        var x = 0; var y = 0; var offset = 30;

        if (screen) {
            height = Math.max(screen.availHeight - screen.availHeight/2, 500);
            width = Math.max(screen.availWidth - screen.availWidth/2, 500);

            x = (screen.availWidth - width) / 2;
            y = ((screen.availHeight - height) / 2) - 100;

            if(screen.availWidth < 500) {
                x = 0;
                y = 0;
                height = screen.availHeight;
                width = screen.availWidth;
            }
        }

        var popped = window.open(href,'popup','width='+width+',height='+ height +',status=no,location=0,menubar=no,scrollbars=' + scrollbars + ',resizable=yes,screenX='+x+',screenY='+y+',left='+x+',top='+y);
        if (!popped.opener) {
            popped.opener = window;
        }
        popped.focus();
    }

    function _openPopup(e) {
        e.preventDefault();

        var btn = e.currentTarget;
        var href = btn.getAttribute('href');
        _pop(href);
    }

    function _init() {
        bt.addEventListener('click', _openPopup);
    }


    this.destroy = function() {
        // remove specific event handlers
        bt.removeEventListener('click', _openPopup);

        // remove properties of this behavior
        A17.Helpers.purgeProperties(this);
    };

    this.init = function() {
        _init();
    };
};

