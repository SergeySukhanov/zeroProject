Zero.FooterController = (function(module){
	var view = {},
	
	    config = {},
	
	    _render = function(){
	       _postRender();
	    },
	    
	    _postRender = function(data){
	       _paintFooter();
	       // _handlers();

	    },
	    
	    _handlers = function(){
	    	
	    },
	    
	    _paintFooter = function(){
	       var footer = $('footer.footer');
	       
	       var copyRightWrapper = $('<div/>').addClass('copyright-wrapper');
	       var pCopy = $('<p/>').html('&copy; ZERO');
	           copyRightWrapper.append(pCopy);
	           
	           footer.append(copyRightWrapper);
	    };
	    
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));