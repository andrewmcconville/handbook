// JavaScript Document


jQuery(document).ready(function($) {
	
	var feedbackCounter = 0;
	var audioClipArray = new Array();
	var activeTeacher = 0;
	
	/*
	 * Reset
	 */
	$('#nav-module-inner li').on('click touch', function() {
		$('.document-covers li').show();
		$('.document-citations li').hide();
		/*
		for(var i = 0; i < audioClipArray.length; i++) {
			var audioPreload = null;
			audioPreload = $('.audio-feedback ul').eq(0).find('li').eq(audioClipArray[i]).find('audio').get(0);
			audioPreload.load();
			audioPreload = $('.audio-feedback ul').eq(1).find('li').eq(audioClipArray[i]).find('audio').get(0);
			audioPreload.load();
		}
		*/
		partialReset();
	});
	
	//reset
	function partialReset() {
		$('.back-button').hide();
		$('.done-button').show();
		$('.document-covers').animate({opacity:'1'});
		$('.audio-feedback-wrapper').fadeOut(250);
		$('.document-citations').addClass('hover-enabled');
		$('.document-covers li').draggable('enable');
		$('.audio-clips-wrapper').hide();
		$('.student-intro').show();
		$('.audio-speaker p a').removeClass('active');
		$('.audio-feedback-wrapper > p').show();
		$('.add-sources-warning').hide();
		$('.help-button').show();
		feedbackCounter = 0;
		for(var i = 0; i < audioClipArray.length; i++) {
			$('iframe[src="player/m02_t00_s01_c0' + i + '.html"]').contents().find(".acorn-paused-button").click();
			$('iframe[src="player/m02_t01_s01_c0' + i + '.html"]').contents().find(".acorn-paused-button").click();
		}
	}
	
	/*
	 * Drad and drop
	 */
	$(function() {
		$('.document-covers li').draggable({
			revert: true,
			revertDuration: 500,
			stop: revertPosition
		});
	});
	
	$('.document-covers li').on( "dragstart", function() {
		$('.document-cover-details li').hide();
		$('.add-sources-warning').hide();
	});

	 $('.document-citations').droppable({
		drop: function( event, ui ) {
			$('.document-citations li').eq($(ui.draggable).index()).slideDown(500);
			$('.document-covers li').eq($(ui.draggable).index()).hide();
		}
	});



	/*
	 * Remove positioning
	 * Rotated elements wouldn't go back to their exact spot after being dragged
	 */
	function revertPosition() {
		$('.document-covers li').css({top:'', left:''});
	}
	
	
	
	/*
	 * Remove citation from works cited paper
	 */	
	$('.document-citations li a').on('click touch', function() {
		$(this).parent().slideUp(500);
		$('.document-covers li').eq($(this).parent().index()).fadeIn(500);
	});
	
	
	
	/*
	 * Source Pop-ups
	 */
	var isDragging = false;
	
	$('.document-covers li')
	.mousedown(function() {
    $(window).mousemove(function() {
			isDragging = true;
			$(window).unbind("mousemove");
    });
	}).mouseup( function() {
    var wasDragging = isDragging;
    isDragging = false;
		$(window).unbind("mousemove");
		if(!wasDragging) {
			if($('.document-cover-details li').eq($(this).index()).is(':hidden')) {
				$('.document-cover-details li').hide();
				$('.document-cover-details li').eq($(this).index()).show();
				$('.add-sources-warning').hide();
			}
			else {
				$('.document-cover-details li').eq($(this).index()).fadeOut(250);
			}
		}
	});
	
	//close pup-ups
	$('.document-cover-details li a').on('click touch', function() {
		$(this).parent().fadeOut(250);
	});
	
	
	
	/*
	 * help popup
	 */
	$('.help-button').on('click touch', function() {
		if($('.directions').height() < 108) {
			$('.directions').animate({height:'108px'}, 250);
			$('.add-sources-warning').hide();
		}
		else {
			$('.directions').animate({height:'0px'}, 250);
			$('.add-sources-warning').hide();
		}
	});
	
	
	
	
	/*
	 * Audio clips
	 */
	$('.done-button').on('click touch', function() {
		//check if media has been added
		var noSourcesAdded = true;
		for(var i = 0; i < $('.document-citations ul li').length; i++) {
			if($('.document-citations ul li').eq(i).is(':visible')) {
				noSourcesAdded = false;
			}
		}
		
		if(noSourcesAdded) {
			$('.add-sources-warning').show();
		}
		else {
			$('.help-button').fadeOut(250);
			audioClipArray = [];
			feedbackCounter = 0;
			$(this).hide();
			$('.back-button').show();
			$('.document-citations').removeClass('hover-enabled');
			$('.document-covers').animate({opacity:'.25'});
			$('.audio-feedback-wrapper').fadeIn(250);
			$('.student-intro').hide();
			
			$('.document-covers li').draggable('disable');
			
			//1. teacher intro always goes first
			audioClipArray[0] = 0;
			
			//2. add user selected citations to audio queue		
			for(var i = 0; i < $('.document-citations ul li').length; i++) {
				if($('.document-citations ul li').eq(i).is(':visible')) {
					audioClipArray.push(i + 1);
				}
			}
			
			//3. add teacher midpoint (the sources you didn't pick intro)
			audioClipArray.push(8);
			
			//4. add user omitted citations to audio queue
			for(var i = 0; i < $('.document-citations ul li').length; i++) {
				if($('.document-citations ul li').eq(i).css('display') == 'none') {
					audioClipArray.push(i + 1);
				}
			}
		}
	});
	
	//play the organized tracks	
	$('.audio-speaker p a').on('click touch', function() {
		activeTeacher = $(this).parent().index();
		feedbackCounter = 0;
		for(var i = 0; i < audioClipArray.length; i++) {
			$('iframe[src="player/m02_t00_s01_c0' + i + '.html"]').contents().find(".acorn-paused-button").click();
			$('iframe[src="player/m02_t01_s01_c0' + i + '.html"]').contents().find(".acorn-paused-button").click();
		}
		$('.audio-speaker p a').removeClass('active');
		$(this).addClass('active');
		$('.audio-clips-wrapper').show();
		$('.teacher-photo img').css({left: ($(this).parent().index() * -90) + 'px'});
		$('.audio-feedback ul').hide();
		$('.audio-feedback ul').eq($(this).parent().index()).show();
		$('.audio-feedback-wrapper > p').hide();
		
		playAudio(feedbackCounter);
	});
	
	//play tracks one after another
	function playAudio(counter) {
		//stop all audio
		for(var i = 0; i < audioClipArray.length; i++) {
			$('iframe[src="player/m02_t00_s01_c0' + i + '.html"]').contents().find(".acorn-paused-button").click();
			$('iframe[src="player/m02_t01_s01_c0' + i + '.html"]').contents().find(".acorn-paused-button").click();
		}
		$('.audio-images li').hide();
		$('.audio-feedback li').hide();
		$('.audio-breadcrumb li a').removeClass('active');
		
		if(counter < audioClipArray.length) {
			$('.audio-images li').eq(audioClipArray[counter]).show();
			$('.audio-feedback ul').eq(activeTeacher).find('li').eq(audioClipArray[counter]).show();
			$('.audio-breadcrumb li a').eq(counter).addClass('active');

			$('iframe[src="player/m02_t0' + activeTeacher + '_s01_c0' + audioClipArray[counter] + '.html"]').contents().find(".acorn-play-button").click();
			
			$('iframe[src="player/m02_t0' + activeTeacher + '_s01_c0' + audioClipArray[counter] + '.html"]').contents().find('audio').on('ended', function() {
				playAudio(counter + 1);
			});
		}
	}
	
	//jump between tracks
	$('.audio-breadcrumb li a').on('click touch', function() {
		feedbackCounter = $(this).parent().index();
		playAudio(feedbackCounter);
	});	
	
	
	/*
	 * back button
	 */
	$('.back-button').on('click touch', function() {
		partialReset();
	});
});


