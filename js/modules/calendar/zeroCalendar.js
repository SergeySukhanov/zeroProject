Zero.Calendar = (function(module){
	var m = {},
		_holder;
		
	_setHolder = function(holder) {
		_holder = holder;
		_getCalendars();
	}

	_getCalendarsEvents = function(calList) {
		var tokkens = module.getTokens();
		var calIds = _getCalIds(calList);
		var now = Math.round(new Date().getTime() / 1000)
		var end = Math.round(parseInt(new Date().getTime() / 1000) + 1000000)
		var calendarView = $('<div />').addClass('calendar');
		
		
		var header = $('<h2 />').text('Upcoming Vu');
		header.appendTo(calendarView);
		
		try{			
			$.ajax({
				url: initConfiguration.apiUrl+'calendarEvents',
				type: 'GET',
				dataType: 'json',
				contentType: "application/json",
				data: {
					"start" : now,
					"end" : end,
					"direction": 1, 
					"amount": 10, 
					"calendarIds": calIds 
					},			
				success: function (resp) {		
				
					if(resp.events && resp.events.length > 0 ) {
						var arr = resp.events.sort(startTimeSort)
					
						for(var i = 0; i < arr.length; i++) {
							var event = _getEventHtml(arr[i]);
							event.appendTo(calendarView);						
						}					
						_holder.html('');
						calendarView.appendTo(_holder);											
					} else {
						_holder.html('No events in calendars');
					}
				},
				error : function(error) {
					console.log(error);
				}
			})		
		}catch(e){
			console.log(e);
		}		
	};
	
		
	_getCalIds = function(calList) {
		var ids = [];		
		for(var i = 0; i < calList.length; i++) {
			var calendars, l;
			calendars = calList[i].calendars;
			l = calendars.length;		
			for(var j = 0; j < l; j++) {
				ids.push(calendars[j].id);
			}		
			
		}
		return ids.toString();		
	};
	
	_getEventHtml = function(event) {
		var html;		
		var startTime = Zero.Tools.getFormatedDate(event.startTime);
		var endTime = Zero.Tools.getFormatedDate(event.endTime);
		var location = event.location || '';		
		var persons = _getAttendees(event.attendees);
		html = $('<div class="eventWrapper"><div class="event"><h2>' + event.subject +'</h2>'
		+ '<p class="dates">' + startTime + ' - ' + endTime + '</p>'
		+ persons +
		+ '</div></div>');
		return html;			
	}	
	
	_getAttendees = function(attendees) {
		var persons = '', html = '&nbsp;';
		
		for(var i = 0; i < attendees.length; i++) {
			persons += attendees[i].displayName + ', ';
		}
		persons = persons.substring(0,persons.length -2);
		
		if(attendees.length >0) {
			html = '<h3 class="upper extend">Attendees : ' + attendees.length +'</h3>'
			+ '<p class="persons">' + persons +'</p>'			
		}
		
		return html;
	}	
	
	_getCalendars = function() {
		var tokkens = module.getTokens();
		
		_holder.html('Loading data ...');		
		try{
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},			
				url: initConfiguration.apiUrl+'calendars',
				type: 'GET',
				dataType: 'json',
				contentType: "application/json",
				success: function (resp) {			
					if(resp && resp.accounts && resp.accounts.length > 0) {
						_getCalendarsEvents(resp.accounts);
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
	
	function startTimeSort(a, b) {
		return a.startTime - b.startTime;
	}	
	
	m.init = function(holder) {				
		_setHolder(holder);		
	}
	
	return m;
}(Zero));