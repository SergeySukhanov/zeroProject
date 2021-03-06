Zero.Week = (function(module){
	var m = {},
		tokkens = module.getTokens(),
		calendars = new Array(),
		weekdays = new Array(),
		calendarWithEvents = [
			{'name' : 'monday', 'events' : new Array()},
			{'name' : 'tuesday', 'events' : new Array()},
			{'name' : 'wednesday', 'events' : new Array()},
			{'name' : 'thursday', 'events' : new Array()},
			{'name' : 'friday', 'events' : new Array()},
			{'name' : 'saturday', 'events' : new Array()},
			{'name' : 'sunday', 'events' : new Array()}			
		],
		ajaxSuccess = new Array();

	_getWeekDays = function(date) {
		var now = date? new Date(date) : new Date();
		now.setHours(0,0,0,0);
		var monday = new Date(now);
		monday.setDate(monday.getDate() - monday.getDay() + 1);
  
		var tuesday = new Date(now);
		tuesday.setDate(tuesday.getDate() - tuesday.getDay() + 2);  

		var wednesday = new Date(now);
		wednesday.setDate(wednesday.getDate() - wednesday.getDay() + 3);    
  
		var thursday = new Date(now);
		thursday.setDate(thursday.getDate() - thursday.getDay() + 4);    

		var friday = new Date(now);
		friday.setDate(friday.getDate() - friday.getDay() + 5);      

		var saturday = new Date(now);
		saturday.setDate(saturday.getDate() - saturday.getDay() + 6);      
  
		var sunday = new Date(now);
		sunday.setDate(sunday.getDate() - sunday.getDay() + 7);
    
		return [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
	}

	_getWeeksTimestamps = function(date) {
		var weekDays = _getWeekDays(date);	
		for(var i=0; i < weekDays.length; i++) {
			weekDays[i] = weekDays[i].getTime() / 1000;
			calendarWithEvents[i].date = weekDays[i];
		}	
		return weekDays;	
	}	


	_getWeekEvents = function() {	
		
		for(var i=0; i < weekdays.length; i++) {
			var day = weekdays[i],
				order = i;			
			_getDayEvents(order, day);
		}
		
		//_getAllEventsPerWeek(weekdays[0], weekdays[6]) 
		
		
		
		
		_startCheckFilling();	
	}
	
	_getAllEventsPerWeek = function(start, end) {
		$.ajax({
			url: initConfiguration.apiUrl+'calendarEvents',
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			data: {
				"start" : start,
				"end" : end+86400,
				"direction": 1, 
				"amount": 100, 
				"calendarIds": calendars.toString()
				},			
			success: function (resp) {	
				//console.warn(resp);
				if(resp && resp.events) {
					_fillCalendarWithEvents(resp.events);
				}
				
				/*
				calendarWithEvents[order].events = resp.events;
				ajaxSuccess.push(true)
				*/
			},
			error : function(error) {
				ajaxSuccess.push(false);
			}
		})		
	}
	
	_fillCalendarWithEvents = function(arr) {
		for(var i=0; i<arr.length; i++) {
			_pushToCalendarEvent(arr[i])			
			if(i == arr.length-1) {
				_startDraw();
			}
		}
		
	}
	_pushToCalendarEvent = function(event) {
		var evTime = new Date(event.startTime*1000);	
			order = evTime.getDay();
			
		console.warn(event);	
		calendarWithEvents[order-1].events.push(event);
	}
	
	_getDayEvents = function(order, weekday) {
		$.ajax({
			url: initConfiguration.apiUrl+'calendarEvents',
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			data: {
				"start" : weekday,
				"end" : weekday+86400,
				"direction": 1, 
				"amount": 100, 
				"calendarIds": calendars.toString()
				},			
			success: function (resp) {	
				calendarWithEvents[order].events = resp.events;
				ajaxSuccess.push(true)
			},
			error : function(error) {
				ajaxSuccess.push(false);
			}
		})		
	}
	
	_startCheckFilling = function() {
		if(ajaxSuccess.length != 7) {
			setTimeout(_startCheckFilling, 500)
		} else {
			_startDraw();
		}
	}
	
	_startDraw = function() {
		var paperHolder = $('#paper');
		
		if(paperHolder.length == 0) return;
		
		var paper = Raphael(paperHolder[0], paperHolder.width(), 980);
		var center = [paperHolder.width()/2,paperHolder.height()/2];
		
		var columnWidth = paperHolder.width()/7;
		var pH = paperHolder.height();
		var pW = paperHolder.width();		
		var week = calendarWithEvents;
		
		var fillArray = ['#f7982f', '#d7dadb', '#a3a9ad'];
		
		for(var i=0; i<7; i++) {
			//var a = paper.rect(i * columnWidth, 10, columnWidth+1, pH-35, 0).attr({'fill' : "#fff", 'stroke-opacity' : '0.2'});
				var events = calendarWithEvents[i].events;
				
				
				var firstCal = new Array(),
					secondCal = new Array(),
					thirdCal = new Array();
				
				jQuery.map(events, function(n, i){
					if(n.calendarId == calendars[0]) {
						firstCal.push(n)
					}
					if(n.calendarId == calendars[1]) {
						secondCal.push(n)
					}					
					if(n.calendarId == calendars[2]) {
						thirdCal.push(n)
					}
					
				});
				
				
				_drawCalendarLine(firstCal,i, '1', paper);
				_drawCalendarLine(secondCal,i, '2',paper);
				_drawCalendarLine(thirdCal,i, '3',paper);
				
				


		}
		
		for(var i=0; i<7; i++) {
			var lineCoords = "M"+ parseInt(i*columnWidth) + " 9 L" + parseInt(i*columnWidth)  + " 972";
			var l = paper.path(lineCoords).attr({'height' : '1px', 'stroke-opacity' : '0.1'});		
		}
		
		for(var i=0; i < 25; i++) {
			var lineCoords = "M20 "+(i*40+10)+"L" + pW +" " + (i*40+10);
			paper.path(lineCoords).attr({'height' : '1px', 'stroke-opacity' : '0.1'});
		}
		
		for(var i=0; i<24; i++) {
				paper.text(10, (i*40+10), i).attr({
					'font-size' : '14px',
					'fill' : 'blue'
				});		
		}
		
	}
	
	_drawCalendarLine = function(events, i, order, paper) {
		var paperHolder = $('#paper');
		var fillArray = ['#f7982f', '#d7dadb', '#a3a9ad'];
		var columnWidth = paperHolder.width()/7;
		
		events = events.sort(startTimeSort);
		var pere = 0
		
		if(events) {
			for(var j=0; j < events.length; j++) {					
				var startTime = _getEventTime(events[j].startTime),
					ev = events[j],
					calId = ev.calendarId,							
					xOffset = null;							
					endTime = _getEventTime(events[j].endTime),
					diff = (events[j].endTime - events[j].startTime)/60
					
					if(j !=0) {
						if( events[j].startTime >= events[j-1].startTime && events[j].startTime <= events[j-1].endTime) {							
							pere = pere + 5;
						} else {
							pere = 0;
						}
					}
				
				if(order == 1) {xOffset = i==0 ? xOffset = 30 : xOffset = 10; fillColor = fillArray[0]};
				if(order == 2) {xOffset = i==0 ? xOffset = 65 : xOffset = 45; fillColor = fillArray[1]};
				if(order == 3) {xOffset = i==0 ? xOffset = 100 : xOffset = 80; fillColor = fillArray[2]};						
				
				evRec = paper.rect(i*columnWidth + parseInt(xOffset + pere), startTime.hour*40 + startTime.minutes*0.6 + 10, 20, diff/1.5, 2).attr({
						'fill' : fillColor,
						'cursor' : 'pointer'
					});											
				
				_setEventRectClick(evRec, events[j]);
			}				
		}	
	}
	
	_setEventRectClick = function(obj, data) {
		obj.click(function(e){
			_drawFullEvent(data);
		})							
	}
	
	
	/*Date for header*/
	
	_getDateHeader = function(timestamp) {
		var date = new Date(timestamp*1000);
		var day = date.getDate();
		var month = date.getMonth() + 1;	
		var d = date.getDay();		
		
		var weekDays = [
			'Sun',
			'Mon',
			'Tue',
			'Wed',
			'Thu',
			'Fri',
			'Sat'			
		]
		
		var answer = weekDays[d] + ' ' + day;		
		
		return answer;
	
	}
	
	
	_getEventTime = function(timestamp) {
		var date = new Date(timestamp*1000);
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var answer = {
			'text' : hours + '.' + minutes,
			'hour' : hours,
			'minutes' : minutes
		}
		
		return answer;
	}
	
	_drawFullEvent = function(event) {
		var holder = $('#eventInfo'),
			blockTitle = $('<h2 />').text('Event Details'),
			title = $('<h3 />').text(event.subject),
			location = $('<div />').addClass('location').text(event.location),
			startTime = $('<div class="timeBlock" />').html('<span>Begins: </span>' + module.Tools.getFormatedDate(event.startTime,false,'weekView')),
			endTime = $('<div class="timeBlock" />').html('<span>Ends: </span>' + module.Tools.getFormatedDate(event.endTime,false,'weekView')),
			description = $('<div />').addClass('event-description').text(event.description),
			eventHtml = $('<div />').addClass('event-info'),
			attendees = _getAttendeesList(event.attendees),
			leftBlock = $('<div />').addClass('inline-block'),
			centerBlock = $('<div />').addClass('inline-block center-block'),
			rightBlock = $('<div />').addClass('inline-block right-block');
			
			
			
			attendees.appendTo(centerBlock);
			
			
					
		title.appendTo(leftBlock);	
		location.appendTo(leftBlock);
		startTime.appendTo(leftBlock);
		endTime.appendTo(leftBlock);
		description.appendTo(leftBlock);	

		leftBlock.appendTo(eventHtml);
		centerBlock.appendTo(eventHtml);
		rightBlock.appendTo(eventHtml);
		
		holder.html('');
		
		blockTitle.appendTo(holder);
		eventHtml.appendTo(holder);
	}
	
	_getAttendeesList = function(arr) {
		var wrapper = $('<div />');
		var title = $('<h3 />').text('Attendees');
		var holder = $('<ul />').addClass('attendees-list');
		for(var i=0;i < arr.length; i++) {
			var item = $('<li />').text(arr[i].displayName + ' (' + arr[i].email + ')');
			item.appendTo(holder);
		}
		
		title.appendTo(wrapper);
		holder.appendTo(wrapper);
		
		return wrapper;
	}
	
	
	_getWeekHeaders = function() {
		var date = new Date();
			date.setHours(0,0,0,0);
		var holder = $('#weekWrapper');
			var ul = $('<ul />');
			
			
			
			for(var i =0; i < weekdays.length; i++) {
				var text = _getDateHeader(weekdays[i]),
					li = $('<li />').text(text);					
					if(weekdays[i] == date/1000) {
						li.addClass('active');
					}	
					li.appendTo(ul);
			}
			ul.appendTo(holder);			
	}
	
	m.init = function(date) {
		ajaxSuccess = new Array();
		weekdays = _getWeeksTimestamps(date);		
		calendars = initConfiguration.settingsData.visibleCalendarIds;		
		_getWeekHeaders();
		_getWeekEvents();				
	}

	function startTimeSort(a, b) {
		return a.startTime - b.startTime;
	}

	
	return m;
}(Zero));


