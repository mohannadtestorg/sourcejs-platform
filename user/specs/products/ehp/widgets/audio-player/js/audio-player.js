// IE 11 support for closest
if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
if (!Element.prototype.closest) Element.prototype.closest = function (selector) {
    var el = this;
    while (el) {
        if (el.matches(selector)) {
            return el;
        }
        el = el.parentElement;
    }
};

(function (UX, localStorage) {

    var playerContainer = $('.js-audio-player');

    var audioPlayer = {

        init: function () {
            playerContainer.each(function () {
                make_player(this)();
            });
        }
    };

    var make_player = function (playerContainer) {
        // @todo concider usage of https://github.com/mediaelement/mediaelement instead of this for better support?

        var klassActive     = 's-play--active';
        var klassMute       = 's-volume--mute';
        var player          = playerContainer.querySelector('audio');
        var playBtn         = playerContainer.querySelector('[data-audio-player-play]');
        var stepForwardBtn  = playerContainer.querySelector('[data-audio-player-step-fw]');
        var stepBackwardBtn = playerContainer.querySelector('[data-audio-player-step-bw]');
        var volumeBtn       = playerContainer.querySelector('[data-audio-player-volume]');
        var currentTime     = playerContainer.querySelector('[data-audio-player-current]');
        var endTime         = playerContainer.querySelector('[data-audio-player-duration]');
        var progressbar     = playerContainer.querySelector('[data-audio-player-progress] input');
        var progressbarDone = playerContainer.querySelector('[data-audio-player-done]');
        var volumeBar       = playerContainer.querySelector('[data-audio-player-volume-slider] input');
        var duration = 0;
        var progressMax = 10000; // bigger numbers updates the progress bar more often, smaller means less DOM hits
        var stepSize = 0.10;
        var volume = localStorage.getItem('AudioPlayerVolume') || 100;
        var isDragging = false;
        var isAutoPlay = false;

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
            if (volumeBar) {
                volumeBar.value = 0;
            }
            player.volume = 0;
        }

        function _unmute() {
            if (volume === 0) {
                volume = 100;
            }
            player.muted = false;
            volumeBtn.classList.remove(klassMute);
            if (volumeBar) {
                volumeBar.value = volume;
            }
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

        function _dontPlayAndProgress() {
            player.removeEventListener('canplay', _dontPlayAndProgress);
            _progress();
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

        function _stepBackward() {
            var targetTime = player.currentTime + stepSize * player.duration;
            if(targetTime < 0) {
                targetTime = 0;
            }

            player.currentTime = targetTime;

            _progress();
        }

        function _stepForward() {
            var targetTime = player.currentTime - stepSize * player.duration;
            if(targetTime > player.duration) {
                targetTime = player.duration;
            }

            player.currentTime = targetTime;

            _progress();
        }

        function _pauseOthers(e){
            var audios = document.getElementsByTagName('audio');
            for(var i = 0, len = audios.length; i < len;i++){
                if(audios[i] != e.target){
                    var player = audios[i];
                    if (!player.paused) {
                        player.pause();
                    }
                    player.closest('.js-audio-player').querySelector('[data-audio-player-play]').classList.remove(klassActive);
                }
            }
        };

        // init
        return function () {
            // Controls
            playBtn.addEventListener('click', _togglePlay);
            stepForwardBtn.addEventListener('click', _stepForward);
            stepBackwardBtn.addEventListener('click', _stepBackward);
            player.addEventListener('timeupdate', _progress);
            progressbar.addEventListener('change', _updateProgress);
            progressbar.addEventListener('input', _updateProgress);
            progressbar.addEventListener('mousedown', _drag);
            progressbar.addEventListener('mouseup', _seek);
            volumeBtn.addEventListener('click', _toggleMute);
            if(volumeBar) {
                volumeBar.addEventListener('input', _updateVolume);
            }
            player.addEventListener('playing', _autoPlayPlaying, false);
            player.removeEventListener('playing', _autoPlayPlaying);

            progressbar.setAttribute('max',progressMax);
            _unmute();

            if(isAutoPlay) {
                player.addEventListener('canplay', _playAndProgress, false);
                player.load();
            } else {
                player.addEventListener('canplay', _dontPlayAndProgress(), false);
                player.pause();
            }

            document.addEventListener('play', _pauseOthers, true);
        }
    };

    // return API
    UX.audioPlayer = audioPlayer; // add to global namespace
})(UX, localStorage);
