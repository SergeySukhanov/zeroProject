Zero.ChartsController = (function(module){
	var view = {},
	
	    config = {
		
	    },
	
	    _getCharts = function(){
	    	var start = 1375200000000;
	    	var finish = 1377014340000;
	    	var duration = finish - start;
	    	var listCharts = "nikeSteps, nikeCalories, nikeFuel";
	    	
	    	var tokkens = module.getTokens();	
			try{
				$.ajax({
					beforeSend: function (request) {
					   request.setRequestHeader("Access-Token", tokkens.accessToken);
				    },	
					url:initConfiguration.getChartsData(),
					type:'GET',
					dataType:'json',
					contentType:'aplication/json',
					data:({
                          "start":start, 
                          "direction":1, 
                          "duration":duration, 
                          "plots": listCharts
                    }),
					success:function(data){
						console.log(data);
						onJsGraphDataLoad(data);
					},
					error:function(error){
						console.log(error);
					}
					
				})
			}catch(e){
				console.log(e);
			}		
	    },
	    
	    _postRender = function(data){
	       _paintAccount();
	       _handlers();
	    },
	    
	    _handlers = function(){
	    	
	    };
	    
	    _paintCharts= function(){
            
	    },

	    
	view.initialize = function(){
		_getCharts();
	};	
	return view;
}(Zero));
