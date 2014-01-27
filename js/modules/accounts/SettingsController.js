Zero.SettingsController = (function(module){
	var view = {},
	
	    config = {
		
	    },
	
	    _render = function(){
		   try{
	    		$.ajax({
	       	       url:initConfiguration.apiUrl+'settings',
	       	       dataType:'json',
	       	       success:function(data){
	       	     	_postRender(data);
	       	       }
	           });
	    	}catch(e){
	    		console.log(e);
	    	}
	    },
	    
	    _postRender = function(data){
	       _paintTitle(data);
	       _handlers();
	    },
	    
	    _handlers = function(data){
	    	//console.log(data);
	    };
	    
	    _paintSettings = function(){
           
             
	    };
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));
