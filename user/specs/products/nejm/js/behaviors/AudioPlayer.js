A17.Behaviors.AudioPlayer = function(playerContainer) {

  var klassActive     = 's-play--active';
  var klassMute       = 's-volume--mute';
  var player          = playerContainer.querySelector('audio');
  var playBtn         = playerContainer.querySelector('[data-audio-player-play]');
  var volumeBtn       = playerContainer.querySelector('[data-audio-player-volume]');
  var currentTime     = playerContainer.querySelector('[data-audio-player-current]');
  var endTime         = playerContainer.querySelector('[data-audio-player-duration]');
  var progressbar     = playerContainer.querySelector('[data-audio-player-progress] input');
  var progressbarDone = playerContainer.querySelector('[data-audio-player-done]');
  var volumeBar       = playerContainer.querySelector('[data-audio-player-volume-slider] input');
  var duration = 0;
  var progressMax = 10000; // bigger numbers updates the progress bar more often, smaller means less DOM hits
  var volume = localStorage.getItem('AudioPlayerVolume') || 100;
  var isDragging = false;
  var isAutoPlay = true;

  // Controls & Sounds Methods
  // ----------------------------------------------------------
  function _play() {
    if (player.paused) {
      player.play();
    }
    playBtn.classList.add(klassActive);
  }

  function _pause() {
    if (!player.paused) {
      player.pause();
    }
    playBtn.classList.remove(klassActive);
  }

  function _togglePlay(event) {
    if (event) {
      event.preventDefault();
      this.blur();
    }
    if (!player.paused) {
      _pause();
    } else {
      _play();
    }
  }

  function _muted() {
    player.muted = true;
    volumeBtn.classList.add(klassMute);
    volumeBar.value = 0;
    player.volume = 0;
  }

  function _unmute() {
    if (volume === 0) {
      volume = 100;
    }
    player.muted = false;
    volumeBtn.classList.remove(klassMute);
    volumeBar.value = volume;
    player.volume = volume/100;
  }

  function _updateVolume() {
    volume = parseInt(volumeBar.value);
    if (volume === 0) {
      _muted();
    } else {
      _unmute();
      try {
        localStorage.setItem('AudioPlayerVolume', volume);
      } catch(err) {}
    }
  }

  function _toggleMute(event) {
    if (event) {
      event.preventDefault();
      this.blur();
    }
    if (!player.muted) {
      _muted();
    } else {
      _unmute();
    }
  }

  function _resizeProgress(percent) {
    progressbarDone.style.width = percent/(progressMax/100) + '%';
  }

  function calculateTotalValue(tot) {
    var minutes = Math.floor(tot / 60);
    var secondsInt = tot - minutes * 60;
    var seconds = secondsInt.toFixed();
    var time = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);

    return time;
  }

  function calculateCurrentValue(currentTime) {
    var currentHour = parseInt(currentTime / 3600) % 24;
    var currentMinute = parseInt(currentTime / 60) % 60;
    var currentSecondsLong = currentTime % 60;
    var currentSeconds = currentSecondsLong.toFixed();

    currentTime = (currentMinute < 10 ? '0' + currentMinute : currentMinute) + ':' + (currentSeconds < 10 ? '0' + currentSeconds : currentSeconds);

    return currentTime;
  }

  function _isNaN(n) {
    return typeof(n) === 'number' && isNaN(n);
  }

  function _progress() {

    var isReady = _isNaN(Number(player.duration)) ? false : true;

    if(duration !== player.duration) {
      duration = player.duration;

      // calculate current value time
      if(isReady) {
        endTime.innerHTML = calculateTotalValue(player.duration);
      }
    }

    if(isDragging) {
      return false;
    }

    // update Current time and move the progress bar
    if(isReady) {
      var percent = Math.round((player.currentTime / player.duration) * progressMax);

      currentTime.innerHTML = calculateCurrentValue(player.currentTime);

      if(percent !== progressbar.value) {
        progressbar.value = percent;
        _resizeProgress(percent);
      }
      if (player.currentTime === player.duration) {
        _pause();
      }

      //console.log(progressbar.value,percent);
    }
  }

  function _autoPlayPlaying() {
    player.removeEventListener('playing', _autoPlayPlaying);
    _play(); // ok so we're playing, lets make it look like we're playing
    _progress();
  }

  function _playAndProgress() {
    player.removeEventListener('canplay', _playAndProgress);
    player.addEventListener('playing', _autoPlayPlaying, false);
    playBtn.classList.remove(klassActive); // make it look paused
    player.play(); // attempt play, some browsers block this
  }

  function _drag(event) {
    isDragging = true;
  }

  function _updateProgress() {
    _resizeProgress(progressbar.value);
  }

  function _seek(event) {
    isDragging = false;
    var percent = progressbar.value / progressMax;
    player.currentTime = percent * player.duration;

    _progress();
  }

  function _init() {
    // Controls
    playBtn.addEventListener('click', _togglePlay);
    player.addEventListener('timeupdate', _progress);
    progressbar.addEventListener('change', _updateProgress);
    progressbar.addEventListener('input', _updateProgress);
    progressbar.addEventListener('mousedown', _drag);
    progressbar.addEventListener('mouseup', _seek);
    volumeBtn.addEventListener('click', _toggleMute);
    volumeBar.addEventListener('input', _updateVolume);
    player.addEventListener('playing', _autoPlayPlaying, false);
    player.removeEventListener('playing', _autoPlayPlaying);

    progressbar.setAttribute('max',progressMax);
    _unmute();

    if(isAutoPlay) {
      player.addEventListener('canplay', _playAndProgress, false);
      player.load();
    } else {
      player.pause();
    }
  }


  this.destroy = function() {
    // remove specific event handlers
    playBtn.removeEventListener('click', _togglePlay);
    player.removeEventListener('timeupdate', _progress);
    progressbar.removeEventListener('change', _updateProgress);
    progressbar.removeEventListener('input', _updateProgress);
    progressbar.removeEventListener('mousedown', _drag);
    progressbar.removeEventListener('mouseup', _seek);
    volumeBtn.removeEventListener('click', _toggleMute);
    volumeBar.removeEventListener('input', _updateVolume);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
