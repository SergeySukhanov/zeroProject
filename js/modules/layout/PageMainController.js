Zero.PageMainController = (function(module){
	var view = {},
	
	    _param,
	    
	    config = {
	    },
	
	    _render = function(){
	    	_postRender();
	    },
	    
	    _postRender = function(){
	       _paintView();
	       _handlers();
	    },
	    
	    _handlers = function(){
	    	
	    };
	    
	    _paintView = function(){
	    	//header
           var header = Zero.HeaderController;
               header.initialize();
           //mainContent
           var content = Zero[_param];
              content.initialize();
           //footer
           var footer = Zero.FooterController;
               footer.initialize();
	    },
	    
	    _setParams = function(param){
	    	_param = param
	    }
	    
	view.initialize = function(param){
		_setParams(param);
		_render();
	};
	
	return view;
}(Zero));
