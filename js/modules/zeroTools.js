Zero.Tools = (function(module){
	var m = {};
	
	m.getFormatedDate = function(timestamp) {
		var date = new Date(timestamp*1000);
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();		
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();	

		if(month < 10) {
			month = '0' + month;
		}		
		
		if(hours < 10) {
			hours = '0' + hours;
		}				
		if(minutes < 10) {
			minutes = '0' + minutes;
		}						
		
		var formattedTime = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;	
		return formattedTime;	
	}	
	
	m.getFullDate = function(){
		var date = new Date();
		var day = date.getDate()+'th';
		var month = initConfiguration.monthList[date.getMonth()];
		var year = date.getFullYear();

		var formatDate = month + ' ' + day + ', ' + year;
		return formatDate;
	}
	 
	m.getFullTime = function(){
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		if(hours < 10) {
		hours = '0' + hours;
		}
		if(minutes < 10) {
		minutes = '0' + minutes;
		}
		if(seconds < 10) {
		seconds = '0' + seconds;
		}
		var formatTime = hours + ':' + minutes + ':' + seconds; 
		return formatTime;
	}

    m.formatAMPM = function(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes;
        var res = {time:strTime, ampm:ampm};
        return res;
    },

	m.getConfirmPopup = function(title, text, actionOk, actionNo) {
		var pageScroll =  parseInt(jQuery(document).scrollTop());					
		
		var html = $('<div />').addClass('popup confirmPopup'),
			title = $('<h1 />').text(title),
			message = $('<div />').addClass('popup-content').text(text),			
			btOk = $('<button />').addClass('bt-confirm').text('Confirm'),
			btCancel = $('<button />').addClass('bt-cancel').text('Cancel'),
			buttonWrapper = $('<div />').addClass('buttons-wrapper');
			
			btOk.appendTo(buttonWrapper);
			btCancel.appendTo(buttonWrapper);
		
			title.appendTo(html);
			message.appendTo(html);
			buttonWrapper.appendTo(html);	


			btCancel.bind('click', function(e) {
				if(actionNo) actionNo();
				btCancel.unbind('click');
				btOk.unbind('click');
				m.destroyPopup(html);
				e.preventDefault();
			})
			
			btOk.bind('click', function(e){
				actionOk(e);
				e.preventDefault();
			});
			
			
			html.css('marginTop', pageScroll + 200);
		
		return html;	
		
	}
	
	m.destroyPopup = function(target) {
		target.remove();
		$('#popupHolder').hide();
	}
	
	
	m.getPopup = function(title, htmlBody) {
		var pageScroll =  parseInt(jQuery(document).scrollTop());					
		var html = $('<div />').addClass('popup confirmPopup'),
			title = $('<h1 />').text(title),
			body = $('<div />').addClass('popup-content');
			
			
		title.appendTo(html);
		htmlBody.appendTo(body);
		body.appendTo(html);
			
		html.css('marginTop', pageScroll + 200);				
		return html;					
	}
	
	m.fortmatStampToTimePicker = function(timestamp) {
		var date = new Date(timestamp*1000);
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();		
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var answer;
		if(hours < 10) {
			hours = '0' + hours;
		}	
		if(minutes < 10) {
			minutes = '0' + minutes;
		}			
		if(month < 10) {
			month = '0' + month;
		}
		if(day < 10) {
			day = '0' + day;
		}				
		//09/04/2013 00:00
		answer = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes;
		return answer;
	}
	
	m.ajaxErrorHandler = function() {
		$(document).ajaxError(function (e, jqxhr, settings, exception) {
			var title = jqxhr.status + ' - ' + jqxhr.statusText,
			body = $('<div />').addClass('popup-content').html('<div>' + jqxhr.responseJSON.msg + '</div>'),
			btClose = $('<button />').text('Close').appendTo(body),
			
			popup = Zero.ModalController.getPopup('ajaxError');
			
			btClose.bind('click', function(e){
				popup.hide();
			})
			
			
			popup.setHeader('Connection Error');
			popup.setContent(body);
			popup.show();
			

		});	
	
	}
	
	m.selectUpdate = function(elems){
		if($().styler != undefined){
		  elems.styler();	
		}
	}
	
	m.CheckboxUpdate = function(options){
	var view = this,
	
	    config = {
	    	elems:options.elems	    	
	    },
	    
	    once = 0,
	    
	    _render = function(el){
	    	var input = $(el);
	    	var wrapperUpdateCheckbox = $('<div/>').addClass('control-checkbox');
	    	var wrap = input.wrap(wrapperUpdateCheckbox);
	    	var holder = wrap.parent(); 
	    	input.hide();
	    	_createControl(holder);
	    	_handlers(holder);
	    },
	    _handlers = function(wrap){
	    	$(wrap).find('.control').bind('click', function(event){
	    		if(once == 0){
	    			once = 1;
	    		  _actionCheckbox($(event.target));	
	    		}
	    	});
	    	$(wrap).find('.back-layer').bind('click', function(event){
	    		if(once == 0){
	    			once = 1;
	    			var control = $(event.target).prev();
	    		   _actionCheckbox(control);
	    		}
	    	});
	    };
	    
	    _createControl = function(wrap){
	    	var input = wrap.find('input');
	    	var wrapSwitcher = $('<div/>').addClass('wrap-switcher');
	    	var backLayer = $('<div/>').addClass('back-layer');
	    	
	    	var control = $('<span/>').addClass('control');
	    	
	    	wrapSwitcher.append(control);
	    	wrapSwitcher.append(backLayer);
	    	wrap.append(wrapSwitcher);
	    	if(input.prop('checked')){
	    		_animateUpdateControl(backLayer, control, true);
	    	}else{
	    		_animateUpdateControl(backLayer, control, false);
	    	}
	    }
	    
	    _actionCheckbox = function(elem){
	    	var currentWrapper = $(elem).parents('.control-checkbox');
	    	var originalInput = currentWrapper.find('input');
	    	var backLayer = currentWrapper.find('.back-layer');
	    	var updateInput = $(elem);
	    	if(!originalInput.prop('checked')){
	    		originalInput.prop('checked', 'checked');
	    		_animateUpdateControl(backLayer, updateInput, true);
	    	}else{
	    		originalInput.removeAttr('checked');
	    		_animateUpdateControl(backLayer, updateInput, false);
	    	}
	    	
	    },
	    
	    _animateUpdateControl = function(back, control, flag){
	    	var wrapperCheckbox = back.parents('.control-checkbox');
	    	if(flag == true){
	    		back.animate({
	    			backgroundColor:"#ff9934"
	    		},400);
	    		
	    		wrapperCheckbox.animate({
	    			borderColor:"#ff9934"
	    		}, 400);
	    		control.animate({
	    			left:'0%',
	    			boxShadow:'1px 1px 1px #cccccc'
	    		    },400, function(){
	    		    	once = 0;
	    		    });
	    	}else{
	    		back.animate({
	    			backgroundColor:"#ffffff"
	    		},400);
	    		wrapperCheckbox.animate({
	    			borderColor:"#cccccc"
	    		}, 400);
	    		control.animate({
	    			left:'50%',
	    			boxShadow:'-1px 1px 1px #cccccc'
	    		},400, function(){
	    			once = 0;
	    		});
	    	}
	    },

         m.getLocationName = function(lng, lat, func){
             try{
                 $.getJSON('http://maps.googleapis.com/maps/api/geocode/json', {
                     latlng: lat + "," + lng,
                     sensor: 'false',
                     language: 'en'
                 }, function(result, status) {
                    if (status == "success") {
                        console.log(result)
                        var res = result.results;
                        if (res[1]) {
                            //formatted address
                            //console.log(results[0].formatted_address)
                            //find country name
                            for (var i=0; i<res[0].address_components.length; i++) {
                                for (var b=0;b<res[0].address_components[i].types.length;b++) {

                                    //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                    if (res[0].address_components[i].types[b] == "administrative_area_level_1") {
                                        //this is the object you are looking for
                                        city= res[0].address_components[i];
                                        break;
                                    }
                                }
                            }
                            //city data
                            func(city.long_name);
                            return;
                        } else {
                            console.log("No results found");
                            return;
                        }
                    } else {
                        $.get("http://ipinfo.io", function(response) {
                            func(response.city);
                        }, "jsonp")
                        return;
                    }
                 });
             }catch(Exception){
                 $.get("http://ipinfo.io", function(response) {
                     func(response.city);
                 }, "jsonp")
                 return;
             }
        };
	
	view.init = function(){
		$(config.elems).each(function(index, elem){
			_render(elem);
		});
	}
	
	view.init();
   };
	
	m.ajaxErrorHandler();
	
	m.generateNoty = function(type, text) {
		var n = noty({
			text: text,
			type: type,
			dismissQueue: false,
			layout: 'topRight',
			theme: 'defaultTheme'
		});
		return n;
	}
	
	
	m.extendClone = function(source, target) {
		var keys = Object.keys(source),
			i = keys.length - 1,
			k,
			target = target || {};
		do {
			k = keys[i];
			target[k] = source[k];
		}
		while (i--);
	return target;
}
	
	
	return m;
}(Zero));