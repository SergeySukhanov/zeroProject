Zero.ChartsSettings = (function(module){
	var view = {},
	
	    config = {
		
	    },
	
	    _render = function(){
		   _postRender();
	    },
	    
	    _postRender = function(data){
	       _paintChartsSettings();
	       _handlers();
	    },
	    
	    _handlers = function(){
	    	
	    };
	    
	    _paintChartsSettings = function(){
            var wrapper = $('#willPower');
            var wrapDiagram = $('.willpower-diagram');
            var wrapSettings = $('.sliders-settings');
            
            var actSettings = $('<div/>').addClass('act-settings');
            var liveSettings = $('<div/>').addClass('live-settings');
            var doSettings = $('<div/>').addClass('do-settings');
            
            
            
             
	    },
	    
	    _createSlider = function(){
	    	
	    }
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));
