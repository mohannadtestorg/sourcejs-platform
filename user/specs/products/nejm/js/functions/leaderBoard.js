A17.Functions.leaderBoard = function() {

  var dE = document.documentElement,
        timeout;

  function _handleLeaderBoardVisibility() {
    var isLeaderBoardVisible = min$('.o-popups-modal__leaderboard .ad').css('display') === "none" ? false : true;
    if(isLeaderBoardVisible) {
      dE.classList.add('s-has-leaderboard');
    } else {
      dE.classList.remove('s-has-leaderboard');
    }
  }
  function _handleLeaderBoardVisibilityTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      _handleLeaderBoardVisibility();
    }, 501); // something like 500 timeout is used in AD script
  }

  _handleLeaderBoardVisibility();
  _handleLeaderBoardVisibilityTimeout();
  min$(document).on('mediaQueryUpdated',_handleLeaderBoardVisibility);
  min$(document).on('DOMContentLoaded',_handleLeaderBoardVisibility);
  min$(document).on('load',_handleLeaderBoardVisibility);
  min$(document).on('readystatechange',_handleLeaderBoardVisibility);
  min$(document).on('resized',_handleLeaderBoardVisibilityTimeout);
};
