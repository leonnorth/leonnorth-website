//collapse the nav bar when something is clicked or mouse out.
$(document).ready(function () {
  $(".navbar-nav li a").click(function(event) {
    $(".navbar-collapse").collapse('hide');
  });
  $(".navbar-nav").mouseleave(function(event) {
    $(".navbar-collapse").collapse('hide');
  });
});

( function( $ ) {
	
	// Setup variables
	$window = $(window);
	$slide = $('.homeSlide');
	$body = $('body');
	

	
	function adjustWindow(){
		// Init Skrollr
		var s = skrollr.init({
		    forceHeight: false
		});
	 
		// Get window size
	    winH = $window.height();
	    
	    // Keep minimum height 550
	    if(winH <= 550) {
			winH = 550;
		} 
	    
	    // Resize our slides
	    $slide.height(winH);
	    
	    // Refresh Skrollr after resizing our sections
		s.refresh($('.homeSlide'));
	}
		
} )( jQuery );