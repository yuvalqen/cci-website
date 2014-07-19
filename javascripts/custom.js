//Interio Theme javascripts //
//////////////////////////////
// Author: Tohid Golkar //////
// Dec 2012 //////////////////

jQuery(document).ready(function($) {
	
	"use strict";
	//build dropdown
	$('<div class="respo_menu"><select /></div>').appendTo("nav.main");
	
	// Create default option "Go to..."
	$("<option />", {
		"selected": "selected",
		"value"   : "",
		"text"    : "Go to..."
	}).appendTo("nav select");	
	
	// Populate dropdowns with the first menu items
	$("nav li a").each(function() {
		var el = $(this);
		var elt = el.text();
		
		// Removing the extra » symbol
		elt = elt.replace("»","");

		if($(el).parents('ul ul ul ul').length >= 1) {
			$('<option />', {
				'value'   : el.attr('href'),
				'text'    : '  └─ ' + elt
			}).appendTo('nav select');
		}
		else if($(el).parents('ul ul ul').length >= 1) {
			$('<option />', {
				'value'   : el.attr('href'),
				'text'    : '└─ ' + elt
			}).appendTo('nav select');
		}
		else if($(el).parents('ul ul').length >= 1) {
			$('<option />', {
				'value'   : el.attr('href'),
				'text'    : ' ─ ' + elt
			}).appendTo('nav select');
		}
		else {
			$('<option />', {
				'value'   : '',
				'text'    : ''
			}).appendTo('nav select');
			
			$('<option />', {
				'value'   : el.attr('href'),
				'text'    : elt
			}).appendTo('nav select');
		}
	});

	
	// Call Superfish Dropdown Menu
	try {
		$('ul.sf-menu').superfish();
	} catch(e){}
	
	//make responsive dropdown menu actually work			
	$("nav select").change(function() {
		window.location = $(this).find("option:selected").val();
	});


	// GO TO TOP /////////////////////
	try {
		$("a[href='#top']").click(function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	} catch(e){}
	
	
	
	
	// Setting the Sticky Menu 
	try{
	
		stickyMenu(jQuery);

	}catch(e){}
	
	
	
	// Changing data-rel= to rel= for HTML5 validation
	try{
	
		$('a[data-rel]').each(function() {
			$(this).attr('rel', $(this).data('rel'));
		}); 

	}catch(e){}
	
	
	
	// hook lightbox function
    _lightbox();

	
//End Document.ready//
});




jQuery(window).load(function(){
	
	"use strict";
	try {
		_setOverlay2(jQuery);
		}catch(e){}
	
	try {
    jQuery('.bwWrapper').BlackAndWhite({
        hoverEffect : true, // default true
        // set the path to BnWWorker.js for a superfast implementation
        webworkerPath : false,
        // for the images with a fluid width and height 
        responsive:true,
        // to invert the hover effect
        invertHoverEffect: false,
        speed: { //this property could also be just speed: value for both fadeIn and fadeOut
            fadeIn: 200, // 200ms for fadeIn animations
            fadeOut: 500 // 800ms for fadeOut animations
        }
    });
	}catch(e){}
	
});



// Set Left and Top for Overlay icon in Blog Thumbnails //////////
function _setOverlay2($){
	"use strict";
	try{

		$('figure a').hover(function() {
			$(this).find('.overlay')
				.css('width',$(this).children('img').width())
				.css('height',$(this).children('img').height())
				.stop().animate({'opacity' : 1}, 200, 'easeOutCubic');
			
			$(this).find('span').stop().animate({'left' : $(this).children('img').width()/2-20, 'opacity' : 1}, 300, 'easeOutCubic');
				
		}, function(){
			$(this).find('.overlay').stop().animate({'opacity' : 0}, 250, 'easeInCubic');
			$(this).find('span').stop().animate({'left' : $(this).children('img').width()+40, 'opacity' :1}, 300, 'easeInCubic' , function(){$(this).css('left','-40px');});          
		});
		
	}catch(e){}
	
	
	try {
		$('figure a').each(function(){
			$(this).find('span').css('top',$(this).height()/2-20 + 'px');
		});
		
		$('figure a').find('span').css('left',-40 + 'px');
	} catch(e){}

	
}


jQuery(window).resize(function() {
	"use strict";
	// Set new left for overlay icon on resizing
	try {
		_setOverlay2(jQuery);
		} catch(e){}
     

});




/*----------------------------------*/
/* Sticky Menu						*/
/* Version: 1.1						*/
/*----------------------------------*/
/* by: Tohid Golkar					*/
/* www.tohidgolkar.com				*/
/* Copyright 2013 Tohid Golkar		*/
/*----------------------------------*/

function stickyMenu($){
		
	"use strict";
	var nav = $('.main.band');

	if (nav.hasClass('sticky')){
		var of=0;
		var sticky_height=55;
		
		var isMargin = $('.wrap.boxed-margin').css('marginTop');
		var isBorder = $('.band.top_border').height();
		var isAdmin = $('#wpadminbar').height();
		
		var navHeight = nav.outerHeight();	
		var logo = $('h1.logo');
		var menu = $('.navbar');
		var menuMT = parseInt(menu.css('marginTop'),10);
		var logoIMG = $('h1.logo a img');
		var topCSS=0;var topCSS2=0;var fl=0;
		if (isBorder){topCSS=6;}
		if (isAdmin){topCSS2=parseInt(isAdmin,10);}
		if (isMargin){topCSS=topCSS+parseInt(isMargin,10);}

		fl=parseInt(navHeight-sticky_height+topCSS,10);
	
        $(window).scroll(function(){
				
			var st = $(window).scrollTop();

				if ( st > topCSS && st < fl ){
					of = st-topCSS;
					nav.addClass('fixed').css('height',navHeight-of+'px').css('top',topCSS2+'px');
					logo.css('lineHeight',navHeight-of+'px');
					menu.css('marginTop',menuMT-(of/2)+'px');
					logoIMG.css('maxHeight',parseInt(0.9*(navHeight-of),10)+'px').css('top',topCSS2+'px');
					
                } else if (st>=fl){
					
					nav.addClass('fixed').css('height',sticky_height+'px').css('top',topCSS2+'px');
					logo.css('lineHeight',parseInt(sticky_height-5,10)+'px');
					menu.css('marginTop','6px');
					logoIMG.css('maxHeight','45px');
					
				}else{
					
					nav.removeClass('fixed').css('height',navHeight+'px').css('top','');
					logo.css('lineHeight','');
					menu.css('marginTop','');
					logoIMG.css('maxHeight','');
				
                }
        });
	}

}


/* lightbox settings */
function _lightbox(){
	
	"use strict";
	
	var lbarray = {			
		
		animation_speed: 'fast', // slow, normal and fast
		overlay_gallery: true,
		autoplay_slideshow: false,
		slideshow: 5000,
		theme: 'pp_default', // pp_default, light_rounded, dark_rounded, light_square, dark_square, facebook 
		opacity: 0.8,
		show_title: true,
		allow_resize: true,
		counter_separator_label: ' of ',
		deeplinking: false,
		default_width: 900,
		default_height: 500
	};

	jQuery('a[href$=jpg], a[href$=JPG], a[href$=jpeg], a[href$=JPEG], a[href$=png], a[href$=gif], a[href$=bmp]:has(img), a[class^="prettyPhoto"]').prettyPhoto(lbarray);

	
	// Desable lightbox on small devices 
	/*
	var windowWidth = 	window.screen.width < window.outerWidth ?
						window.screen.width : window.outerWidth;
	var issmall = windowWidth < 500;
	
	if(issmall){
		jQuery('a[href$=jpg], a[href$=JPG], a[href$=jpeg], a[href$=JPEG], a[href$=png], a[href$=gif], a[href$=bmp]:has(img), a[class^="prettyPhoto"]').unbind('click.prettyphoto');
	}
	*/

}
   