Zero.PageController = (function(module){
	var view = {},
	
	    _param,
	    
	    config = {
	    },
	    
	    tokkens = module.getTokens(),
	    
	    _render = function(){
	    	try{
	    		$.ajax({
	    		beforeSend: function (request) {
					   request.setRequestHeader("Access-Token", tokkens.accessToken);
				    },	
					url:initConfiguration.urlSettings,
					type:'GET',
					dataType:'json',
					contentType:'aplication/json',
					success:function(data){
						initConfiguration.settingsData = data.result;
						console.log(data.result);
						_postRender();
					},
					error:function(error){
						console.log(error);
					}
	    	    });
	    	}catch(e){
	    		console.log(e);
	    	}
	    },
	    
	    _delete = function(){
	    	try{
	    		$.ajax({
					url:initConfiguration.urlSettings,
					type:'DELETE',
					dataType:'json',
					contentType:'aplication/json',
					success:function(response){
						console.log(response);
						
					},
					error:function(error){
						console.log(error);
					}
	    	    });
	    	}catch(e){
	    		console.log(e);
	    	}
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