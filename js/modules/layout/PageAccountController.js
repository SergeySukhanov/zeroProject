Zero.PageAccountController = (function(module){
	var view = {},
	
	    config = {
		
	    },
	
	    _render = function(){
			$(function() {
				Zero.GoogleAccount.init($('#accountBlock'));
				Zero.Calendar.init($('#calendarHolder'));
			})			
	    },
	    
	    _postRender = function(data){
	       _handlers();
	    },
	    
	    _handlers = function(){
	    	
	    };
	    
	    _paintAccount = function(){

	    },

	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));
