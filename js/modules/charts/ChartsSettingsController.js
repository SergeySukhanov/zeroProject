Zero.ChartsSettings = (function(module){
	var view = {},
	
	    config = {
		   actTitle:"Act",
		   actP:"Use the sliders on the left to set your body targets, and the sliders on the right to setyour schedule targets.",
		   liveTitle:"Live",
		   doTitle:"Do"
		   
	    },
	    
	    dataDiagram = {},
	    dataTuning = {},
	
	    _render = function(){
	    	try{
	    		$.ajax({
	       	       url:initConfiguration.rootContext+initConfiguration.rootFolder+initConfiguration.localDataFolder+'willPowerData.json',
	       	       dataType:'json',
	       	       success:function(data){
	       	          dataDiagram = data.dataDiagram
                      dataTuning = data.tuning
	       	     	_postRender();
	       	       }
	           });
	    	}catch(e){
	    		console.log(e);
	    	}
	    },
	    
	    _postRender = function(){
	       _paintChartsSettings();
	       _handlers();
	    },
	    
	    _handlers = function(){
	    	
	    };
	    
	    _paintChartsSettings = function(){
            var wrapper = $('#willPower');
            var wrapDiagram = $('.willpower-diagram');
            var wrapSettings = $('.sliders-settings');
            
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
            
            wrapSettings.append(actSettings);
            wrapSettings.append(liveSettings);
            wrapSettings.append(doSettings);
            
            wrapper.append(wrapDiagram);
            wrapper.append(wrapSettings);
            
            var wrapSliders;
            
            for(var i=0; i<dataTuning.length; i++){
            	if(i<5){
            		wrapSliders = liveSettings;
            	}else{
            		wrapSliders = doSettings;
            	}            	
            	_createSlider(wrapSliders, dataTuning[i]); 
            }
                    
	    },
	    
	    _createSlider = function(wrap, data){
	    	console.log(wrap);
	    	console.log(data);
	    	var wrapSlider = $('<div/>').addClass('layout-slider');
	    	var inputSlider = $('<input/>').attr({
	    		                             'id':data.id,
	    		                             'type':'slider',
	    		                             'name':data.name,
	    		                             "value":data.min+';'+data.max
	    	                               });	    	                               
	    	wrapSlider.append(inputSlider);
	    	wrap.append(wrapSlider);
	    	
           $('#'+data.id).slider({ 
           	    from: parseInt(data.min), 
           	    to: parseInt(data.max), 
           	    step: parseInt(data.step), 
           	    smooth: false, 
           	    round: 1, 
           	    skin: "round_plastic" 
           	});
	    },
	    
	    _createDiagramCol = function(id, data){
	       	
	    },
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));
