Zero.PageMainController = (function(module){
	var view = {},
	    
	    config = {
	    },
	
	    _render = function(){
	    	_postRender();
	    },
	    
	    _postRender = function(){
	       _paintMain();
	       _handlers();
	    },
	    
	    _handlers = function(){
	    	
	    };
	    
	    _paintMain = function(){
	    	$(function() {
	    		Zero.ChartsController.initialize();
				Zero.Calendar.init($('#calendarHolder'));
			})
	    },
	    
	    _setParams = function(param){
	    	
	    }
	    
	view.initialize = function(param){
		
		_render();
	};
	
	return view;
}(Zero));
