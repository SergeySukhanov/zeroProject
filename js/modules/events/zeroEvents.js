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
						_holder.html('');
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
			
				if(calendars[j].accessRole == 'owner') {
					var calendar = _getCalendarHtml(calendars[j]);				
					calendar.appendTo(_holder);
					_getEvents(calendars[j].id,calendar);				
				}
			}
			
		}		
	}
		
	_getCalendarHtml = function(callObj) {
		var calName = callObj.summary, 
			callDeas = callObj.description,
			html = $('<div />').addClass('calendar-event').data('cal-id', callObj.id),
			header = $('<h2 />').text(callObj.summary),
			description = $('<div />').addClass('calendar-description').text(callObj.description),
			addButton = _addEventButton(callObj.id);
			if(callObj.description && callObj.description != '') {
				description.appendTo(header);
			}			
			addButton.appendTo(header);
			header.appendTo(html);			
			
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
			
			removeLink.bind('click', _removeEvent);
			editLink.bind('click', function(e){
				_editEvent(e);
			});
			
			html.appendTo(holder);
		}
	
	}

	/*
		Remove Event
	*/
	
	var _removableId = null;
	var _removableEvent = null;
	
	
	_setRemovableId = function(id) {
		_removableId = id;
	}
	
	_getRemovableId = function() {
		return _removableId;
	}

	_clearRemovableId = function() {
		_removableId = null;
	}
	
	_setRemovableEvent = function(eventHtml) {
		_removableEvent = eventHtml;
	}
	
	_getRemovableEvent = function() {
		return _removableEvent;
	}
	
	_removeEvent = function(e) {
		var eventId = $(this).data('event-id'),
			popup = module.Tools.getConfirmPopup('Remove Event', 'Are You sure to remove this event?', _removeEventAction, _clearRemovableId),
			popuHolder = $('#popupHolder');
			
		_setRemovableId(eventId);		
		_setRemovableEvent($(this).closest('.event'))
		
		popup.appendTo(popuHolder);	
		popuHolder.show();
		
		e.preventDefault();
	}
	
	
	_removeEventAction = function(e) {
		var bt = $(e.target), 
			removeId = _getRemovableId();
			popup = bt.closest('.popup');


		try{			
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},				
				url: initConfiguration.urlEventsCalendar + '/' + removeId,
				type: 'DELETE',
				dataType: 'json',
				contentType: "application/json",
				success: function (resp) {									
					if(resp.errorCode && resp.errorCode == 1) {
						var event = _getRemovableEvent();
						event.remove();
						module.Tools.destroyPopup(popup);
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
	
	_setHolder = function(holder) {
		_holder = holder;
		_getCalendars();
	}
	
	/*Add event*/
	function eventModel() {
		var model = {};
		
		model.startTime = '';
		model.startTimeZone = '';
		model.endTime = '';
		model.endTimeZone = '';
		model.subject = '';
		model.location = '';
		model.description = '';
		return model 
	}
	
	_addEventButton = function(calId) {
		var bt = $('<button />').addClass('add-event').text('New Event').data('cal-id', calId);
		bt.bind('click', _showEventAddPopup);
		return bt;
	}
	
	_showEventAddPopup = function(e) {
		var calId = $(e.target).data('cal-id'),
			popupContent = $('<div />').addClass('addEvent'),
			times = _getAddTimes(),
		    startTime = _eventFormRow('startTime', 'Starts', 'jq-datepicker', '', times[0]),
		    endTime = _eventFormRow('endTime', 'Ends', 'jq-datepicker', '', times[1]),				
		    subject = _eventFormRow('subject', 'Title', '', '', 'New Event'),				
		    location = _eventFormRow('location', 'Location'),		
			description = _eventFormRow('description', 'Description', 'textarea'),
			btOk = $('<button />').text('Add Event'),
			btCancel = $('<button />').text('Cancel'),
			popup,
			popuHolder = $('#popupHolder');
				
			startTime.appendTo(popupContent);
			endTime.appendTo(popupContent);
			subject.appendTo(popupContent);
			location.appendTo(popupContent);
			description.appendTo(popupContent);
						
			popup = module.Tools.getPopup('New Event', popupContent);
			
			btOk.bind('click', function(e){
				_addGoogleEvent(popup, calId);
			})
			
			btCancel.bind('click', function(e){
				module.Tools.destroyPopup(popup);
			})
			
			btOk.appendTo(popupContent);
			btCancel.appendTo(popupContent);
			
			popup.appendTo(popuHolder);	
			popuHolder.show();					
	}
	
	_getAddTimes = function() {
		var date = new Date(),
			day = date.getDate(),
			month = date.getMonth() + 1,
			year = date.getFullYear(),		
			hours = date.getHours(),
			minutes = date.getMinutes(),
			answer = [];
			
			if(day < 10) {day = '0' + day;}
			if(month < 10) {month = '0' + month;}
			if(hours < 10) {hours = '0' + hours;}
			if(minutes < 10) {minutes = '0' + minutes;}
			
			
			if(0 < minutes && minutes < 15  ) { minutes = 15; console.warn('here') };
			if(15 < minutes && minutes < 30  ) { minutes = 30 };
			if(30 < minutes && minutes < 45  ) { minutes = 45 };
			if(45 < minutes && minutes < 59  ) { minutes = '00'; hours = hours + 1};
			
			answer[0] = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes;
			answer[1] = month + '/' + day + '/' + year + ' ' + (parseInt(hours) + 1) + ':' + minutes;
			return answer;
	}	
	
	_eventFormRow = function(name, labelText, type, className, val) {
		var row = $('<div />').addClass('row'),
			label = $('<label />').text(labelText),
		    formElement;
	
			switch(type) {
				case 'textarea' : 
					formElement = $('<textarea/>').attr({
						'name' : name,
					});				
				break;
				case 'jq-datepicker' : 
					formElement = $('<input/>').attr({
						'name' : name,
						'type' : 'text',
						'value' : '',
						'class' : 'jq-datepicker'
					})						
				break;
				default : 
					formElement = $('<input/>').attr({
						'name' : name,
						'type' : 'text',
						'value' : ''
					})							
			};
			
			label.appendTo(row);
			if(type == 'jq-datepicker') {
				formElement.datetimepicker();
			}
			if(val) {				
				formElement.val(val);
				console.warn(formElement);
			}		
			
			formElement.appendTo(row);
		
		return row;			
	}
	
	_addGoogleEvent = function(popup, calId) {
		var obj = {
			'startTime' : ($.datepicker.formatDate( '@', $('input[name = "startTime"]', popup).datepicker( "getDate" )))/1000,
			'endTime' :  ($.datepicker.formatDate( '@', $('input[name = "endTime"]', popup).datepicker( "getDate" )))/1000,
			'subject' : $('input[name = "subject"]', popup).val(),
			'calendarId' : calId,
			'location' : $('input[name = "location"]', popup).val(),
			'description' : $('textarea[name = "description"]', popup).val(),			
			'startTimeZone' : 'Europe/Moscow',
			'endTimeZone' : 'Europe/Moscow'
		}
		
		try{			
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},				
				url: initConfiguration.urlEventsCalendar ,
				type: 'POST',
				dataType: 'json',
				data : JSON.stringify(obj),
				contentType: "application/json",
				success: function (resp) {									
					if(resp.errorCode && resp.errorCode == 1) {
						module.Tools.destroyPopup(popup);
						_getCalendars();
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
	
	/*
		Edit Event
	*/
	
	_editEvent = function(e) {
		var eventId = $(e.target).data('event-id');
		e.preventDefault();
		
		try{			
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},				
				url: initConfiguration.urlEventsCalendar + '/' + eventId,
				type: 'GET',
				dataType: 'json',
				contentType: "application/json",
				success: function (resp) {									
					if(resp && resp.event && resp.errorCode == '1') {
						_showEditEventDialog(resp.event);
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
	
	_showEditEventDialog = function(eventObj) {
	
		var popupContent = $('<div />').addClass('editEvent'),
			startTimeValue = module.Tools.fortmatStampToTimePicker(eventObj.startTime),
			endTimeValue = module.Tools.fortmatStampToTimePicker(eventObj.endTime),		
		    startTime = _eventFormRow('startTime', 'Starts', 'jq-datepicker', '', startTimeValue),
		    endTime = _eventFormRow('endTime', 'Ends', 'jq-datepicker', '', endTimeValue),				
		    subject = _eventFormRow('subject', 'Title', '', '',eventObj.subject),				
		    location = _eventFormRow('location', 'Location', '', '', eventObj.location),		
			description = _eventFormRow('description', 'Description', 'textarea', '', eventObj.description),
			btOk = $('<button />').text('Save Event'),
			btCancel = $('<button />').text('Cancel'),
			popup,
			popuHolder = $('#popupHolder');
				
			startTime.appendTo(popupContent);
			endTime.appendTo(popupContent);
			subject.appendTo(popupContent);
			location.appendTo(popupContent);
			description.appendTo(popupContent);
						
			popup = module.Tools.getPopup('Edit Event - '  + eventObj.subject, popupContent);
			
			btOk.bind('click', function(e){
				_editGoogleEvent(popup, eventObj, e);
			})
			btCancel.bind('click', function(e){
				module.Tools.destroyPopup(popup);
				e.preventDefault();
			})			
			
			btOk.appendTo(popupContent);
			btCancel.appendTo(popupContent);
			
			popup.appendTo(popuHolder);	
			popuHolder.show();						
	};
	
	
	_editGoogleEvent = function(popup, eventObj, e) {
	
		var obj = {
			'startTime' : ($.datepicker.formatDate( '@', $('input[name = "startTime"]', popup).datepicker( "getDate" )))/1000,
			'endTime' :  ($.datepicker.formatDate( '@', $('input[name = "endTime"]', popup).datepicker( "getDate" )))/1000,
			'subject' : $('input[name = "subject"]', popup).val(),
			'calendarId' : eventObj.calendarId,
			'location' : $('input[name = "location"]', popup).val(),
			'description' : $('textarea[name = "description"]', popup).val(),			
			'startTimeZone' : 'Europe/Moscow',
			'endTimeZone' : 'Europe/Moscow'
		}	
	
		e.preventDefault();
		
		try{			
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},				
				url: initConfiguration.urlEventsCalendar + '/' + eventObj.id,
				type: 'PUT',
				dataType: 'json',
				data : JSON.stringify(obj),
				contentType: "application/json",
				success: function (resp) {									
					if(resp && resp.errorCode == '1') {
						module.Tools.destroyPopup(popup);
						_getCalendars();						
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
	
	
	m.init = function(holder) {	
		_setHolder(holder);		
	}
	
	return m;
}(Zero));