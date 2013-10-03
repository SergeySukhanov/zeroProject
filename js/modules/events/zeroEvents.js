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
		
	_activeCalendarId = null;

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
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},			
				url: initConfiguration.urlCalendarsList,
				type: 'GET',
				dataType: 'json',
				contentType: "application/json",
				success: function (resp) {			
					if(resp && resp.accounts && resp.accounts.length > 0) {
						_accounts = resp.accounts;
						callback.apply();
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
			btSetRange = $('<button />').text('Apply data range');
		
		
		btSetRange.bind('click', function(e){		
			$('.calendar-event', $(this).closest('.events-calendars-holder')).remove();
			_drawCalendars();
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
			isValid = true //_validateRange();
		
		if(isValid === true) {
			//_holder.html('');
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
		} else {
			_showErrors(isValid, $('#calendarRange'));
		}

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
		var now = _calendarStartRange,//($.datepicker.formatDate( '@', $('input[name = "startRange"]', $('#calendarRange')).datepicker( "getDate" )))/1000,
			end = _calendarEndRange//($.datepicker.formatDate( '@', $('input[name = "endRange"]', $('#calendarRange')).datepicker( "getDate" )))/1000;

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
			header = $('<h3 />').text(event.subject),
			editLink = $('<a />').attr('href', '#').addClass('icon-link edit-link').text('Edit').data('event-id', event.id),
			removeLink = $('<a />').attr('href', '#').addClass('icon-link remove-link').text('Delete').data('event-id', event.id),
			time = $('<div>' + Zero.Tools.getFormatedDate(event.startTime) + ' - ' + Zero.Tools.getFormatedDate(event.endTime) + '</div>'),
			now = Math.round(new Date().getTime() / 1000)
				
			header.appendTo(html);		
			time.appendTo(html);
			editLink.appendTo(html);		
			removeLink.appendTo(html);	
			
			removeLink.bind('click', _removeEvent);
			editLink.bind('click', function(e){
				_activeCalendarId = event.calendarId;
				_showEventPopup(event);
				e.preventDefault();
			});
			
			
			if(event.endTime < now && !event.recurrence) {
				html.addClass('past-event');
			}
			
			return html;
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
					//module.Tools.destroyPopup(popup);
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
	
	
	_getAttendeesBlock = function(attendees) {
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
				var item = $('<li />').text(attendees[i].displayName + ' (' + attendees[i].email + ')');
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
                        return { value: dataItem.name +' ('+ dataItem.email + ')', data: dataItem };
                    })
                };
            },
            onSelect: function (suggestion) {
				var item = $('<li />').text(suggestion.data.name + ' (' + suggestion.data.email + ')'),
					arr = attendeesList.data('attendees'),
					obj = {
						'displayName' : suggestion.data.name,
						'email' : suggestion.data.email
					}					
				item.appendTo(attendeesList);
				arr.push(obj);
                searchInput.val('');
            }
        });		

		
		blockTitle.appendTo(block);	
		attendeesList.appendTo(block);	
		searchInput.appendTo(block);	
		
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
			'teamId' : null
		}
		
		if(eventObj) {
			eventModel = Zero.Tools.extendClone(eventObj,eventModel);			
			eventModel.startTime = module.Tools.fortmatStampToTimePicker(eventModel.startTime);
			eventModel.endTime = module.Tools.fortmatStampToTimePicker(eventModel.endTime);
		}	
		
		var popupContent = $('<div />').addClass('addEvent'),
			startTime = _eventFormRow('startTime', 'Starts', 'jq-datepicker', '', eventModel.startTime),
			endTime = _eventFormRow('endTime', 'Ends', 'jq-datepicker', '', eventModel.endTime),				
			subject = _eventFormRow('subject', 'Title', '', '', eventModel.subject),				
			location = _eventFormRow('location', 'Location', '', '', eventModel.location),		
			description = _eventFormRow('description', 'Description', 'textarea', '', eventModel.description),
			btOk = $('<button />').text('Add Event'),
			btCancel = $('<button />').text('Cancel'),
			popup,
			popuHolder = $('#popupHolder'),
			startInput = $('input', startTime),
			endInput = $('input', endTime),			
			attendeesBlock = _getAttendeesBlock(eventModel.attendees);
		
		if(!eventObj) {
			var isGroup = $('<input />').attr({
				'type' : 'checkbox',
				'id' : 'isGroup',
				'name' : 'isGroup',
				'class' : 'checkbox'	
				}),
				label = $('<label />').attr({
					'for' : 'isGroup'
				}).text('Group Event'),
				isGroupHolder = $('<div />').addClass('isGroupHolder'),
				groupSelectorWrapper = $('<div />').addClass('groupSelectorWrapper'),
				groupSelectorHolder = _eventFormRow('teamId', 'Choose Team', 'select', '', _getGroupSelector)
				
				isGroup.appendTo(isGroupHolder);
				label.appendTo(isGroupHolder);				
				
			isGroupHolder.appendTo(popupContent);	
			groupSelectorHolder.appendTo(groupSelectorWrapper);
			groupSelectorWrapper.hide();
			groupSelectorWrapper.appendTo(popupContent);
			
			isGroup.bind('change', function(){
				if(isGroup[0].checked) {
					groupSelectorWrapper.show();
					attendeesBlock.hide();
				} else {
					groupSelectorWrapper.hide();
					attendeesBlock.show();
				}
			})
			
			
			
		}
		
		
		if(!eventObj && !_activeCalendarId) {
			var calendarSelector = _eventFormRow('calendarId', 'Choose Calendar', 'select', '', _getCalendarsSelector);
			calendarSelector.appendTo(popupContent);
		}
		
		startTime.appendTo(popupContent);
		endTime.appendTo(popupContent);
		subject.appendTo(popupContent);
		location.appendTo(popupContent);
		description.appendTo(popupContent);
		
		attendeesBlock.appendTo(popupContent);	

		if(!eventObj && !_activeCalendarId) {
			btOk.bind('click', function(e){
				_addCalendarEvent($('#calendarId option:selected').val(), popupContent, eventModel.id)
			})				
		} else {
			btOk.bind('click', function(e){
				_addCalendarEvent(_activeCalendarId, popupContent, eventModel.id)
			})		
		}
		
		
		btCancel.bind('click', function(e){
			//popup.hide();
			var popup = $(this).closest('.popup-container');
			var closeLink = $('.close-popup', popup);
			console.warn(closeLink);
			closeLink.click();
		})
		
		btOk.appendTo(popupContent);
		btCancel.appendTo(popupContent);		
		
		startInput.bind('change', function(e){
			var newTime = $(this).datepicker( "getDate" )/1000 + 3600;
			newTime = module.Tools.fortmatStampToTimePicker(newTime);
			endInput.val(newTime);
		})		
		
		return popupContent;
	}
	
	_getGroupBlock = function() {
		var holder = $('<div />').addClass('events-calendars-holder');
		_holder = holder;		
		return holder;
		
	}
	
	_showEventPopup = function(eventObj, mode) {
	
		var eventBlock = _getEventBlock(eventObj);
		var groupBlock = _getGroupBlock();
		var popup = Zero.ModalController.getPopup('addGroupPopup');
		
		var popupContent = $('<div />').addClass('main-content');
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
		
		
		
		
		popup.setHeader(eventObj ? $('#subject', eventBlock).val() : 'New Event');
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
				
		if(valid != true) {
			_showErrors(valid, popup);
			return;
		}
		
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Access-Token", tokkens.accessToken);
			},				
			url: eventId ? initConfiguration.urlEventsCalendar + '/' + eventId : initConfiguration.urlEventsCalendar,
			type: eventId ? 'PUT' : 'POST',
			dataType: 'json',
			data : JSON.stringify(obj),
			contentType: "application/json",
			success: function (resp) {									
				if(resp && resp.errorCode == '1') {
					/*
					popup.hide();
					_drawCalendars();						
					*/
					_activePopup.hide();
				}
			}
		})		
		
	}
	
	
	/* Next up section */
	m.nextUpEvents = function(holder) {
		_getSettings();
	}

    _getSettings = function() {
        $.ajax({
            beforeSend: function (request) {
                request.setRequestHeader("Access-Token", tokkens.accessToken);
            },
            url: initConfiguration.urlSettings,
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
		var length = calIds.length > 1 ? 2 : calIds.length;
        var wrapper = $('#nextUpEventsHolder');
        wrapper.addClass('nextupevents').addClass('cf');
        wrapper.empty();
		for(i = 0; i < length; i++){
           var func = i == 0 ? _paintFirstRow : _paintNextRow;
           _getNextUpEvent(calIds[i], func);
        }
	}

	_getNextUpEvent = function(calIds, func){
        var now = Math.round(new Date().getTime() / 1000);
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
                "amount": 2,
                "direction": 1,
                "calendarIds": calIds,
                "onlyTitles": 0
            },
            success: function (data) {
                console.log(data);
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
                        + '<div class="leftEventBorder"><h1>' + subject + '<h1/>'
                        + '<h4>You Are Attending<h4/>'
                        + '<h2>' + location + '<h2/>'
                        + '<span>' + description + '<span/>'
                        + '</div></div>');
                } else {
                    var html = $('<div class="nextUpEvent rightNextUpEvent">' + '<div class="eventHeader cf"><h1>' + subject + '<h1/>'
                        + '<div class="eventtime">' + time + '<span class="ampm">' + ampm + '</span></div></div>'
                        + '<h4>You Are Attending<h4/>'
                        + '<h2>' + location + '<h2/>'
                        + '<span>' + description + '<span/>'
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


