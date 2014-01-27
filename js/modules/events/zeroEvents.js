Zero.Events = (function(module){
	var m = {},
			_holder,
			tokkens = module.getTokens(),
			_calendarStartRange = Math.round(new Date().getTime() / 1000),
			_calendarEndRange = Math.round(parseInt(new Date().getTime() / 1000) + 86400),
			_accounts,
			moduleUrls = {
				userSearch : initConfiguration.apiUrl + 'user'			
			},
			orderArray = ['fCal', 'sCal', 'tCal'],		
			_activeCalendarId = null,
			_eventModel;

	/*
		New versions of calendars getter
	*/
	
	m.selectCalendar = null;
	m.selectGroup = null;
	
	_getCalendarsSelector = function(s) {
		m.selectCalendar = this;	
		_getCalendars(_buildCalendarSelector)
	}
	
	
	_getGroupSelector = function() {
		m.selectGroup = this;
		Zero.Team.getUserOwnerGroups(_buildGroupsSelector);
	}
	
	_buildGroupsSelector = function() {
		var resp = this;
		for(var i=0; i<resp.length;i++) {
			var item = $('<option />').val(resp[i].id).text(resp[i].name);
			item.appendTo(m.selectGroup);
			
			if(i == resp.length-1) {
				Zero.Tools.selectUpdate(m.selectGroup);
			}
		}
	}
	
	_buildCalendarSelector = function() {	
		for(var i=0; i<_accounts.length; i++) {		
			var calendars = _accounts[i].calendars;
			for(var j=0; j<calendars.length; j++) {
				if(calendars[j].accessRole == 'owner') {
					var item = $('<option />').val(calendars[j].id).text(calendars[j].summary);
					item.appendTo(m.selectCalendar);
				}				
			}
			
			setTimeout(function(){
				Zero.Tools.selectUpdate(m.selectCalendar)
			},100)
		}
	}
	
	_getCalendars = function(callback) {	
		if(!_accounts || _accounts.length == 0) {
			$.ajax({
				url: initConfiguration.apiUrl+'calendars',
				type: 'GET',
				dataType: 'json',
				contentType: "application/json",
				success: function (resp) {			
					if(resp && resp.accounts && resp.accounts.length > 0) {
						_accounts = resp.accounts;
						if(callback) {
							callback.apply();								
						}
						
					}
				},
				error : function(error) {
					
				}
			})			
		} else {
			callback.apply();
		}	
	}
	
	
	
	_drawCalendarsTimeRange = function() {
		var html = $('<div />').attr('id', 'calendarRange'),
			startRangeValue = module.Tools.fortmatStampToTimePicker(_calendarStartRange),
			endRangeValue = module.Tools.fortmatStampToTimePicker(_calendarEndRange),
			startRange = _eventFormRow('startRange', 'Show events from:', 'jq-datepicker', '', startRangeValue),
			endRange = _eventFormRow('endRange', 'till: ', 'jq-datepicker', '', endRangeValue),
			btSetRange = $('<button />').text('Apply data range'),
			vCall = initConfiguration.settingsData.visibleCalendarIds;
		
		
		btSetRange.bind('click', function(e){		
			$('.calendar-event', $(this).closest('.events-calendars-holder')).remove();
			//_drawCalendars();
			
			var calId = $('.calendars .active', _holder).data('calId');
			
			if(calId) {
				_updateCalendarEvents(calId, _holder);
			} else {
				_updateCalendarEvents(vCall.toString(), _holder);
			}			
			e.preventDefault();
		})
		
		startRange.appendTo(html);
		endRange.appendTo(html);		
		btSetRange.appendTo(html);
		
		
		
		html.appendTo(_holder);
	}


	function startTimeSort(a, b) {
		return a.startTime - b.startTime;
	}
	
	
	_validateRange = function() {
		
		var answer = true,
			holder = $('#calendarRange'),
			start = ($.datepicker.formatDate( '@', $('input[name = "startRange"]', holder).datepicker( "getDate" )))/1000,
			end = ($.datepicker.formatDate( '@', $('input[name = "endRange"]', holder).datepicker( "getDate" )))/1000,
			errorArr = ['startRange', 'endRange'];
			
			if(end < start) {				
				return errorArr;
			}
			if(end == 0 || start == 0) {
				return errorArr;
			}
		
		_clearErrors(holder);
		return answer;
		
	}	
		
	_drawCalendars = function() {	
		var callArr = _accounts,		
			isValid = true,
			calListHolder = $('<div />').addClass('calendars'),
			eventsHolder = $('<div />').addClass('events-holder').text('Loading ...'),
			vCall = initConfiguration.settingsData.visibleCalendarIds;
		
		
		if(isValid === true) {
			//_holder.html('');
			for(var i=0; i < callArr.length; i++) {
				var calendars = callArr[i].calendars;			
				
				for(var j=0; j < calendars.length; j++) {	
					for(var k=0; k < vCall.length;k++) {
						if(vCall[k] == calendars[j].id) {
							var item = _getCalItem(calendars[j], calListHolder, k);
							item.appendTo(calListHolder);							
						}
					};
				}				
			}			
			calListHolder.appendTo(_holder);
			eventsHolder.appendTo(_holder);
			
			_updateCalendarEvents(vCall.toString(), _holder);
			
				
		} else {
			_showErrors(isValid, $('#calendarRange'));
		}

	}

	_getCalItem = function(obj, holder, order) {
		var item = $('<div />').addClass('item').addClass(orderArray[order]).data('calId', obj.id),
			title = $('<h3 />').text(obj.summary).attr('title', obj.summary),
			description = $('<div />').addClass('description').text(obj.description);	
			
		title.appendTo(item);	
		description.appendTo(item);	
			
		item.bind('click', function(){
			_getCalendarEvents(this, obj.id, holder);
		})				
		return item;	
	}
	
	_getCalendarEvents = function(item, calId, holder) {
		$('.item', holder).removeClass('active');
		$(item).addClass('active');
		
		_updateCalendarEvents(calId, holder);
		
	}
	
	_updateCalendarEvents = function(id, holder) {
		var wrapper = holder.closest('.events-calendars-holder');
		var now = ($.datepicker.formatDate( '@', $('input[name = "startRange"]', $('#calendarRange')).datepicker( "getDate" )))/1000,
			end = ($.datepicker.formatDate( '@', $('input[name = "endRange"]', $('#calendarRange')).datepicker( "getDate" )))/1000,
			eventHolder = $('.events-holder', wrapper);
		
		
		eventHolder.html('Loading ...');	
		
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
				"calendarIds": id 
				},			
			success: function (resp) {									
				if(resp.events && resp.events.length > 0 ) {					
					var arr = resp.events;
					eventHolder.html('');	
					_getEventsHtml(arr.sort(startTimeSort), eventHolder);
				} 
				
				if(resp.events && resp.events.length == 0 ) {
					eventHolder.html('No events');	
				}
			},
			error : function(error) {
				
			}
		})				
	}
	
	
	_getCalendarHtml = function(callObj) {
		var calName = callObj.summary, 
			callDeas = callObj.description,
			html = $('<div />').addClass('calendar-event').data('cal-id', callObj.id),
			header = $('<h2 />').text(callObj.summary),
			description = $('<div />').addClass('calendar-description').text(callObj.description);
			//addButton = _addEventButton(callObj.id);
			if(callObj.description && callObj.description != '') {
				description.appendTo(header);
			}			
			//addButton.appendTo(header);
			header.appendTo(html);			
			
		return html;			
	}
		
	_getEvents = function(id, holder){
		var now = _calendarStartRange,
			end = _calendarEndRange;
			
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
					"calendarIds": id 
					},			
				success: function (resp) {									
					if(resp.events && resp.events.length > 0 ) {					
						var arr = resp.events;
						_getEventsHtml(arr.sort(startTimeSort), holder);
					} 
				},
				error : function(error) {
					
				}
			})		
	}

	_getEventHtml = function(event) {
		var	html = $('<div />').addClass('event'),
			headerBlock = $('<div />').addClass('header-event'),
			header = $('<h3 />').text(event.subject),
			editLink = $('<a />').attr('href', '#').addClass('icon-link edit-link').text('Edit').data('event-id', event.id),
			removeLink = $('<a />').attr('href', '#').addClass('icon-link remove-link').text('Delete').data('event-id', event.id),
			time = $('<span class="event-time">' + Zero.Tools.getFormatedDateEvent(event.startTime) + ' - ' + Zero.Tools.getFormatedDateEvent(event.endTime) + '</span>'),
			day = $('<span class="event-day">' + module.Tools.getFormatedDay(event.startTime) + '</span>'),
			timeWrapper = $('<div />').addClass('event-day-time'),
			vCall = initConfiguration.settingsData.visibleCalendarIds;
			
			
			for(var i=0; i < vCall.length; i++) {
				if(event.calendarId == vCall[i]) {
					html.addClass(orderArray[i]);
				}
			}			
			
			day.appendTo(timeWrapper);
			time.appendTo(timeWrapper);

			var hiddenpart = $('<div />').addClass('full-info'),
				leftColumn = $('<div />').addClass('left-part'),
				rightColumn = $('<div />').addClass('right-part'),
				location = event.location ? $('<div />').addClass('event-location').text(event.location) : null,
				splitCostValue = event.splitCost ? $('<div />').addClass('event-splitCost').text('Split cost total : ' + event.splitCost) : null,
				attendees = event.attendees && event.attendees.length > 0 ? _getAttendeesBlock(event.attendees, true) : null,
				description = event.location ? $('<div />').addClass('event-description').text(event.description) : null;
				
			
			if(description) {
				description.appendTo(hiddenpart)
			}
			
			if(location) {
				location.appendTo(leftColumn);
			}	
			if(splitCostValue) {
				splitCostValue.appendTo(leftColumn);
			}	
			
			if(attendees) {
				attendees.appendTo(rightColumn);
			}			
			
			leftColumn.appendTo(hiddenpart);
			rightColumn.appendTo(hiddenpart);
			
			
			
			timeWrapper.appendTo(html);
			
			header.appendTo(headerBlock);
			removeLink.appendTo(headerBlock);
			editLink.appendTo(headerBlock);
			
			
			
			editLink.bind('click', function(e){
				_showEventPopup(event);
				e.preventDefault();
			})
			
			removeLink.bind('click', function(e){
				_removeEventNew(event.id, html);
				e.preventDefault();
			})
			
			
			headerBlock.appendTo(html);
			hiddenpart.appendTo(html);
			
			if(location || attendees || description) {
				header.bind('click', function(){
					hiddenpart.toggle();
				}).addClass('pointer')			
			}
			
			
		return html;
		
	}
	
	_removeEventNew = function(eventId, html) {
		$.ajax({
			url: initConfiguration.apiUrl+'calendarEvents' + '/' + eventId,
			type: 'DELETE',
			dataType: 'json',
			contentType: "application/json",
			success: function (resp) {									
				html.remove();
			}
		})		
	}
	
	
	_getEventsHtml = function(eventsArray, holder) {
		for(var i=0; i < eventsArray.length; i++) {
			var event = eventsArray[i];
			var eventHtml = _getEventHtml(event);
			eventHtml.appendTo(holder);			
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
			popup = Zero.ModalController.getPopup('addGroupPopup'),
			popupContent = $('<div />').html('<p>Are You sure to remove this event?</p>'),
			actionsHolder = $('<div />').addClass('actions-holder'),
			btYes = $('<button />').text('Confirm'),
			btNo = $('<button />').text('No');
						
			btYes.appendTo(actionsHolder);
			btNo.appendTo(actionsHolder);
			actionsHolder.appendTo(popupContent);
			
			btYes.bind('click', function(e){
				_removeEventAction(e, popup);
			
			});
			btNo.bind('click', function(e) {
				popup.hide();
				_clearRemovableId();
			})
			
			
		_setRemovableId(eventId);		
		_setRemovableEvent($(this).closest('.event'))
		
		
		popup.setHeader('Remove Event');
		popup.setContent(popupContent);
		popup.show();
		
		e.preventDefault();
	}
	
	
	_removeEventAction = function(e, popup) {
		var bt = $(e.target), 
			removeId = _getRemovableId();


		$.ajax({
			url: initConfiguration.apiUrl+'calendarEvents' + '/' + removeId,
			type: 'DELETE',
			dataType: 'json',
			contentType: "application/json",
			success: function (resp) {									
				if(resp.errorCode && resp.errorCode == 1) {
					var event = _getRemovableEvent();
					event.remove();
					popup.hide();
				}
			},
			error : function(error) {
				
			}
		})		
	}
	
	_setHolder = function(holder) {
		_holder = holder;
		_getCalendars(_calendarList);
	}
	
	/*List of calendars with events*/
	_calendarList = function() {
		_drawCalendarsTimeRange();						
		_drawCalendars();	
	}
	
	
	_getAttendeesBlock = function(attendees, withoutSearch) {				
		var block = $('<div />').addClass('attendees'),
			blockTitle = $('<div />').addClass('title').text('Attendees'),
			attendeesList = $('<ul />').addClass('attendees-list').data('attendees', attendees),
			searchInput = $('<input />').attr({
				'type': 'text',
				'id' : 'searchAttendees',
				'name' : 'searchAttendees',
				'class' : 'livesearch-input'
				});		
		if(attendees && attendees.length !=0) {
			for(var i=0; i<attendees.length; i++) {
				var item = $('<li />'),
					personName = $('<span />').addClass('person-info').text(attendees[i].displayName /*+ ' (' + attendees[i].email + ')'*/);
					avatar = module.Tools.getUserAvatar(attendees[i]),
					splitCost = attendees[i].splitCostPayed ? $('<span />').addClass('split-payed').text('Payed cost: ' + attendees[i].splitCostPayed) : null;
				avatar.appendTo(item);	
				personName.appendTo(item);	
				
				if(splitCost) {
					splitCost.appendTo(item);
				}
				item.appendTo(attendeesList);
			}
		}
		
        searchInput.autocomplete({
            serviceUrl: moduleUrls.userSearch,
            params: {
				'token' :  tokkens.accessToken
            },
            paramName: 'search',
            minChars: 3,
            position: 'absolute',
            dataType: 'json',
            type: 'GET',
            autoSelectFirst: false,
            transformResult: function(response) {
                return {
                    suggestions: $.map(response.result, function(dataItem) {
						var root = initConfiguration.getRootLocation();
						var img = $('<img />').attr({
							'src' : root + initConfiguration.imagesFolder + 'def_avatar.png'
						});
                        return { value: dataItem.name +' ('+ dataItem.email + ')', data: dataItem };
                    })
                };
            },
            onSelect: function (suggestion) {
				var item = $('<li />'),
					personName = $('<span />').addClass('person-info').text(suggestion.data.name),
					avatar = module.Tools.getUserAvatar(suggestion.data);
					arr = attendeesList.data('attendees'),
					obj = {
						'displayName' : suggestion.data.name,
						'email' : suggestion.data.email
					}
				avatar.appendTo(item);	
				personName.appendTo(item);						
				item.appendTo(attendeesList);
				arr.push(obj);
                searchInput.val('');
            }
        });		

		blockTitle.appendTo(block);	
		attendeesList.appendTo(block);	
		
		if(!withoutSearch) {
			searchInput.appendTo(block);			
		}
		
		return block;
		
	}
	


	_addEventButton = function(calId) {
		var bt = $('<button />').addClass('add-event').text('New Event').data('cal-id', calId);
		bt.bind('click', function(){
			_activeCalendarId = calId;
			_showEventPopup();
		});
		return bt;
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
			
			
			if(0 < minutes && minutes < 15  ) { minutes = 15;};
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
				case 'select' : 
					formElement = $('<select />').attr({
						'name' : name,
						'id' : name,
						'class' : 'dropdown'
					});

					if(typeof(val) != 'function') {
						for(var i = 0; i < val.length; i++) {
							var obj = val[i];
							for(var key in obj) {
								$('<option />').attr('value', obj[key]).text(key).appendTo(formElement);					
							}
						};	
					} else {
						(function(el, ZeroEvents) {
							val.apply(el, ZeroEvents);	
						})(formElement, m);
						
					}					
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
			if(val && type != 'select') {				
				formElement.val(val);
			}		
			
			formElement.appendTo(row);
				
		
		return row;			
	}
	
	_checkObj = function(obj) {
		var answer = [], valid = true;
		
		
		
		if(obj.startTime == '') {
			valid = false;
			answer.push('startTime');
		}
		if(obj.endTime == '') {
			valid = false;
			answer.push('endTime');
		}	
		if(obj.subject == '') {
			valid = false;
			answer.push('subject');
		}			

		if(obj.endTime < obj.startTime) {
			valid = false;
			answer.push('endTime');		
			answer.push('startTime');		
		} 
		
		if(!valid) {
			return answer;
		} else {
			return valid;
		}
		
	}
	
	_clearErrors = function(holder) {
		$('.error-element', holder).removeClass('error-element');
	}
	
	_showErrors = function(arr, popup) {
		
		$('input.error-element', popup).removeClass('error-element');
	
		for(var i=0; i < arr.length; i++) {
			var el = $('input[name = "' + arr[i]+'"]', popup);
			el.addClass('error-element');
		}
	}

	
	/*New versions of event popup for add end edit*/
	
	_getEventBlock = function(eventObj) {
		var times = _getAddTimes();
		var eventModel = {		
			'startTime' : times[0],
			'endTime' :  times[1],
			'subject' : 'New Event',
			'calendarId' : _activeCalendarId,
			'location' : '',
			'description' : '',			
			'startTimeZone' : 'Europe/Moscow',
			'endTimeZone' : 'Europe/Moscow',
			'attendees' : new Array(),
			'teamId' : null,
			'splitCost' : null
		}
		
		_eventModel = eventModel;
		
		
		
		if(eventObj) {
			eventModel = Zero.Tools.extendClone(eventObj,eventModel);			
			eventModel.startTime = module.Tools.fortmatStampToTimePicker(eventModel.startTime);
			eventModel.endTime = module.Tools.fortmatStampToTimePicker(eventModel.endTime);
			_activeCalendarId = eventModel.calendarId;
		}	
		
		var popupContent = $('<div />').addClass('addEvent'),
			startTime = _eventFormRow('startTime', 'Starts', 'jq-datepicker', '', eventModel.startTime),
			endTime = _eventFormRow('endTime', 'Ends', 'jq-datepicker', '', eventModel.endTime),				
			subject = _eventFormRow('subject', 'Title', '', '', eventModel.subject),				
			location = _eventFormRow('location', 'Location', '', '', eventModel.location),		
			description = _eventFormRow('description', 'Description', 'textarea', '', eventModel.description),
			btOk = $('<button />').text(eventObj ? 'Edit Event' : 'Add Event'),
			btSplit = $('<button />').text('Split Cost').hide(),
			btCancel = $('<button />').text('Cancel'),
			popup,
			popuHolder = $('#popupHolder'),
			startInput = $('input', startTime),
			endInput = $('input', endTime),			
			attendeesBlock = _getAttendeesBlock(eventModel.attendees),
			splitCostTab = $('<div />').addClass('splitCost-tab hidden').html('Split cost tab');
			eventDiv = $('<div />').addClass('event-tab');
			
			
			
			
		
		var isGroup = $('<input />').attr({
			'type' : 'checkbox',
			'id' : 'isGroup',
			'name' : 'isGroup',
			'class' : 'checkbox'	
			}),
			label = $('<label />').attr({
				'for' : 'isGroup'
			}).text('Group Event'),
			isGroupHolder = $('<div />').addClass('isGroupHolder checkbox-row'),
			groupSelectorWrapper = $('<div />').addClass('groupSelectorWrapper'),
			groupSelectorHolder = _eventFormRow('teamId', 'Choose Team', 'select', '', _getGroupSelector)
			
			label.appendTo(isGroupHolder);				
			isGroup.appendTo(isGroupHolder);
			
			
		isGroupHolder.appendTo(eventDiv);	
		groupSelectorHolder.appendTo(groupSelectorWrapper);
		groupSelectorWrapper.hide();
		groupSelectorWrapper.appendTo(eventDiv);
		
		if(!eventObj) {
			isGroup.bind('change', function(){
				if(isGroup[0].checked) {
					groupSelectorWrapper.show();
					attendeesBlock.hide();
					btSplit.show();
					$('select', groupSelectorHolder).trigger('change');					
				} else {
					groupSelectorWrapper.hide();
					attendeesBlock.show();
					btSplit.hide();
					_eventModel.teamId = null;
				}
			})		
		} else {
			isGroupHolder.hide();
		}
		
		if(eventObj && eventObj.teamId && eventObj.splitCost) {
			btSplit.show();
		}

		
		
		if(!eventObj && !_activeCalendarId) {
			var calendarSelector = _eventFormRow('calendarId', 'Choose Calendar', 'select', '', _getCalendarsSelector);
			calendarSelector.appendTo(eventDiv);
		}
		
		startTime.appendTo(eventDiv);
		endTime.appendTo(eventDiv);
		subject.appendTo(eventDiv);
		location.appendTo(eventDiv);
		description.appendTo(eventDiv);
		
		attendeesBlock.appendTo(eventDiv);	

		if(!eventObj && !_activeCalendarId) {
			btOk.bind('click', function(e){
				_addCalendarEvent($('#calendarId option:selected').val(), eventDiv, eventModel.id)
			})				
		} else {
			btOk.bind('click', function(e){
				_addCalendarEvent(_activeCalendarId, eventDiv, eventModel.id)
			})		
		}
		
		
		btCancel.bind('click', function(e){
			//popup.hide();
			var popup = $(this).closest('.popup-container');
			var closeLink = $('.close-popup', popup);
			closeLink.click();
		})
		
		btOk.appendTo(eventDiv);
		btSplit.appendTo(eventDiv);
		btCancel.appendTo(eventDiv);		
		
		startInput.bind('change', function(e){
			var newTime = $(this).datepicker( "getDate" )/1000 + 3600;
			newTime = module.Tools.fortmatStampToTimePicker(newTime);
			endInput.val(newTime);
		})		
		eventDiv.appendTo(popupContent);
		splitCostTab.appendTo(popupContent);
		
		/*Spli Cost events*/
		btSplit.bind('click', function(){			
			_splitCostClick(eventDiv, splitCostTab, eventObj)
		})		
		
		return popupContent;
	}
	
	_getGroupBlock = function() {
		var holder = $('<div />').addClass('events-calendars-holder');
		_holder = holder;		
		return holder;
	}
	
	/*Split Cost*/
	
	_splitCostClick = function(eventTab, splitTab, eventObj) {	
		var html = _getSplitTabTemplate(eventTab, splitTab, eventObj);	
		
		splitTab.html('');
		html.appendTo(splitTab);
		
		eventTab.addClass('hidden');
		splitTab.removeClass('hidden');
	}
	
	_getSplitTabTemplate = function(eventTab,splitTab, eventObj) {
		var html = $('<div />').addClass('split-cost-block');
		
		var fistScreen = $('<div />').addClass('split-cost-first-tab');
		var paymentTab = $('<div />').addClass('split-cost-payment-tab hidden');
		
		
		var total = _eventFormRow('total', 'Total cost', 'text', '', eventObj && eventObj.splitCost ? eventObj.splitCost : '');		
		var person = _eventFormRow('per_person', 'Per person', 'text');		
		var sendMessageBlock = $('<div />').addClass('row checkbox-row');
		var notPaidSendBlock = $('<div />').addClass('row checkbox-row');
		var isSendMessage = $('<input />').attr({
				'type' : 'checkbox',
				'id' : 'isSendMessage',
				'name' : 'isSendMessage',
				'class' : 'checkbox'	
				}),
				isSendMessageLabel = $('<label />').attr({
					'for' : 'isSendMessage'
				}).text('Send message to full team')		
		
		
			isSendMessageLabel.appendTo(sendMessageBlock);
			isSendMessage.appendTo(sendMessageBlock);
				
		var notPaidSend = $('<input />').attr({
				'type' : 'checkbox',
				'id' : 'notPaidSend',
				'name' : 'notPaidSend',
				'class' : 'checkbox'	
				}),
				notPaidSendLabel = $('<label />').attr({
					'for' : 'notPaidSend'
				}).text('Only send message to players who have not paid')		
		
					
			notPaidSendLabel.appendTo(notPaidSendBlock);
			notPaidSend.appendTo(notPaidSendBlock);
			
		var minimal = _eventFormRow('minimum', 'Minimum total payment before committing to booking', 'text');			
		var totalToDate = _eventFormRow('totalToDate', 'Total paid to date', 'text');			
		
		var splitMenu = $('<div />').addClass('split-menu-holder'),
		    btOk = $('<button />').text('Done'),
			btPayments = $('<button />').text('Payments'),
			btCancel = $('<button />').text('Cancel');
			
		btOk.appendTo(splitMenu);	
		btPayments.appendTo(splitMenu);	
		btCancel.appendTo(splitMenu);	
		
		
		
		total.appendTo(fistScreen);		
		person.appendTo(fistScreen);		
		sendMessageBlock.appendTo(fistScreen);	
		notPaidSendBlock.appendTo(fistScreen);
		minimal.appendTo(fistScreen);
		totalToDate.appendTo(fistScreen);
		
		
		
		
		fistScreen.appendTo(html);
		paymentTab.appendTo(html);		
		splitMenu.appendTo(html);
		
		Zero.Tools.CheckboxUpdate({elems:$('.checkbox', html)});		

		btPayments.bind('click', function(){
			_drawPaymentTab(eventTab, splitTab, fistScreen, paymentTab, eventObj)
		})		
		
		btOk.bind('click',function(){
			var attendees = $('.cost-persons-list', paymentTab).data('attendees');
			_eventModel.attendees = attendees;
			eventTab.removeClass('hidden');
			splitTab.addClass('hidden');			
		})
		
		$('input', total ).bind('change', function(){
			var val = $(this).val();
			if(val) {
				_eventModel.splitCost = val;
			}
		})
		
		
		return html;
	}
	
	_drawPaymentTab = function(eventTab, splitTab, fistScreen, paymentTab, eventObj) {
		var teamId = $('#teamId option:selected').val(),
			personsTable = $('<table />').addClass('cost-persons-list'),
			tableHeader = $('<tr><th class="name">Player</th><th class="paid">Paid</th><th></th></tr>');
			
			tableHeader.appendTo(personsTable);
			personsTable.data('attendees', new Array());
			

			
		if(!eventObj) {
			$.ajax({
				url : initConfiguration.apiUrl + 'team/' + teamId,
				type: 'GET',
				dataType: 'json',
				contentType: "application/json",				
				success : function(resp){
					if(resp && resp.result && resp.result.members && resp.result.members.length !=0) {
						var arr = resp.result.members;
						for(var i=0; i < arr.length; i++) {
							var person = _getPersonRow(arr[i]);
							person.appendTo(personsTable);									
							personsTable.data('attendees').push(person.data('item'));
						}						
						personsTable.appendTo(paymentTab);		
						fistScreen.addClass('hidden');
						paymentTab.removeClass('hidden');						
					}
				}
			})			
		} else {
			if(eventObj.attendees.length !=0) {
				var arr = eventObj.attendees;
				for(var i=0; i < arr.length; i++) {
					var person = _getPersonRow(arr[i]);
					person.appendTo(personsTable);									
					personsTable.data('attendees').push(person.data('item'));
				}						
				personsTable.appendTo(paymentTab);		
				fistScreen.addClass('hidden');
				paymentTab.removeClass('hidden');				
			}
		}
		
	}

	_getPersonRow = function(obj) {
		var tr = $('<tr />').addClass('person-row'),
			title = $('<td />').addClass('person-name').text(obj.name || obj.displayName),
			paid = $('<td />').addClass('person-paid').text(obj.splitCostPayed ? obj.splitCostPayed : 0),
			priceTd = $('<td />'),
			priceInput = $('<input />').attr({
				'type' : 'text',
				'name' : 'paidCount',
				'class' : 'paidInput'
			});
						
			priceInput.appendTo(priceTd);
			
			title.appendTo(tr);
			paid.appendTo(tr);
			priceTd.appendTo(tr);
			
			var attendies = {
				'displayName' : obj.name,
				'userId' : obj.userId,
				'email' : obj.email,
				'avatarUrl' : obj.avatarUrl, 
				'splitCostPayed' : null,
				'energy' : obj.energy
			}
			
			if(obj.splitCostPayed) {
				attendies.splitCostPayed = obj.splitCostPayed;
			}
			
			tr.data('item', attendies);
			
			
			priceInput.bind('change', function(){
				attendies.splitCostPayed = $(this).val();
			})
			
			return tr;
	}
	
	/*End Split Cost*/
	
	
	_showEventPopup = function(eventObj, mode) {
	
		var eventBlock = _getEventBlock(eventObj);
		var groupBlock = _getGroupBlock();
		var popup = Zero.ModalController.getPopup('addGroupPopup');		
		
		var popupContent = $('<div />').addClass('main-content');
        $(popup).find('.popup-toolbar').remove();
		var toolbar = $('<div />').addClass('popup-toolbar');
		var add = $('<a />').attr({
			'href' : '#',
			'class' : 'add-icon'
			}).text('add'),
			list = $('<a />').attr({
			'href' : '#',
			'class' : 'list-icon'
			}).text('list');
		
		
		add.appendTo(toolbar);
		list.appendTo(toolbar);
		
		add.bind('click', function(e){
			eventBlock.show();
			groupBlock.hide();
			popup.setHeader('New Event');
			
			e.preventDefault();
		})
		list.bind('click', function(e){
			eventBlock.hide();
			groupBlock.show();		
			popup.setHeader('Events List');
			e.preventDefault();
		})		
		
		eventBlock.appendTo(popupContent);
		groupBlock.appendTo(popupContent);
			
		groupBlock.hide();
		
		popup.setHeader(eventObj ? $('input[name="subject"]', eventBlock).val() : 'New Event');
		popup.setToolbar(toolbar);
		popup.setContent(popupContent);
		popup.setWidth('80%');

	    Zero.Tools.CheckboxUpdate({elems:$('.checkbox')});		
		
		_activePopup = popup;
		
		popup.show();	
		
		_getCalendars(_calendarList);		
		
		
	}
	
	
	_addCalendarEvent = function(calendarId, popup, eventId) {	
		var obj = {
			'startTime' : ($.datepicker.formatDate( '@', $('input[name = "startTime"]', popup).datepicker( "getDate" )))/1000,
			'endTime' :  ($.datepicker.formatDate( '@', $('input[name = "endTime"]', popup).datepicker( "getDate" )))/1000,
			'subject' : $('input[name = "subject"]', popup).val(),
			'calendarId' : calendarId,
			'location' : $('input[name = "location"]', popup).val(),
			'description' : $('textarea[name = "description"]', popup).val(),			
			'startTimeZone' : 'Europe/Moscow',
			'endTimeZone' : 'Europe/Moscow',
			'attendees' : $('.attendees-list', popup).data('attendees')		
		}	
		
		
		var valid = _checkObj(obj);
				
		if($('#isGroup')[0].checked) {
			obj.teamId = $('#teamId option:selected').val(); 
			obj.attendees = new Array();
		}		

		/*Split Cost*/
		
		if(_eventModel.teamId) {
			obj.teamId = _eventModel.teamId; 
			obj.attendees = new Array();			
		}
		
		if(_eventModel.attendees) {
			obj.attendees = _eventModel.attendees;		
		}
		if(_eventModel.splitCost) {
			obj.splitCost = _eventModel.splitCost;
		}
		
		if(valid != true) {
			_showErrors(valid, popup);
			return;
		}		
		
		
		
		$.ajax({
			url: eventId ? initConfiguration.apiUrl+'calendarEvents' + '/' + eventId : initConfiguration.urlEventsCalendar,
			type: eventId ? 'PUT' : 'POST',
			dataType: 'json',
			data : JSON.stringify(obj),
			contentType: "application/json",
			success: function (resp) {									
				if(resp && resp.errorCode == '1') {
					_activePopup.hide();
				}
			}
		})		
		
	}
	
	
	/* Next up section */
	m.nextUpEvents = function() {
		_getSettings();
	}

    _getSettings = function() {
        $.ajax({
            url: initConfiguration.apiUrl+'settings',
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                _buildNextUpEvent(data.result);
            },
            error : function(error) {
                console.log(error);
            }
        })
    }
	
	_buildNextUpEvent = function(settings) {
		var calIds = settings.visibleCalendarIds;
        if(calIds != undefined){
            var length = calIds.length > 1 ? 2 : calIds.length;
        }
        var wrapper = $('#nextUpEventsHolder');
        wrapper.addClass('nextupevents');
        wrapper.empty();
		for(i = 0; i < length; i++){
           var func = i == 0 ? _paintFirstRow : _paintNextRow;
           _getNextUpEvent(calIds[i], func);
        }
	}

	_getNextUpEvent = function(calIds, func){
        var now = Math.round(new Date().getTime() / 1000);
		
        $.ajax({
            url: initConfiguration.apiUrl+'calendarEvents',
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            data: {
                "start" : now,
                "amount": 2,
                "direction": 1,
                "calendarIds": calIds,
                "onlyTitles": 0
            },
            success: function (data) {
                
                func(data);
            }
        })
    }

    _paintFirstRow = function(data) {
        var wrapper = $('#nextUpEventsHolder');
        if(data != null && data.events && data.events.length > 0 ) {
            var arr = data.events.sort(startTimeSort);
            var rowDiv = $('<div/>').addClass('firstRow');
            wrapper.prepend(rowDiv);
            var length = arr.length > 2 ? 2 : arr.length;
            for(var i = 0; i < length; i++) {
                var event = arr[i];
                var startDate = new Date(event.startTime*1000);
                var startTime = Zero.Tools.formatAMPM(startDate);
                var location = event.location || '';
                var description = event.description || '';
                var persons = _getAttendees(event.attendees);
                var subject = event.subject || '';
                var time = startTime.time;
                var ampm = startTime.ampm;

                if(i == 0) {
                    var html = $('<div class="nextUpEvent leftNextUpEvent"><div class="eventHeader cf"><h3>NEXT UP</h3>'
                        + '<div class="eventtime">' + time + '<span class="ampm">' + ampm + '</span></div></div>'
                        + '<div class="leftEventBorder"><h1>' + subject + '</h1>'
                        + '<h4>You Are Attending</h4>'
                        + '<h2>' + location + '</h2>'
                        + '<span>' + description + '</span>'
                        + '</div></div>');
                } else {
                    var html = $('<div class="nextUpEvent rightNextUpEvent">' + '<div class="eventHeader cf"><h1>' + subject + '</h1>'
                        + '<div class="eventtime">' + time + '<span class="ampm">' + ampm + '</span></div></div>'
                        + '<h4>You Are Attending</h4>'
                        + '<h2>' + location + '</h2>'
                        + '<span>' + description + '</span>'
                        + '</div>');
                }

                rowDiv.append(html);
            }
        }
    }

    _paintNextRow = function(data) {
        var wrapper = $('#nextUpEventsHolder');
        if(data != null && data.events && data.events.length > 0 ) {
            var arr = data.events.sort(startTimeSort);
            var rowDiv = $('<div/>').addClass('nextRow');
            wrapper.append(rowDiv);
            var length = arr.length > 2 ? 2 : arr.length;
            for(var i = 0; i < length; i++) {
                var event = arr[i];
                var startDate = new Date(event.startTime*1000);
                var startTime = Zero.Tools.formatAMPM(startDate);
                var location = event.location || '';
                var description = event.description || '';
                var persons = _getAttendees(event.attendees);
                var subject = event.subject || '';
                var time = startTime.time;
                var ampm = startTime.ampm;

                var className = "rightNextUpEvent";
                if(i == 0){
                    className = "leftNextUpEvent";
                }
                html = $('<div class="nextUpEvent ' + className + '">' + '<div class="eventHeader cf"><h1>' + subject + '<h1/>'
                    + '<div class="eventtime">' + time + '<span class="ampm">' + ampm + '</span></div></div>'
                    + '<h2>' + location + '<h2/>'
                    + '<span>' + description + '<span/>'
                    + '</div>');

                rowDiv.append(html);
            }
        }
    }
		
	m.init = function(holder) {	
		$(function(){
			_setHolder(holder);		
		})		
	}

	
	m.showEventPopup = function() {
		_showEventPopup();
	}
	
	return m;
}(Zero));


