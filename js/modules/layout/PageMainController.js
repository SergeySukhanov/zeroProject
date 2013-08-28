Zero.PageMainController = (function(module){
	var view = {},
	
	    config = {
		
	    },
	
	    _render = function(){
			$(function(){
				Zero.Calendar.init($('#calendarHolder'));		
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
