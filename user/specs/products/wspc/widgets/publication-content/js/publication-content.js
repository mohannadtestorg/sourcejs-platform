UX.loader.truncation.linesToShow = 2;

UX.loader.truncation.refresh = function () {
    if (UX.loader.isMobile &&
        !$(UX.loader.truncation.toTrunk8Mobile).find("> .read-more").length) {

        $(UX.loader.truncation.toTrunk8Mobile).truncate({
            lines: UX.loader.truncation.linesToShow,
            type: 'list',
            seeMoreLink: true,
            seeMoreText: UX.loader.truncation.showMoreText,
            seeLessText: UX.loader.truncation.showLessText,
            isMobile: true,
            mobileTarget: '#sb-1'
        });
    } else if(!$(UX.loader.truncation.toTrunk8).find(".loa-accordion > .read-more").length) {
        $(UX.loader.truncation.toTrunk8).truncate({
            lines: UX.loader.truncation.linesToShow,
            type: 'list',
            seeMoreLink: true,
            seeMoreText: UX.loader.truncation.showMoreText,
            seeLessText: UX.loader.truncation.showLessText
        });
    }

}

UX.loader.rebuild.extra = function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
    UX.loader.truncation.refresh()
};