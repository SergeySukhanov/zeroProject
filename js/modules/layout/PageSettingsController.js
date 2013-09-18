Zero.PageSettingsController = (function(module){
	var view = {},
	
	    config = {
		
	    },
	
	    _render = function(){
			Zero.Settings.init();
			_postRender();
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
