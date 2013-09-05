Zero.ChartsSettings = (function(module){
	var view = {},
	
	    config = {
	       diagramTitle:'Zero <sup>o</sup> points',
		   actTitle:"Act",
		   actP:"Use the sliders on the left to set your body targets, and the sliders on the right to set your schedule targets.",
		   liveTitle:"Live",
		   doTitle:"Do"
		   
	    },
	    
	    tokkens = module.getTokens(),
	
	    _render = function(){
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
            var dataSliders = initConfiguration.settingsData.filters || {};
            
            
            
            for(var i=0; i<dataSliders.length; i++){
            	if(dataSliders[i].section == "live"){
            		wrapSliders = liveSettings;
            	}else{
            		wrapSliders = doSettings;
            	}            	
            	_createSlider(wrapSliders, dataSliders[i]); 
            }
            
            // _createCols(diagramBody);
            
           console.log('good');         
	    },
	    
	    _createSlider = function(wrap, data){
	    	var equalizer = data.equalizer;
	    	var comfort = data.comfort;
	    	var wrapSlider = $('<div/>').addClass('layout-slider');
	    	var inputSlider = $('<input/>').attr({
	    		                             'id':data.filter,
	    		                             'type':'slider',
	    		                             'name':data.filter,
	    		                             "value":comfort.min+';'+comfort.max
	    	                               });	  
	    	var labelSlider = $('<label/>').text(initConfiguration.labelsSilder[data.filter]);
	    	  	                               
	    	wrapSlider.append(inputSlider);
	    	wrapSlider.append(labelSlider);
	    	wrap.append(wrapSlider);
	    	
           $('#'+data.filter).slider({ 
           	    from: parseInt(equalizer.min), 
           	    to: parseInt(equalizer.max), 
           	    step: 1000, 
           	    smooth: false, 
           	    round: 1, 
           	    skin: "round_plastic",
                callback: function( value ){
                   _formatDataSettings();
                }
           	    
           	});
	    },
	    
	    _createCols = function(wrap, config){
	    	wrap.empty();
	    	if(!config){
	    	   var diagramData = initConfiguration.diagramData.dataOfDay;	
	    	}else{
	    		var diagramData = config;
	    	}
	    	for(var j=0; j<diagramData.length; j++){
            	var diagramItemWrap = $('<div/>').addClass('diagram-item-wrap');
            	var diagramItem = $('<div/>').addClass('diagram-item');
            	var newDate = new Date(diagramData[j].date);
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
            }
	    },
	    
	    _createDiagramCol = function(item, data){
	    	var wrapper = $('.diagram-body');
	    	var percentSpan = $('<span/>').text(data.percent+'%');
	    	item.append(percentSpan);
	    	
	       	item.animate({
	       		'height': wrapper.height()/100*Math.abs(parseInt(data.percent))
	       	}, 2000);
	    },
	    
	    _setAjaxSettings = function(dataFilters){
	    	
	    	try{	    		
	    		$.ajax({
	    			beforeSend: function (request) {
					   request.setRequestHeader("Access-Token", tokkens.accessToken);
				    },
	    			url:initConfiguration.urlSettings,
	    			type:'PUT',
	    			dataType:'json',
	    			contentType:'application/json',
	    			data:JSON.stringify(dataFilters),
	    			success:function(data){
	    				view.getAjaxWillpower();
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
					url:initConfiguration.urlSettings,
					type:'DELETE',
					dataType:'json',
					contentType:'aplication/json',
					success:function(response){
						console.log(response);
						_paintChartsSettings();
					},
					error:function(error){
						console.log(error);
					}
	    	    });
	    	}catch(e){
	    		console.log(e);
	    	}
	    },
	    
	    _formatDataSettings = function(){
	    	var newData = initConfiguration.settingsData;
	    	var saveData = newData.filters;
	    	console.log(saveData);
	    	var currentFilters = $('.layout-slider').children('input');
	    	
	    	for(var i=0; i<currentFilters.length; i++){
	    		var values = $(currentFilters[i]).val().split(';');
	    		var minValue = parseInt(values[0]);
                var maxValue = parseInt(values[1]);
                var target = (maxValue-minValue)/2+minValue;
                
                for(var j=0; j<saveData.length; j++){
                	if(saveData[j].filter == $(currentFilters[i]).attr('id')){
                		var comfort = saveData[i].comfort;
                		if(comfort.min != minValue){
                			comfort.min = minValue;
                		}
                		if(comfort.max != maxValue){
                			comfort.max = maxValue;
                		}
                	}
                }
                   
	    	}
	    	console.log(newData);
	    	_setAjaxSettings(newData);
	    };
	view.getAjaxWillpower = function(){
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
	    				console.log(data.result);
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
