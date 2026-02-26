(function () {
    var appliedFacets = {
        url: location.href,

        init: function () {
            appliedFacets.remove.all();
            appliedFacets.setUrl.clearAll();
        },

        remove: {
            one: function (key) {
                var baseUrl = appliedFacets.url.split('?')[0];
                var queryString = (appliedFacets.url.indexOf('?') !== -1) ? appliedFacets.url.split('?')[1] : '';
                var queryStringObj = {};

                if (queryString) {
                    queryString.split('&').map(function (value) {
                        var keyVal = value.split('=');
                        queryStringObj[keyVal[0]] = keyVal[1];
                    });
                    if (queryStringObj[key]) {
                        delete queryStringObj[key];
                    }
                    queryString = Object.keys(queryStringObj).map(function (value) {
                        return value + '=' + queryStringObj[value];
                    }).join('&');
                    appliedFacets.url = baseUrl + '?' + queryString;
                }
            },
            all: function () {
                appliedFacets.remove.one('Year'); // reset year facet filters
                appliedFacets.remove.one('ContribStored'); // reset contribs filters
                appliedFacets.remove.one('ContribAuthorStored'); // reset contribs filters
                appliedFacets.remove.one('SeriesKey'); // reset series filters
                appliedFacets.remove.one('ContentItemType'); // reset extra filters
                appliedFacets.remove.one('KeywordStored'); // reset keywords filters
                appliedFacets.remove.one('alphabetRange'); // reset keywords filters
                appliedFacets.remove.one('PubType'); // reset Publication filters
                appliedFacets.remove.one('Ppub'); // reset Publication filters
                appliedFacets.remove.one('ConceptID'); // reset Publication filters
                appliedFacets.remove.one('publication%5B%5D'); // reset Publication filters
                appliedFacets.remove.one('AfterMonth'); // reset Publication filters
                appliedFacets.remove.one('AfterYear'); // reset Publication filters
                appliedFacets.remove.one('BeforeMonth'); // reset Publication filters
                appliedFacets.remove.one('BeforeYear'); // reset Publication filters

            }
        },
        setUrl: { // set url to clear all filters
            clearAll: function () {
                $('.search__filters__ctrl__reset').attr('href', appliedFacets.url);
            }
        }
    };

    UX.appliedFacets = appliedFacets; // add to global namespace
})();