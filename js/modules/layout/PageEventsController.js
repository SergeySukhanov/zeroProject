Zero.PageEventsController = (function(module){
	var view = {},
	
	    config = {
		
	    },
	
	    _render = function(){
			$(function() {
				//Zero.Events.init($('#eventsBlockContent'))
				Zero.Week.init();
				
			})			
	    },
	    
	    _postRender = function(data){
	       _handlers();
	    },
	    
	    _handlers = function(){
	    	
	    };
	    
	    _paintEvents = function(){

	    },


		
		
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));
