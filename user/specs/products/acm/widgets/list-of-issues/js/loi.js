UX.loi.addtionalInitialization = function () {
    if($('.loi__banner--sticky').length){
        UX.autoHideBar.$stickyBar=$('.loi__banner--sticky');
        UX.autoHideBar.$primaryBar=$('header');
        UX.autoHideBar.vPort="none";
        UX.autoHideBar.init();
    }
}

