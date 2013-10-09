Zero.ChartsSettings = (function(module){
	var view = {},
	
	    config = {
	       diagramTitle:'Zero <sup>o</sup> points',
		   actTitle:"Act",
		   actP:"Use the sliders on the left to set your body targets, and the sliders on the right to set your schedule targets.",
		   liveTitle:"Live",
		   doTitle:"Do",
		   dataSliders:{},
		   
	    },
	    _liveSettings,
	    _doSettings,
	    
	    tokkens = module.getTokens(),
	
	    _render = function(){
	    	try{
	    		$.ajax({
	    		beforeSend: function (request) {
					   request.setRequestHeader("Access-Token", tokkens.accessToken);
				    },	
					url:initConfiguration.urlSliders,
					type:'GET',
					dataType:'json',
					contentType:'aplication/json',
					success:function(data){
						config.dataSliders = data.result;
						console.log();
						_postRender();
					},
					error:function(error){
						console.log(error);
					}
	    	    });
	    	}catch(e){
	    		console.log(e);
	    	}
	    	_postRender();
	    },
	    
	    _postRender = function(){
	       _paintChartsSettings();
	       _handlers();
	       
	    },
	    
	    _handlers = function(){
	    	$('#reset-set').bind('click', function(event){
	    		event.preventDefault();
	    		_delete();
	    	});
	    };
	    
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
            
            wrapSettings.append(actSettings);
            wrapSettings.append(liveSettings);
            wrapSettings.append(doSettings);
            
            wrapper.append(wrapDiagram);
            wrapper.append(wrapSettings);
            
            var wrapSliders;
            var dataSliders = config.dataSliders || {};
            
            
            
            for(var i=0; i<dataSliders.length; i++){
            	if(dataSliders[i].section == "live"){
            		wrapSliders = _liveSettings;
            	}else{
            		wrapSliders = _doSettings;
            	}            	
            	_createSlider(wrapSliders, dataSliders[i]); 
            }
            
            _getAjaxWillpower();
                  
	    },
	    
	    _createSlider = function(wrap, data){
	    	var wrapSlider = $('<div/>').addClass('layout-slider');
	    	var inputSlider = $('<div/>').addClass('slider-filter').attr({
	    		                             'id':data.filter,
	    		                             'type':'slider',
	    		                             'name':data.filter
	    	                               });	  
	    	var labelSlider = $('<label/>').text(initConfiguration.labelsSilder[data.filter]);
	    	  	                               
	    	wrapSlider.append(inputSlider);
	    	wrapSlider.append(labelSlider);
	    	wrap.append(wrapSlider);
	    	var currentStep;
	    	switch(data.filter){
	    		case "calories":currentStep = 100;
	    		break;
	    		case "steps":currentStep = 1000;
	    		break;
	    		case "distance":currentStep = 100;
	    		break;
	    		case "floors":currentStep = 10;
	    		break;
	    		case "itemsOnWorkDay":currentStep = 1;
	    		break;
	    		case "itemsOnPlayDay":currentStep = 1;
	    		break;
	    		case "itemsGap":currentStep = 10;
	    		break;
	    		case "itemsSteps":currentStep = 100;
	    		break;
	    	}
	    	
           $('#'+data.filter).slider({ 
           	    min: parseInt(data.min), 
           	    max: parseInt(data.max), 
           	    step: currentStep, 
           	    range: true, 
           	    values:[data.comfortMin, data.comfortMax], 
           	    create:function( event, ui ){
           	    	var handlerLeft = $(event.target).children().eq(1);
           	    	var handlerRight = $(event.target).children().eq(2);
           	    	
           	    	var popupHandlerLeft = $('<span/>').addClass('popup-handler').addClass('popup-handler-left').text(data.comfortMin);
           	    	var popupHandlerRight = $('<span/>').addClass('popup-handler').addClass('popup-handler-right').text(data.comfortMax);
           	    	
           	    	handlerLeft.append(popupHandlerLeft);
           	    	handlerRight.append(popupHandlerRight);
           	    },
           	    slide:function(event, ui){
           	    	$(event.target).find('.popup-handler-left').text(ui.values[0]);
           	    	$(event.target).find('.popup-handler-right').text(ui.values[1]);
           	    },
                stop: function( event, ui ){               	
                   _formatDataSettings(event, ui);
                }
           	    
           	});
	    },
	    
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
            	    
            	if(diagramData[j].percent > 0){
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
	    }
	    
	    _createDiagramCol = function(item, data){
	    	var wrapper = $('.diagram-body');
	    	if(data.percent > 100){
	    		data.percent = 100;
	    		var percentSpan = $('<span/>').text(data.percent+'%');
	    	}else if(data.percent < -100){
	    		data.percent = -100;
	    		var percentSpan = $('<span/>').text(data.percent+'%');
	    	}else{
	    		var percentSpan = $('<span/>').text(data.percent+'%');
	    	}
	    	// var percentSpan = $('<span/>').text(data.percent+'%');
	    	item.append(percentSpan);
	    	
	       	item.animate({
	       		'height': wrapper.height()/100*Math.abs(parseInt(data.percent))
	       	}, 2000);
	    },
	    
	    _setAjaxSettings = function(dataFilter){
	    	
	    	try{	    		
	    		$.ajax({
	    			beforeSend: function (request) {
					   request.setRequestHeader("Access-Token", tokkens.accessToken);
				    },
	    			url:initConfiguration.urlSliders+'/'+dataFilter.filter,
	    			type:'PUT',
	    			dataType:'json',
	    			contentType:'application/json',
	    			data:JSON.stringify(dataFilter),
	    			success:function(data){	    				
	    				_getAjaxWillpower();
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
	    			beforeSend: function (request) {
					   request.setRequestHeader("Access-Token", tokkens.accessToken);
				    },
					url:initConfiguration.urlSliders,
					type:'DELETE',
					dataType:'json',
					contentType:'aplication/json',
					success:function(response){
						console.log(response);
						var wrapSliders;
						_liveSettings.empty();
						_doSettings.empty();
						config.dataSliders = response.result;
                        var dataSliders = config.dataSliders || {};
            
                      for(var i=0; i<dataSliders.length; i++){
            	        if(dataSliders[i].section == "live"){
            	           	wrapSliders = _liveSettings;
            	        }else{
            		        wrapSliders = _doSettings;
            	        }            	
            	            _createSlider(wrapSliders, dataSliders[i]); 
                     }
						_getAjaxWillpower();
					},
					error:function(error){
						console.log(error);
					}
	    	    });
	    	}catch(e){
	    		console.log(e);
	    	}
	    },
	    
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
	    			url:initConfiguration.urlWillpower,
	    			type:'GET',
	    			dataType:'json',
	    			contentType:'application/json',
	    			success:function(data){
	    				// console.log(data.result);
	    				_createCols($('.diagram-body'), data.result)
	    			},
	    			error:function(error){
	    				console.log(error);
	    			}
	    			
	    		});
	    	}catch(e){
	    		console.log(e);
	    	}
	    }
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));
