Zero.EventChartsController = (function(module){
	var view = {},
	
	    config = {
	    	
	    },
	
	    _render = function(){
	       _postRender();
	    },
	    
	    _postRender = function(data){
	       _paintEventCharts();
	       // _handlers();

	    },
	    
	    _handlers = function(){
	    	
	    },
	    
	    _paintEventCharts = function(){
	    	var paperDOM = $('#diagramEventHolder');
               var paper = Raphael(paperDOM, paperDOM.width(), paperDOM.height());
	    };
	    
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));