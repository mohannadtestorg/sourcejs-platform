A17.Functions.history = function() {

  // IE9 doesn't do pushState
  if (!window.history.pushState) {
    return;
  }
  // proxy events mean we don't need to worry about browsers that can't

  // listen for replaceState and pushState reqs
  min$(document).on('history:replacestate',function(event){
    history.replaceState(event.data, '', event.data.url);
  });

  min$(document).on('history:pushstate',function(event){
    history.pushState(event.data, '', event.data.url);
  });

  // on window popstate, lets look at the event.state object and see if we need to do something
  min$(window).on('popstate', function(event) {
    if (event && event.state && event.state.type) {
      min$(document).trigger('ajax:pageload:popstate', event.state);
    }
  });
};
