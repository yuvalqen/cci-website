jQuery(document).ready(function($){

	try {
		// Clone portfolio items to get a second collection for Quicksand plugin
		var $portfolioClone = $(".portfolio").clone();
		
		// Attempt to call Quicksand on every click event handler
		$(".filter a").click(function(e){
			
			$(".filter li").removeClass("current");	
			
			// Get the class attribute value of the clicked link
			var $filterClass = $(this).parent().attr("class");
	
			if ( $filterClass == "all" ) {
				var $filteredPortfolio = $portfolioClone.find("li");
			} else {
				var $filteredPortfolio = $portfolioClone.find("li[data-type~=" + $filterClass + "]");
			}
			
			// Call quicksand
			$(".portfolio").quicksand( $filteredPortfolio, { 
				duration: 800, 
				easing: 'easeInOutQuad' 
			}, function(){
				
						
				// Hook prettyPhoto Lightbox
				try {_lightbox();} catch(e){}
				
				_setOverlay();
				_setLeft();
				_setHeight()
			
			});
	
	
			$(this).parent().addClass("current");
	
			// Prevent the browser jump to the link anchor
			e.preventDefault();
		})
	} catch(e){}
	

});




jQuery(window).load(function () {

	 _setOverlay();
		
	 _setLeft();
	
	 _setFilters();
	 
	 _setHeight()
 
});


// Hover Overlay ////////////////
function _setOverlay(){
	
	try{
		
		jQuery('.portfolio-thumb a').hover(function() {
			jQuery(this).find('.overlay').stop().animate({'opacity' : 1}, 200, 'easeOutCubic');
			jQuery(this).find('span').stop().animate({'left' : jQuery(this).width()/2-20, 'opacity' : 1}, 300, 'easeOutCubic');
			
		}, function(){
			jQuery(this).find('.overlay').stop().animate({'opacity' : 0}, 250, 'easeInCubic');
			jQuery(this).find('span').stop().animate({'left' : jQuery(this).width()+40, 'opacity' :1}, 300, 'easeInCubic' , function(){jQuery(this).css('left','-40px');});          
		});
		
	}catch(e){}
	
}

// Set Left and Top for Overlay icon //////////
function _setLeft(){
	
	try {
		jQuery('.portfolio-thumb a').each(function(){
			
			jQuery(this).find('span').css('top',jQuery(this).height()/2-20 + 'px');
			
			//jQuery(this).find('img').load(function(){
				//jQuery(this).parent().find('span').css('top',jQuery(this).height()/2-20 + 'px');
			//});
			
		});
	} catch(e){}
	
	try {
		jQuery('.portfolio-thumb a').find('span').css('left',-40 + 'px');
	} catch(e){}
}

// Set Active Filters ///////////
function _setFilters(){
	
	try {
		jQuery('ul.filter li.all').show();
		
		jQuery('ul.portfolio li').each(function(){
		  var dt = jQuery(this).attr('data-type');
	
		  jQuery.each(dt.split(" ").slice(0,-1), function(i, j) {
				jQuery('ul.filter li.'+j).show();
		  });
		  
		});
	} catch(e){}
}

// Set Active Filters ///////////
function _setHeight(){
	
	try {
	
		// Reset Heights
		jQuery('ul.portfolio li').css('height', 'auto');
		
		var mh = 0 ;
		jQuery('ul.portfolio li').each(function(){
			
			var h = jQuery(this).height();
			if (h>=mh){mh=h;}
			
		});
	
		jQuery('ul.portfolio li').height(mh);
		
	} catch(e){}
}

jQuery(window).resize(function() {
	
	// Set new left for overlay icon on resizing
     _setLeft();
	 
	 // Set new Height for portfolio boxes on resizing
	 _setHeight()
	 
	 try {
	 	jQuery('ul.portfolio').css('height', 'auto');
	 } catch(e){}	 
});

