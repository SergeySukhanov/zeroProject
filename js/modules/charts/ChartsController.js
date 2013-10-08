Zero.ChartsController = (function(module){
	var view = {},
	
	    config = {
		
	    },
	    
	
	    _getCharts = function(nowFlag, dataType, holder){
	    	// Zero.Tools.date2timestamp(2013, 7,23, 0, 0, 0)               // Math.round(new Date().getTime()/1000)
               var now =Math.round(new Date().getTime()/1000);
               var week = 604800;            if(nowFlag){
	    	   var start = Math.round(new Date().getTime()/1000)-week;
	    	   var finish = now;	
            }else{
            	var start = Math.round(new Date().getTime()/1000)-(week*2);
	    	    var finish = now-week;	
            }
	    	
	    	
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
                          "duration":week,
                          "interval":15,  
                          "plots":dataType
                    }),
					success:function(data){
						console.log(data);
						onJsGraphDataLoad(holder, data, nowFlag);
						_postRender();
					},
					error:function(error){
						console.log(error);
					}
					
				})
			}catch(e){
				console.log(e);
			}		
	    },
	    
	    _getBasicDate = function(){
	    	var dateChart = new Date();
	    	
	    },
	    
	    _postRender = function(data){
	       _paintCharts();
	      
	    },
	    
	    _handlers = function(){
	    	$('.switch').on('click', function(event){
	    		var type = $(event.currentTarget).attr('id');
	    		_initNewCharts(type);
	    	});
	    };
	    
	    _paintCharts= function(){
             
	    },
	    
	    _initNewCharts = function(type){
           var dataType;
           
	    	switch(type){
	    		case 'zero': dataType = "heartRate, steps, deepSleep, lightSleep, floors, hydration, currWeight"
	    		break;
	    		case 'nike': dataType = "nikeSteps, nikeCalories, nikeFuel"
	    		break;
	    		case 'fitbit': dataType = "fitbitCalories, fitbitSteps, fitbitDistance, fitbitFloors"
	    		break;
	    	}
	    	_getCharts(true, dataType, '#diagramHolder');
		    _getCharts(false, dataType, '#yesterdayCharts');
	    	
	    }

	    
	view.initialize = function(){
		var dataType = "nikeSteps, nikeCalories, nikeFuel";
		_getCharts(true, dataType, '#diagramHolder');
		_getCharts(false, dataType, '#yesterdayCharts');
		_handlers();
	};	
	return view;
}(Zero));
