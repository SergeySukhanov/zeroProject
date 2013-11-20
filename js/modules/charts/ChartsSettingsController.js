Zero.ChartsSettings = (function(module){
	var view = {},
	
	    config = {
	       diagramTitle:'Zero <sup>o</sup> points week dynamics',
		   actTitle:"Act",
		   actP:"Use the sliders on the left to set your body targets, and the sliders on the right to set your schedule targets.",
		   liveTitle:"Live",
		   doTitle:"Do",
		   dataSliders:{}
		   
	    },
	    _liveSettings,
	    _doSettings,
	    
	    tokkens = module.getTokens(),
	    
	    _postRender = function(result){
	       _paintChartsSettings();
	       _handlers();
            _createCols($('.diagram-body'), result);
	       
	    },
	    
	    _handlers = function(){
	    	$('#reset-set').bind('click', function(event){
	    		event.preventDefault();
	    		_delete();
	    	});
        },
	    
	    _paintChartsSettings = function(){
            var wrapper = $('#willPower');
            var wrapDiagram = $('.willpower-diagram');
            var wrapSettings = $('.sliders-settings');
                wrapDiagram.empty();
                wrapSettings.empty();
            var actSettings = $('<div/>').addClass('act-settings');
            var liveSettings = $('<div/>').addClass('live-settings');
            var doSettings = $('<div/>').addClass('do-settings');
                _liveSettings = liveSettings;
                _doSettings = doSettings;
            
            var actH3 = $('<h3/>').text(config.actTitle);
            var actP = $('<p/>').text(config.actP);
                actSettings.append(actH3);
                actSettings.append(actP);
                
            var liveH3 = $('<h3/>').text(config.liveTitle);
                liveSettings.append(liveH3);
                
            var doH3 = $('<h3/>').text(config.doTitle);
                doSettings.append(doH3);
            
            var diagramH3 = $('<h3/>').html(config.diagramTitle);
            var diagramBody = $('<div/>').addClass('diagram-body');
            
            wrapDiagram.append(diagramH3);
            wrapDiagram.append(diagramBody);

            
            wrapper.append(wrapDiagram);


                  
	    },
	    
//	    _createSlider = function(wrap, data){
//	    	var wrapSlider = $('<div/>').addClass('layout-slider');
//	    	var inputSlider = $('<div/>').addClass('slider-filter').attr({
//	    		                             'id':data.filter,
//	    		                             'type':'slider',
//	    		                             'name':data.filter
//	    	                               });
//	    	var labelSlider = $('<label/>').text(initConfiguration.labelsSilder[data.filter]);
//
//	    	wrapSlider.append(inputSlider);
//	    	wrapSlider.append(labelSlider);
//	    	wrap.append(wrapSlider);
//	    	var currentStep;
//	    	switch(data.filter){
//	    		case "calories":currentStep = 100;
//	    		break;
//	    		case "steps":currentStep = 1000;
//	    		break;
//	    		case "distance":currentStep = 100;
//	    		break;
//	    		case "floors":currentStep = 10;
//	    		break;
//	    		case "itemsOnWorkDay":currentStep = 1;
//	    		break;
//	    		case "itemsOnPlayDay":currentStep = 1;
//	    		break;
//	    		case "itemsGap":currentStep = 10;
//	    		break;
//	    		case "itemsSteps":currentStep = 100;
//	    		break;
//	    	}
//
//           $('#'+data.filter).slider({
//           	    min: parseInt(data.min),
//           	    max: parseInt(data.max),
//           	    step: currentStep,
//           	    range: true,
//           	    values:[data.comfortMin, data.comfortMax],
//           	    create:function( event, ui ){
//           	    	var handlerLeft = $(event.target).children().eq(1);
//           	    	var handlerRight = $(event.target).children().eq(2);
//
//           	    	var popupHandlerLeft = $('<span/>').addClass('popup-handler').addClass('popup-handler-left').text(data.comfortMin);
//           	    	var popupHandlerRight = $('<span/>').addClass('popup-handler').addClass('popup-handler-right').text(data.comfortMax);
//
//           	    	handlerLeft.append(popupHandlerLeft);
//           	    	handlerRight.append(popupHandlerRight);
//           	    },
//           	    slide:function(event, ui){
//           	    	$(event.target).find('.popup-handler-left').text(ui.values[0]);
//           	    	$(event.target).find('.popup-handler-right').text(ui.values[1]);
//           	    },
//                stop: function( event, ui ){
//                   _formatDataSettings(event, ui);
//                }
//
//           	});
//	    },
	    
	    _createCols = function(wrap, config){
	    	wrap.empty();
	    	if(!config){
	    	  return false;
	    	}else{
	    		var diagramData = config;
	    	}
	    	if(diagramData.length == 0){
	    		wrap.hide();
	    		return false;
	    	}
	    	for(var j=0; j<diagramData.length; j++){
            	var diagramItemWrap = $('<div/>').addClass('diagram-item-wrap');
            	var diagramItem = $('<div/>').addClass('diagram-item');
            	var newDate = new Date(diagramData[j].date*1000);
            	var day = newDate.getDate();
		        var month = initConfiguration.monthShortList[newDate.getMonth()];
		        var formatDate = day + ' ' + month;
            	var diagramSubTitle = $('<span/>').addClass('diagram-sub-title').text(formatDate);
            	    
            	    diagramItemWrap.append(diagramItem);
            	    diagramItemWrap.append(diagramSubTitle);
            	    wrap.append(diagramItemWrap);
            	    
            	if(diagramData[j].energy > 0){
            		diagramItem.addClass('positive');
            	}else{
            		diagramItem.addClass('negative');
            	}
            	_createDiagramCol(diagramItem, diagramData[j]);
            	// console.log('done');

            }
            _calculate(diagramItem.parents('#willPower'), diagramData);
	    },
	    
	    _calculate = function(wrap, data){
	    	var wrapper = wrap;
	    	var data = data;
	    	var widthOuter = wrapper.outerWidth();
	    	var lengthDiagramItem = wrapper.find('.diagram-item-wrap').length;
	    	
	    	for(var i=0; i<lengthDiagramItem; i++){
                   
	    	}
        },
	    
	    _createDiagramCol = function(item, data){
	    	var wrapper = $('.diagram-body');
	    	if(data.energy > 100){
	    		data.energy = 100;
	    		var percentSpan = $('<span/>').text(data.energy+'%');
	    	}else if(data.energy < -100){
	    		data.energy = -100;
	    		var percentSpan = $('<span/>').text(data.energy+'%');
	    	}else{
	    		var percentSpan = $('<span/>').text(data.energy+'%');
	    	}
	    	// var percentSpan = $('<span/>').text(data.percent+'%');

	    	item.append(percentSpan);
	    	
	       	item.animate({
	       		'height': wrapper.height()/100*Math.abs(parseInt(data.energy))
	       	}, 2000);
	    },
	    
//	    _setAjaxSettings = function(dataFilter){
//
//	    	try{
//	    		$.ajax({
//	    			beforeSend: function (request) {
//					   request.setRequestHeader("Access-Token", tokkens.accessToken);
//				    },
//	    			url:initConfiguration.urlSliders+'/'+dataFilter.filter,
//	    			type:'PUT',
//	    			dataType:'json',
//	    			contentType:'application/json',
//	    			data:JSON.stringify(dataFilter),
//	    			success:function(data){
//	    				_getAjaxWillpower();
//	    			},
//	    			error:function(error){
//	    				console.log(error);
//	    			}
//
//	    		});
//	    	}catch(e){
//	    		console.log(e);
//	    	}
//	    },
	    
//	    _delete = function(){
//	    	try{
//	    		$.ajax({
//	    			beforeSend: function (request) {
//					   request.setRequestHeader("Access-Token", tokkens.accessToken);
//				    },
//					url:initConfiguration.urlSliders,
//					type:'DELETE',
//					dataType:'json',
//					contentType:'aplication/json',
//					success:function(response){
//						console.log(response);
//						var wrapSliders;
//						_liveSettings.empty();
//						_doSettings.empty();
//						config.dataSliders = response.result;
//                        var dataSliders = config.dataSliders || {};
//
//                      for(var i=0; i<dataSliders.length; i++){
//            	        if(dataSliders[i].section == "live"){
//            	           	wrapSliders = _liveSettings;
//            	        }else{
//            		        wrapSliders = _doSettings;
//            	        }
//            	            _createSlider(wrapSliders, dataSliders[i]);
//                     }
//						_getAjaxWillpower();
//					},
//					error:function(error){
//						console.log(error);
//					}
//	    	    });
//	    	}catch(e){
//	    		console.log(e);
//	    	}
//	    },
	    
	    _formatDataSettings = function(event, value){
	    	var newData = config.dataSliders;
	    	
	    		var values = value.values;
	    		var minValue = parseInt(values[0]);
                var maxValue = parseInt(values[1]);
                
                for(var j=0; j<newData.length; j++){
                	if(newData[j].filter == $(event.target).attr('name')){
                		if(newData[j].comfortMin != minValue || newData[j].comfortMax != maxValue){
                			// console.log(newData[j]);

                			newData[j].comfortMin = minValue;
                			newData[j].comfortMax = maxValue;
                		_setAjaxSettings(newData[j]);

                		}
                	}
                 }
	    	

	    };
	_getAjaxWillpower = function(){
	    	try{	    		
	    		$.ajax({
	    			beforeSend: function (request) {
					   request.setRequestHeader("Access-Token", tokkens.accessToken);
				    },
	    			url:initConfiguration.apiUrl+'energy',
	    			type:'GET',
	    			dataType:'json',
	    			contentType:'application/json',
	    			success:function(data){
                       var res =  _calculateArray(data.result);
                        var resultFinal = data.result;
                        var count = 15;
                        var resultArray = [];
                        var countArray = 0;
                        for(var i=count; 1<i; i--){
                            resultArray[countArray] = resultFinal[resultFinal.length-i];
                            countArray++;
                        }
                        console.log(resultArray);
                        _postRender(res);


//	    				_createCols($('.diagram-body'), resultArray);
	    			},
	    			error:function(error){
	    				console.log(error);
	    			}
	    			
	    		});
	    	}catch(e){
	    		console.log(e);
	    	}
	    },

        _calculateArray = function(result){
            var res = result;
            var currentDay = new Date().getDate();
            var lastWeek = currentDay-6;
            var weekObj = [];
            var itemName = 0;
            var j = 0;
            for(var i=0; i<result.length; i++){
              var date = new Date(result[i].date*1000).getDate();

                if(date == lastWeek){
                    if(typeof(weekObj[itemName]) != 'object'){
                        weekObj[itemName] = []
                    }
                    if(weekObj[itemName][0] == undefined){
                        weekObj[itemName][0] = result[i];
                    }else{
                        weekObj[itemName][j] = result[i];
                        j++;
                    }
                }else if(date > lastWeek){
                   j = 0;
                    itemName++;
                   weekObj[itemName] = [];
                   weekObj[itemName][j] = result[i];
                   lastWeek++;
                }
            }
            var arrayEnergy = [];
            var finalObj = [];
            for(var j=0; j<weekObj.length; j++){
            var itemObj = {};
                var allEnergy = 0;

                if(j != weekObj.length-1){
                    for(var k=0; k<23; k++){
                        allEnergy = allEnergy + weekObj[j][k].energy;
                    }

                   itemObj['energy'] = arrayEnergy[j] = parseInt(allEnergy/23);
                   itemObj['date'] = weekObj[j][0].date;

                   finalObj.push(itemObj);

                }else{
                  console.log(weekObj[j]);
                    itemObj['energy'] = weekObj[j][weekObj[j].length-1].energy;
                    itemObj['date'] = weekObj[j][weekObj[j].length-1].date;

                    finalObj.push(itemObj);
                }
            }

            console.log(finalObj);

            return finalObj;
        };
	    
	view.initialize = function(){
//		_render();
        _getAjaxWillpower();
	};
	
	return view;
}(Zero));
