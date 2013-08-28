Zero.PageChartsController = (function(module){
	var view = {},
	
	    config = {},
	
	    _render = function(){
	       _postRender();
	    },
	    
	    _postRender = function(data){
	       _paintCharts();
	       // _handlers();

	    },
	    
	    _handlers = function(){
	    	
	    },
	    
	    _paintCharts = function(){
	      $('#diagramHolder').text('this place for class');
	    };
	    
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));