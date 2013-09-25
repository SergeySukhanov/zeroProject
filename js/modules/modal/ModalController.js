Zero.ModalController = (function(module){
	var view  = {},
	
	    config = {
	    	
	    },
	    
		popup = null,
		
		
	    _create = function(id){
	    	var heightOuter= $('#wrapper').outerHeight() + $('.footer').outerHeight();
	    	var layout = $('<div/>').addClass('layout-popup').addClass('popup').css({
	    		                                                                   'height':heightOuter,
	    		                                                                   'z-index':10000, 
	    		                                                                   'width':'100%',
	    		                                                                   'position':'absolute',
	    		                                                                   'top':0, 
	    		                                                                   'background-color':'#333333', 
	    		                                                                   'opacity':0.5
	    	                                                                    });
	    	// var crossClose = $('<span/>').addClass('cross-close').addClass('popup');
	    	var outerPopupContainer = $('<div/>').addClass('popup-container').addClass('popup').attr('id', id);
	    	var header = $('<div/>').addClass('header-popup-inner');
	    	var content = $('<div/>').addClass('content-popup-inner');
	    	var footer = $('<div/>').addClass('footer-popup-inner');
	    	
	    	outerPopupContainer.append(header);
	    	outerPopupContainer.append(content);
	    	outerPopupContainer.append(footer);
	    	
	    	
	    	// layout.append(crossClose);
	    	$('body').append(layout);
	    	$('body').append(outerPopupContainer);
	    	_handlers();
	    	
			outerPopupContainer.setHeader = function(text) {
				var header = $('.header-popup-inner', outerPopupContainer);
					header.html(text);				
			}
			
			outerPopupContainer.setContent = function(text) {
				var content = $('.content-popup-inner', outerPopupContainer);
					content.html(text);	    	    
				
			}			
			
			outerPopupContainer.setFooter = function(text) {
				var footer = $('.footer-popup-inner', outerPopupContainer);
					footer.html(text);				
			}			
			
			outerPopupContainer.setWidth = function(w) {
				outerPopupContainer.width(w);
				outerPopupContainer.css('marginLeft', w/2*(-1));
			}
			
			outerPopupContainer.show = function() {
				_show();
			}
			
			popup = outerPopupContainer;
			
	    	return outerPopupContainer;
	    },
	    
	    _handlers = function(){
	    	$('.layout-popup').bind('click', function(event){
	    		_hide();
	    	});
	    	
	    	
	    	$(document).bind('keyup', function(event){
	    		if(event.keyCode == 27){
	    			$('.layout-popup').trigger('click');
	    		}
	    	});
	    },
	    
	    _destroy = function(){
	    	$('.popup').remove();
	    },
	    
	    _show = function(){
	    	$('.popup').fadeIn(200);
	    	console.log('show');
	    },
	    
	    _hide = function(){
	    	$('.popup').fadeOut(200);
	    	console.log('hide');
			_destroy();
	    };
	    
	    view.getPopup = function(id){
	    	var elemPopup = $('#'+id);
	    	if(elemPopup.length == 0){
	    		return _create(id);
	    	}else{
	    	   return popup;
	    	}
	    };
	    
	    view.setPopupHeader = function(context){
	    	var header = $('.header-popup-inner');
	    	    header.html(context);
	    };
	    
	    view.setPopupContent = function(context){
	    	var content = $('.content-popup-inner');
	    	    content.html(context);	    	    
	    };
	    
	    view.setPopupFooter = function(config){
	    	var footer = $('.footer-popup-inner');
	    	    footer.html(context);
	    };
	
	return view;
}(Zero));