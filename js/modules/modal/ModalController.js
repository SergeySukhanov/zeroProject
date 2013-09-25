Zero.ModalController = (function(module){
	var view  = {},
	
	    config = {
	    	
	    },
	    
	    _create = function(id){
	    	var heightOuter= $('#wrapper').outerHeight() + $('.footer').outerHeight();
	    	var layout = $('<div/>').addClass('layout-popup').addClass('popup').css({
	    		                                                                   'height':heightOuter,
	    		                                                                   'z-index':100000000, 
	    		                                                                   'width':'100%',
	    		                                                                   'position':'absolute',
	    		                                                                   'top':0, 
	    		                                                                   'background-color':'#333333', 
	    		                                                                   'opacity':0.5
	    	                                                                    });
	    	var crossClose = $('<span/>').addClass('cross-close').addClass('popup');
	    	var outerPopupContainer = $('<div/>').addClass('popup-container').addClass('popup').attr('id', id);
	    	
	    	layout.append(crossClose);
	    	$('body').append(layout);
	    	$('body').append(outerPopupContainer);
	    	_show();
	    },
	    
	    _handlers = function(){
	    	$('.cross-close').bind('click', function(event){
	    		_hide();
	    	});
	    	
	    	$(document).bind('keyup', function(event){
	    		if(event.keyCode == 27){
	    			$('.cross-close').trigger('click');
	    		}
	    	});
	    },
	    
	    _destroy = function(){
	    	
	    },
	    
	    _show = function(){
	    	$('.popup').fadeIn(200);
	    	console.log('show');
	    },
	    
	    _hide = function(){
	    	$('.popup').fadeOut(200);
	    	console.log('hide');
	    };
	    
	    view.getPopup = function(id){
	    	var elemPopup = $('#'+id);
	    	if(elemPopup.length == 0){
	    		_create(id);
	    		_handlers();
	    	}else{
	    	   _show();
	    	}
	    };
	    
	    view.setPopupHeader = function(wrap, context){
	    	var header = $('<div/>').addClass('header-popup');
	    	    header.html(context);
	    	    
	    	$(wrap).append(header);
	    };
	    
	    view.setPopupContent = function(wrap, context){
	    	var content = $('<div/>').addClass('content-popup');
	    	    content.html(context);
	    	    
	    	$(wrap).append(content);
	    };
	    
	    view.setPopupFooter = function(wrap, config){
	    	var footer = $('<div/>').addClass('footer-popup');
	    	    footer.html(context);
	    	    
	    	$(wrap).append(footer);
	    };
	
	return view;
}(Zero));