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
		
			//var status = jqxhr.status;
			/*
			if(status === 404) {

			} else {

			}
			*/
			
			var title = jqxhr.status + ' - ' + jqxhr.statusText,
			body = $('<div />').addClass('popup-content').html('<div>' + jqxhr.responseJSON.error + '</div>'),
			btClose = $('<button />').text('Close').appendTo(body),
			popuHolder = $('#popupHolder');
			popup = module.Tools.getPopup(title, body);			
			btClose.bind('click', function(e){
				module.Tools.destroyPopup(popup);
			})
			
			popup.appendTo(popuHolder);	
			popuHolder.show();					
			
			

		});	
	
	}
	
	m.ajaxErrorHandler();
	
	return m;
}(Zero));