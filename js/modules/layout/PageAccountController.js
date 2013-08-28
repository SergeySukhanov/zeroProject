Zero.PageAccountController = (function(module){
	var view = {},
	
	    config = {
		
	    },
	
	    _render = function(){
			$(function() {
				Zero.GoogleAccount.init($('#accountBlock'));
			})			
	    },
	    
	    _postRender = function(data){
	       _handlers();
	    },
	    
	    _handlers = function(){
	    	
	    };
	    
	    _paintView = function(){

	    },

	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));
