// File updated by bpairaktaridis
A17.Functions.lockBody = function() {

  var lockBodyScrollTop = 0;

  function _lock(event) {
    if ((event.data.breakpoints && event.data.breakpoints.indexOf(A17.currentMediaQuery) > -1)  || typeof(event.data.breakpoints) == "undefined") {
      lockBodyScrollTop = window.pageYOffset;
      document.getElementById('pb-page-content').style.top = (lockBodyScrollTop * -1) + 'px';
      var vpH = window.innerHeight.toString();
      document.documentElement.style.height = vpH.toString() + 'px';
      document.body.style.height = vpH.toString() + 'px';
    }
  }

  function _unlock(event) {
    if ((event.data.breakpoints && event.data.breakpoints.indexOf(A17.currentMediaQuery) > -1) || typeof(event.data.breakpoints) == "undefined" ) {
      document.getElementById('pb-page-content').style.top = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
      window.scrollTo(0, lockBodyScrollTop);
      setTimeout(function(){
        window.scrollTo(0, lockBodyScrollTop);
        lockBodyScrollTop = 0;
      }, 1);
    }
  }

  document.addEventListener('body:lock', _lock, false);
  document.addEventListener('body:unlock', _unlock, false);
};
