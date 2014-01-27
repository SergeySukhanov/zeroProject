Zero.ChartsController = (function(module){
	var view = {},
        tokens = module.getTokens(),
        _wrapCurrent,
        _wrapWeek,
        now = Math.round(new Date().getTime()/1000),
        week = 604800,
        start,
        finish,
        dataType,
        zero = "heartRate, steps, deepSleep, lightSleep, floors, hydration, currWeight",
        nike = "nikeSteps, nikeCalories, nikeFuel",
        fitbit = "fitbitCalories, fitbitSteps, fitbitDistance, fitbitFloors",
        jawbone = "jawboneSteps",

	    _getCharts = function(nowFlag, dataType, holder){
            if(nowFlag){
	    	   start = Math.round(new Date().getTime()/1000)-week;
	    	   finish = now;
            }else{
            	start = Math.round(new Date().getTime()/1000)-(week*2);
	    	    finish = now-week;
            }

			try{
				$.ajax({
					beforeSend: function (request) {
					   request.setRequestHeader("Access-Token", tokens.accessToken);
				    },	
					url:initConfiguration.apiUrl+'getChartsData',
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
						onJsGraphDataLoad(holder, data, nowFlag);
						if(nowFlag){
						   Zero.EventChartsController.initialize(initConfiguration.settingsData.visibleCalendarIds, start, finish);
                            $('.daily').empty();
                                Zero.DailyController.init(data);
						}
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
	    
	    _handlers = function(){
	    	$('.switch').on('click', function(event){
	    		var type = $(event.currentTarget).attr('id');
	    		_initNewCharts(type);
	    	});
        },
	    
	    _initNewCharts = function(type){
           var dataType;
           
	    	switch(type){
	    		case 'zero': dataType = zero;
	    		break;
	    		case 'nike': dataType = nike;
	    		break;
	    		case 'fitbit': dataType = fitbit;
	    		break;
                case 'jawbone':dataType = jawbone;
                break;
	    	}
	    	_getCharts(true, dataType, _wrapCurrent);
		    _getCharts(false, dataType, _wrapWeek);
	    	
        },

        _setParam = function(wrapCurrent, wrapWeek){
            _wrapCurrent = wrapCurrent;
            _wrapWeek = wrapWeek;
        };
	view.initialize = function(wrap1, wrap2){
        _setParam(wrap1, wrap2);
		dataType = nike;
		_getCharts(true, dataType, _wrapCurrent);
		_getCharts(false, dataType, _wrapWeek);
		_handlers();
	};	
	return view;
}(Zero));
