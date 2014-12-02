/*
 * Acorn Media Player - jQuery plugin 1.6
 *
 * Copyright (C) 2012 Ionut Cristian Colceriu
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * www.ghinda.net
 * contact@ghinda.net
 *
 */

(function ($) {
    $.fn.acornMediaPlayer = function (options) {
        /*
         * Define default plugin options
         */
        var defaults = {
            theme: 'access',
            nativeSliders: false,
            volumeSlider: 'horizontal'
        };
        options = $.extend(defaults, options);

        /* 
         * Function for generating a unique identifier using the current date and time
         * Used for generating an ID for the media elmenet when none is available
         */
        var uniqueID = function () {
            var currentDate = new Date();
            return currentDate.getTime();
        };
        /* Detect Touch support
         */
        var is_touch_device = 'ontouchstart' in document.documentElement;
        /*
         * If no value is present, define as maximum
         */
        var volume = 0.5;
        if (!volume) {
            volume = 0.5;
        }
        /* 
         * Main plugin function
         * It will be called on each element in the matched set
         */
        var acornPlayer = function () {
            // set the acorn object, will contain the needed DOM nodes and others
            var acorn = {
                $self: $(this)
            };
            var seeking; // The user is seeking the media
            var wasPlaying; // Media was playing when the seeking started
            /* Define all the texts used
             * This makes it easier to maintain, make translations, etc.
             */
            var text = {
                //replay: 'Replay',
                replayTitle: 'press R to replay',
                //play: 'Play',
                playTitle: 'press P to play',
                //pause: 'Pause',
                pauseTitle: 'press P to pause',
                //mute: 'Mute',
                muteTitle: 'press M to mute sound',
                //unmute: 'Unmute',
                unmuteTitle: 'press M to unmute sound',
                volumeTitle: 'Volume Bar',
                decreaseTitle: 'press minus to lower the volume',
                increaseTitle: 'press plus to increase the volume',
                seekTitle: 'Progress Bar',
            };

            // main wrapper element
            var $wrapper = $('<div class="acorn-player"  role="application"></div>').addClass(options.theme);

            /*
             * Define attribute tabindex on the main element to make it readchable by keyboard
             * Useful when "aria-describedby" is present
             *
             * It makes more sense for screen reader users to first reach the actual <video> or <audio> elment and read of description of it,
             * than directly reach the Media Player controls, without knowing what they control.
             */


            /*
             * Check if the main element has an ID attribute
             * If not present, generate one
             */
            acorn.id = acorn.$self.attr('id');
            if (!acorn.id) {
                acorn.id = 'acorn' + uniqueID();
                acorn.$self.attr('id', acorn.id);
            }

            /*
             * Complete markup
             */
            var template =
                '<div class="acorn-controls">' +
                '<div class="play-replay">' +
				'<img id="replayImg" class="shortcuts" src="images/r.png" style="left: 30px;">'+
				'<img id="playImg" class="shortcuts" src="images/p.png" style="left: 62px;">'+
                '<button class="acorn-replay-button" tabindex="1" title="' + text.replayTitle + '" aria-controls="' + acorn.id + '"></button>' +
                '<button class="acorn-play-button" tabindex="2" title="' + text.playTitle + '" aria-controls="' + acorn.id + '"></button>' +
                '</div>' +
                '<input type="range" class="acorn-seek-slider" title="' + text.seekTitle + '" value="0" min="0" max="1" step="0.001" aria-controls="' + acorn.id + '"/>' +
                '<div class="acorn-volume-box">' +
				'<img id="volumeImg" class="shortcuts" src="images/m.png" style="right: 210px;"/>'+
				'<img id="minusImg" class="shortcuts" src="images/-.png" style="right: 185px;"/>'+
				'<img id="plusImg" class="shortcuts" src="images/+.png" style="right: 105px;"/>'+
                '<button class="acorn-volume-button" tabindex="4" title="' + text.muteTitle + '" aria-controls="' + acorn.id + '"></button>' +
                '<button class="acorn-decrease-button" tabindex="5" title="' + text.decreaseTitle + '" aria-controls="' + acorn.id + '"></button>' +
                '<input type="range" class="acorn-volume-slider" title="' + text.volumeTitle + '" value="0.5" min="0" max="1" step="0.1" aria-controls="' + acorn.id + '"/>' +
                '<button class="acorn-increase-button" tabindex="7" title="' + text.increaseTitle + '" aria-controls="' + acorn.id + '"></button>' +
                '<img id="logo" alt="Pearson Logo" src="images/pearson_logo.png"/>' +
                '</div>' +
			'</div>';
            /*
             * Append the HTML markup
             */

            // append the wrapper
            acorn.$self.after($wrapper);

            // For iOS support, I have to clone the node, remove the original, and get a reference to the new one.
            // This is because iOS doesn't want to play videos that have just been `moved around`.
            // More details on the issue: http://bugs.jquery.com/ticket/8015
            $wrapper[0].appendChild(acorn.$self[0].cloneNode(true));
            acorn.$self.remove();
            acorn.$self = $wrapper.find('video, audio');

            // append the controls and loading mask
            acorn.$self.after(template).after('<div class="loading-media"></div>');

            /*
             * Define the newly created DOM nodes
             */
            acorn.$container = acorn.$self.parent('.acorn-player');

            acorn.$controls = $('.acorn-controls', acorn.$container);
            acorn.$playBtn = $('.acorn-play-button', acorn.$container);
            acorn.$replayBtn = $('.acorn-replay-button', acorn.$container);
            acorn.$seek = $('.acorn-seek-slider', acorn.$container);
            acorn.$timer = $('.acorn-timer', acorn.$container);
            acorn.$volume = $('.acorn-volume-slider', acorn.$container);
            acorn.$volumeBtn = $('.acorn-volume-button', acorn.$container);
            /*
             * Use HTML5 "data-" attributes to set the original Width&Height for the <video>
             * These are used when returning from Fullscreen Mode
             */
            acorn.$self.attr('data-width', acorn.$self.width());
            acorn.$self.attr('data-height', acorn.$self.height());

            /*
             * Time formatting function
             * Takes the number of seconds as a parameter and return a readable format "minutes:seconds"
             * Used with the number of seconds returned by "currentTime"
             */
            var timeFormat = function (sec) {
                var m = Math.floor(sec / 60) < 10 ? "0" + Math.floor(sec / 60) : Math.floor(sec / 60);
                var s = Math.floor(sec - (m * 60)) < 10 ? "0" + Math.floor(sec - (m * 60)) : Math.floor(sec - (m * 60));
                return m + ":" + s;
            };

            /*
             * PLAY/PAUSE Behaviour			 
             *
             * Function for the Play button
             * It triggers the native Play or Pause events
             */
            var playMedia = function () {
				$("#playImg").hide();
                if (!acorn.$self.prop('paused')) {
                    acorn.$self[0].pause();
                } else {
                    acorn.$self[0].play();
                }
            };
            var replayMedia = function () {
				$("#replayImg").hide();
                if (acorn.$self.prop('paused')) {
                    acorn.$self[0].currentTime = 0;
                    acorn.$self[0].pause();
                } else if (!acorn.$self.prop('paused')) {
                    acorn.$self[0].currentTime = 0;
                    acorn.$self[0].play();
                }

            };
            /* 
             * Functions for native playback events (Play, Pause, Ended)
             * These are attached to the native media events.
             *
             * Even if the user is still using some form of native playback control (such as using the Context Menu)
             * it will not break the behviour of our player.
             */
            var startPlayback = function () {
                acorn.$playBtn.text(text.pause).attr('title', text.pauseTitle);
                acorn.$playBtn.addClass('acorn-paused-button');
            };
            var stopPlayback = function () {
                acorn.$playBtn.text(text.play).attr('title', text.playTitle);
                acorn.$playBtn.removeClass('acorn-paused-button');
            };
            var endPlayback = function () {
                acorn.$self[0].currentTime = 0;
                acorn.$self[0].pause();
                acorn.$playBtn.text(text.play).attr('title', text.playTitle);
                acorn.$playBtn.removeClass('acorn-paused-button');
            };
            /* Function for replay event */
            var replayPlayback = function () {
                acorn.$replayBtn.text(text.replay).attr('title', text.replayTitle);
            };
			/*Function for shortcuts*/
			$(".acorn-replay-button").focusin(function(){
			 $("#replayImg").show();}
			);
			$(".acorn-replay-button").focusout(function(){
			 $("#replayImg").hide();}
			);
			$(".acorn-play-button").focusin(function(){
			 $("#playImg").show();}
			);
			$(".acorn-play-button").focusout(function(){
			 $("#playImg").hide();}
			);
			$(".acorn-volume-button").focusin(function(){
			 $("#volumeImg").show();}
			);
			$(".acorn-volume-button").focusout(function(){
			 $("#volumeImg").hide();}
			);
			$(".acorn-decrease-button").focusin(function(){
			 $("#minusImg").show();}
			);
			$(".acorn-decrease-button").focusout(function(){
			 $("#minusImg").hide();}
			);
			$(".acorn-increase-button").focusin(function(){
			 $("#plusImg").show();}
			);
			$(".acorn-increase-button").focusout(function(){
			 $("#plusImg").hide();}
			);
            /*Function calling for volume increase & decrease.*/
            $('.acorn-increase-button').click(function () {
                setVol(0.1)
            });
            $('.acorn-decrease-button').click(function () {
                setVol(-0.1)
            });
            /*
             * SEEK SLIDER Behaviour
             * 
             * Updates the Timer and Seek Slider values
             * Is called on each "timeupdate"
             */
            var seekUpdate = function () {
                var currenttime = acorn.$self.prop('currentTime');
                //acorn.$timer.text(timeFormat(currenttime));	

                // If the user is not manualy seeking
                if (!seeking) {
                    // Check type of sliders (Range <input> or jQuery UI)
                    if (options.nativeSliders) {
                        acorn.$seek.attr('value', currenttime);
                    } else {
                        acorn.$seek.slider('value', currenttime);
                    }
                    $('.acorn-seek-slider a').attr('aria-valuetext', ariaTimeFormat(currenttime));
                }
            };

            /*
             * Time formatting function
             * Takes the number of seconds as a paramenter
             * 
             * Used with "aria-valuetext" on the Seek Slider to provide a human readable time format to AT
             * Returns "X minutes Y seconds"
             */
            var ariaTimeFormat = function (sec) {
                var m = Math.floor(sec / 60) < 10 ? "" + Math.floor(sec / 60) : Math.floor(sec / 60);
                var s = Math.floor(sec - (m * 60)) < 10 ? "" + Math.floor(sec - (m * 60)) : Math.floor(sec - (m * 60));
                var formatedTime;

                var mins = 'minutes';
                var secs = 'seconds';

                if (m == 1) {
                    min = 'minute';
                }
                if (s == 1) {
                    sec = 'second';
                }

                if (m === 0) {
                    formatedTime = "video progress" + s + ' ' + secs;
                } else {
                    formatedTime = "video progress" + m + ' ' + mins + ' ' + s + ' ' + secs;
                }

                return formatedTime;
            };
			/*
             * Triggered when the user starts to seek manually
             * Pauses the media during seek and changes the "currentTime" to the slider's value
             */
            var startSeek = function (e, ui) {
                if (!acorn.$self.attr('paused')) {
                    wasPlaying = true;
                }
                acorn.$self.trigger('pause');
                seeking = true;

                var seekLocation;
                if (options.nativeSliders) {
                    seekLocation = acorn.$seek.val();
                } else {
                    seekLocation = ui.value;
                }

                acorn.$self[0].currentTime = seekLocation;
            };

            /*
             * Triggered when user stoped manual seek
             * If the media was playing when seek started, it triggeres the playback,
             * and updates ARIA attributes
             */
            var endSeek = function (e, ui) {
                if (wasPlaying) {
                    acorn.$self[0].play();
                    wasPlaying = false;
                }
                seeking = false;
                var sliderUI = $(ui.handle);
                sliderUI.attr("aria-valuenow", parseInt(ui.value, 10));
                sliderUI.attr("aria-valuetext", ariaTimeFormat(ui.value));
            };

            /*
             * Transforms element into ARIA Slider adding attributes and "tabindex"
             * Used on jQuery UI sliders
             * 
             * Will not needed once the jQuery UI slider gets built-in ARIA 
             */
            var initSliderAccess = function (elem, opts) {
                var accessDefaults = {
                    'role': 'slider',
                        'aria-valuenow': parseInt(opts.value, 10),
                        'aria-valuemin': parseInt(opts.min, 10),
                        'aria-valuemax': parseInt(opts.max, 10),
                        'aria-valuetext': opts.valuetext,

                };
                elem.attr(accessDefaults);
            };

            /*
             * Init jQuery UI slider
             */
            var initSeek = function () {

                // get existing classes
                var seekClass = acorn.$seek.attr('class');

                // create the new markup
                var divSeek = '<div class="' + seekClass + '" title="' + text.seekTitle + '"tabindex="3"></div>';
                acorn.$seek.after(divSeek).remove();

                // get the newly created DOM node
                acorn.$seek = $('.' + seekClass, acorn.$container);

                // create the buffer element
                var bufferBar = '<div class="ui-slider-range acorn-buffer"></div>';
                acorn.$seek.append(bufferBar);

                // get the buffer element DOM node
                acorn.$buffer = $('.acorn-buffer', acorn.$container);

                // set up the slider options for the jQuery UI slider
                var sliderOptions = {
                    value: 0,
                    step: 1,
                    orientation: 'horizontal',
                    range: 'min',
                    min: 0,
                    max: 100
                };
                // init the jQuery UI slider
                acorn.$seek.slider(sliderOptions);

            };

            /*
             * Seek slider update, after metadata is loaded
             * Attach events, add the "duration" attribute and generate the jQuery UI Seek Slider
             */
            var updateSeek = function () {
                // Get the duration of the media
                var duration = acorn.$self[0].duration;
                // Check for the nativeSliders option
                if (options.nativeSliders) {
                    acorn.$seek.attr('max', duration);
                    acorn.$seek.bind('change', startSeek);
                    acorn.$seek.bind('mousedown', startSeek);
                    acorn.$seek.bind('mouseup', endSeek);

                } else {

                    // set up the slider options for the jQuery UI slider
                    var sliderOptions = {
                        value: 0,
                        step: 1,
                        orientation: 'horizontal',
                        range: 'min',
                        min: 0,
                        max: duration,
                        slide: startSeek,
                        stop: endSeek
                    };
                    // init the jQuery UI slider
                    acorn.$seek.slider('option', sliderOptions);

                    // add valuetext value to the slider options for better ARIA values
                    sliderOptions.valuetext = ariaTimeFormat(sliderOptions.value);
                    // accessify the slider
                    initSliderAccess(acorn.$seek.find('.ui-slider-handle'), sliderOptions);

                    // show buffering progress on progress
                    acorn.$self.bind('progress', showBuffer);
                }

                // remove the loading element
                acorn.$self.next('.loading-media').remove();

            };

            /*
             * Show buffering progress
             */
            var showBuffer = function (e) {
                var max = parseInt(acorn.$self.prop('duration'), 10);
                var tr = this.buffered;
                if (tr && tr.length) {
                    var buffer = parseInt(this.buffered.end(0) - this.buffered.start(0), 10);
                    var bufferWidth = (buffer * 100) / max;
                    acorn.$buffer.css('width', bufferWidth + '%');
                }
            };

            /*
             * VOLUME BUTTON and SLIDER Behaviour
             *
             * Change volume using the Volume Slider
             * Also update ARIA attributes and set the volume value
             */
            var changeVolume = function (e, ui) {
                // get the slider value
                volume = ui.value;
                // check if the volume was muted before
                if (acorn.$self.prop('muted')) {
                    acorn.$self.prop('muted', false);
                    acorn.$volumeBtn.removeClass('acorn-volume-mute');
                    acorn.$volumeBtn.text(text.mute).attr('title', text.muteTitle);
                }
                // set the new volume on the media
                acorn.$self.prop('volume', volume);
                // set the ARIA attributes
                acorn.$volume.$handle.attr("aria-valuenow", Math.round(volume * 100));
                acorn.$volume.$handle.attr("aria-valuetext", 'Volume' + Math.round(volume * 100) + ' percent ');
            };
            /*Function for volume increse/decrease through increment decrement buttons*/
            var setVol = function (value) {
				$("#minusImg").hide();
				$("#plusImg").hide();
                var vol = volume;
                vol += value;
                //  test for range 0 - 1 to avoid exceptions
                if (vol >= 0 && vol <= 1) {
                    // if valid value, use it
                    volume = vol;
                } else {
                    // otherwise substitute a 0 or 1
                    volume = (vol < 0) ? 0 : 1;
                }
                // check if the volume was muted before
                if (acorn.$self.prop('muted')) {
                    acorn.$self.prop('muted', false);
                    acorn.$volumeBtn.removeClass('acorn-volume-mute');
                    acorn.$volumeBtn.text(text.mute).attr('title', text.muteTitle);
                }
                // set the new volume on the media
                acorn.$self.prop('volume', volume);
                acorn.$volume.slider('value', volume);
                // set the ARIA attributes
                acorn.$volume.$handle.attr("style", 'left:' + Math.round(volume * 100) + '%');
                acorn.$volume.$handle.attr("aria-valuenow", Math.round(volume * 100));
                acorn.$volume.$handle.attr("aria-valuetext", 'Volume' + Math.round(volume * 100) + ' percent');
            };
            /*
             * Mute and Unmute volume
             * Also add classes and change label on the Volume Button
             */
            var muteVolume = function () {
                if (acorn.$self.prop('muted') === true) {
                    acorn.$self.prop('muted', false);
                    if (options.nativeSliders) {
                        acorn.$volume.val(volume);
                    } else {
                        acorn.$volume.slider('value', volume);
                    }
                    acorn.$volumeBtn.removeClass('acorn-volume-mute');
                    acorn.$volumeBtn.text(text.mute).attr('title', text.muteTitle);
                    acorn.$volume.$handle.attr("aria-valuenow", Math.round(volume * 100));
                    acorn.$volume.$handle.attr("aria-valuetext", 'Volume' + Math.round(volume * 100) + ' percent');
                } else {
                    acorn.$self.prop('muted', true);
                    if (options.nativeSliders) {
                        acorn.$volume.val('0');
                    } else {
                        acorn.$volume.slider('value', '0');
                    }
                    acorn.$volumeBtn.addClass('acorn-volume-mute');
                    acorn.$volumeBtn.text(text.unmute).attr('title', text.unmuteTitle);
                    acorn.$volume.$handle.attr("aria-valuenow", '0');
                    acorn.$volume.$handle.attr("aria-valuetext", 'Volume' + '0' + ' percent');
                }
            };

            /*
             * Init the Volume Button and Slider
             *
             * Attach events, create the jQuery UI Slider for the Volume Slider and add ARIA support
             */
            var initVolume = function () {
                if (options.nativeSliders) {
                    acorn.$volume.bind('change', function () {
                        acorn.$self.prop('muted', false);
                        volume = acorn.$volume.val();
                        acorn.$self.prop('volume', volume);
                    });
                } else {
                    var volumeClass = acorn.$volume.attr('class');
                    var divVolume = '<div class="' + volumeClass + '" title="' + text.volumeTitle + '"tabindex="6"><img src="images/triangleGreen.png" style="position:absolute;"/><img src="images/backgroundVolume.png" style="position: absolute;z-index: -1;cursor: default;"/></div>';
                    acorn.$volume.after(divVolume).remove();
                    acorn.$volume = $('.' + volumeClass, acorn.$container);
                    var volumeSliderOptions = {
                        value: volume,
                        orientation: options.volumeSlider,
                        range: "min",
                        max: 1,
                        min: 0,
                        step: 0.1,
                        animate: false,
                        slide: changeVolume
                    };
                    acorn.$volume.slider(volumeSliderOptions);
                    acorn.$volume.$handle = acorn.$volume.find('.ui-slider-handle');
                    // change and add values to volumeSliderOptions for better values in the ARIA attributes
                    volumeSliderOptions.max = 100;
                    volumeSliderOptions.value = volumeSliderOptions.value * 100;
                    volumeSliderOptions.valuetext = 'Volume' + volumeSliderOptions.value + ' percent';
                    initSliderAccess(acorn.$volume.$handle, volumeSliderOptions);
                }
                acorn.$volumeBtn.click(muteVolume);
            };
            /*
             * Initialization self-invoking function
             * Runs other initialization functions, attaches events, removes native controls
             */
            var init = function () {
                // attach playback handlers
                acorn.$playBtn.bind((is_touch_device) ? 'touchstart' : 'click', playMedia);
                acorn.$replayBtn.bind((is_touch_device) ? 'touchstart' : 'click', replayMedia);
                acorn.$self.bind((is_touch_device) ? 'touchstart' : 'click', playMedia);

                acorn.$self.bind('replay', replayPlayback);
                acorn.$self.bind('play', startPlayback);
                acorn.$self.bind('pause', stopPlayback);
                acorn.$self.bind('ended', endPlayback);

                // update the Seek Slider when timeupdate is triggered
                acorn.$self.bind('timeupdate', seekUpdate);

                // initialize volume controls
                initVolume();

                // add the loading class
                $wrapper.addClass('');

                if (!options.nativeSliders) initSeek();

                // once the metadata has loaded
                acorn.$self.bind('loadedmetadata', function () {
                    /* I use an interval to make sure the video has the right readyState
                     * to bypass a known webkit bug that causes loadedmetadata to be triggered
                     * before the duration is available
                     */
                    /*Function for forward & backward button*/
                    var videoLength = acorn.$self[0].duration;
                    var valueChange = parseFloat(videoLength * 0.05);
                    $("#back").click(function () {
                        acorn.$self[0].currentTime -= valueChange;
                    });
                    $("#forward").click(function () {
                        acorn.$self[0].currentTime += valueChange;
                    });
                    var t = window.setInterval(function () {
                        if (acorn.$self[0].readyState > 0) {
                            updateSeek();
                            clearInterval(t);
                        }
                    }, 500);
                });

                // trigger update seek manualy for the first time, for iOS support
                updateSeek();

                // remove the native controls
                acorn.$self.removeAttr('controls');
                if (acorn.$self.is('audio')) {
                    /*
                     * If the media is <audio>, we're adding the 'audio-player' class to the element.
                     * This is because Opera 10.62 does not allow the <audio> element to be targeted by CSS
                     * and this can cause problems with themeing.
                     */
                    acorn.$container.addClass('audio-player');
                }

            }();
            /* Window events i.e. keyboard shortcuts */
            $(window).keydown(function (e) {
                var keyCode = e.keyCode;
                var videoLength = acorn.$self[0].duration;
                var valueChange = parseFloat(videoLength * 0.05);
                if (keyCode == 82) {
                    replayMedia();
                } else if (keyCode == 80) {
                    playMedia();
                } else if (keyCode == 66) {
                    acorn.$self[0].currentTime -= valueChange;
                } else if (keyCode == 70) {
                    acorn.$self[0].currentTime += valueChange;
                } else if (keyCode == 77) {
                    muteVolume();
                } else if (keyCode == 189) {
                    setVol(-0.1);
                } else if (keyCode == 187) {
                    setVol(0.1);
                } 
            });
        };
        // iterate and reformat each matched element
        return this.each(acornPlayer);
    };

})(jQuery);