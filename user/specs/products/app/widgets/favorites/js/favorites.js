(function () {
    UX.favorites.additionalController=function () {
        if(typeof UX.favorites.getUrlVars()['tab'] !== 'undefined' && UX.favorites.getUrlVars()['tab'] == "publication"){
            $('#pane-favorites1con').trigger('click');
        }
    }
    UX.favorites.getUrlVars=function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
})();