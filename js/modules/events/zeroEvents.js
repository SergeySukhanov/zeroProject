Zero.Events = (function(module){
	var m = {},
	_holder,
	tokkens = module.getTokens();		

	_getCalendars = function() {
		try{
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},			
				url: initConfiguration.urlCalendarsList,
				type: 'GET',
				dataType: 'json',
				contentType: "application/json",
				success: function (resp) {			
					if(resp && resp.accounts && resp.accounts.length > 0) {
						_drawCalendars(resp.accounts);
					}
				},
				error : function(error) {
					console.log(error);
				}
			})		
		}catch(e){
			console.log(e);
		};			
		
	}
		
	    
	_drawCalendars = function(callArr) {			
		for(var i=0; i < callArr.length; i++) {
			var calendars = callArr[i].calendars;
			for(var j=0; j < calendars.length; j++) {
			
				var calendar = _getCalendarHtml(calendars[j]);				
				calendar.appendTo(_holder);
				_getEvents(calendars[j].id,calendar);
			}
			
		}		
	}
		
	_getCalendarHtml = function(callObj) {
		var calName = callObj.summary, 
			callDeas = callObj.description
			html = $('<div />').addClass('calendar-event').data('cal-id', callObj.id),
			header = $('<h2 />').text(callObj.summary);
			description = $('<div />').addClass('calendar-description').text(callObj.description);
			
			header.appendTo(html);
			
			if(callObj.description && callObj.description != '') {
				description.appendTo(html);
			}
			
		return html;			
	}
		
	_getEvents = function(id, holder){
		var now = Math.round(new Date().getTime() / 1000)
		var end = Math.round(parseInt(new Date().getTime() / 1000) + 1000000)

		try{			
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},				
				url: initConfiguration.urlEventsCalendar,
				type: 'GET',
				dataType: 'json',
				contentType: "application/json",
				data: {
					"start" : now,
					"end" : end,
					"direction": 1, 
					"amount": 10, 
					"calendarIds": id 
					},			
				success: function (resp) {									
					if(resp.events && resp.events.length > 0 ) {
						_getEventsHtml(resp.events, holder);
						//events.appendTo(holder);
					} 
				},
				error : function(error) {
					console.log(error);
				}
			})		
		}catch(e){
			console.log(e);
		}	
		
	}

	_getEventsHtml = function(eventsArray, holder) {
		
		
		for(var i=0; i < eventsArray.length; i++) {
			var event = eventsArray[i],
				html = $('<div />').addClass('event'),
				header = $('<h3 />').text(event.subject),
				editLink = $('<a />').attr('href', '#').addClass('icon-link edit-link').text('edit').data('event-id', event.id),
				removeLink = $('<a />').attr('href', '#').addClass('icon-link remove-link').text('remove').data('event-id', event.id);
				
			header.appendTo(html);		
			editLink.appendTo(html);		
			removeLink.appendTo(html);	
			
			html.appendTo(holder);
		}
	
	
	}
	
	
	_setHolder = function(holder) {
		_holder = holder;
		_getCalendars();
	}
	
	
	m.init = function(holder) {	
		_setHolder(holder);		
	}
	
	return m;
}(Zero));