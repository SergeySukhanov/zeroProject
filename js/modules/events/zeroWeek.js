Zero.Week = (function(module){
	var m = {},
		tokkens = module.getTokens(),
		calendars = new Array(),
		weekdays = new Array(),
		calendarWithEvents = [
			{'name' : 'monday'},
			{'name' : 'tuesday'},
			{'name' : 'wednesday'},
			{'name' : 'thursday'},
			{'name' : 'friday'},
			{'name' : 'saturday'},
			{'name' : 'sunday'}			
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
			_getDayEvents(i, weekdays[i] );
		}		
		_startCheckFilling();	
	}
	
	_getDayEvents = function(order, weekday) {
		$.ajax({
			url: initConfiguration.urlEventsCalendar,
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
			//var textString = _getDateHeader(week[i].date);				
				var events = calendarWithEvents[i].events;
				
				if(events) {
					for(var j=0; j < events.length; j++) {					
						var startTime = _getEventTime(events[j].startTime),
							ev = events[j],
							calId = ev.calendarId,							
							xOffset = null;							
							endTime = _getEventTime(events[j].endTime),
							diff = (events[j].endTime - events[j].startTime)/60;
						
						
						
						if(calId == calendars[0]) {xOffset = i==0 ? xOffset = 30 : xOffset = 10; fillColor = fillArray[0]};
						if(calId == calendars[1]) {xOffset = i==0 ? xOffset = 65 : xOffset = 45; fillColor = fillArray[1]};
						if(calId == calendars[2]) {xOffset = i==0 ? xOffset = 100 : xOffset = 80; fillColor = fillArray[2]};
						
						console.warn(startTime.minutes*0.45);
						
						evRec = paper.rect(i*columnWidth + xOffset, startTime.hour*40 + startTime.minutes*0.6 + 10, 20, diff/1.5, 2).attr({
								'fill' : fillColor,
								'cursor' : 'pointer'
							});							
							
						_setEventRectClick(evRec, events[j]);
					}				
				}
				/*
				paper.text(i * columnWidth + 50, 14, textString).attr({
					'font-size' : '16px'
				});
				*/
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
		console.warn(event);
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
		var day = date.getDay()-1;
		//console.warn(day);
		var holder = $('#weekWrapper');
			var ul = $('<ul />');
			
			for(var i =0; i < weekdays.length; i++) {
				var text = _getDateHeader(weekdays[i]),
					li = $('<li />').text(text);		
					if(i == day) {
						li.addClass('active');
					}	
					li.appendTo(ul);
			}
			ul.appendTo(holder);
				
	}
	
	m.init = function() {
			weekdays = _getWeeksTimestamps();		
			calendars = initConfiguration.settingsData.visibleCalendarIds;		
			_getWeekHeaders();
			_getWeekEvents();				
	}
	
	return m;
}(Zero));


