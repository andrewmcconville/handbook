// JavaScript Document

	
jQuery(document).ready(function($) {
	
	/*
	 * Browser detect
	 */
	if (!supportsVideo()) {
		$('<div id="unsupported"><p>We\'re sorry, your browser doesn\'t support the capabilities of this module.</p></div>').appendTo(document.body);
	}
	function supportsVideo() {
		var elem = document.createElement('video'),
			bool = false;
	
		// IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
		try {
			if ( bool = !!elem.canPlayType ) {
				bool      = new Boolean(bool);
				bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"');
	
				// Workaround required for IE9, which doesn't report video support without audio codec specified.
				//   bug 599718 @ msft connect
				var h264 = 'video/mp4; codecs="avc1.42E01E';
				bool.h264 = elem.canPlayType(h264 + '"') || elem.canPlayType(h264 + ', mp4a.40.2"');
	
				bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"');
			}
	
		} catch(e) { }
	
		return bool;
	}


	/*
	 * Remove and Add highlight to module nav buttons on left vertical bar
	 */
	$('#nav-module-inner li').on('click touch', function() {
		$('#nav-module-inner li').removeClass("selected");
		$('#nav-module-inner li button').attr('aria-pressed', 'false');
		$(this).addClass("selected");
		$('button', this).attr('aria-pressed', 'true');
		$('#content-inner .toggle-main-content').hide();
		$('#content-inner > ul').eq($(this).parent().index('#nav-module-inner ul')).find('.toggle-main-content').eq($(this).index()).show();
	});
	
	//prevent default anchor functionality for use with aria named anchors
	
		// $('a').on('click touch', function(e){
		// 	e.preventDefault();
		// });
	
});