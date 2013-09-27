Zero.NextUpEventsController = (function(module){
    var view = {},

        config = {
            units:"metric"
        },

        tokens = module.getTokens(),

        _render = function() {
            _getCalendars();
        },

        _getCalendars = function() {
            try{
                $.ajax({
                    beforeSend: function (request) {
                        request.setRequestHeader("Access-Token", tokens.accessToken);
                    },
                    url: initConfiguration.urlCalendarsList,
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

        },

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
        },

        _getCalendarsEvents = function(calList) {
            var now = Math.round(new Date().getTime() / 1000)
            var calIds = _getCalIds(calList);
            try{
                $.ajax({
                    beforeSend: function (request) {
                        request.setRequestHeader("Access-Token", tokens.accessToken);
                    },
                    url: initConfiguration.urlEventsCalendar,
                    type: 'GET',
                    dataType: 'json',
                    contentType: "application/json",
                    data: {
                        "start" : now,
                        "amount": 2,
                        "direction": 1,
                        "calendarIds": calIds
                    },
                    success: function (resp) {
                        _paintNextUpEvents(resp);
                    },
                    error : function(error) {
                        console.log(error);
                    }
                })
            }catch(e){
                console.log(e);
            }
        },

        _paintNextUpEvents = function(data){
            var wrapper = $('#nextUpEventsHolder');
            wrapper.addClass('nextupevents');
            wrapper.empty();

            if(data != null && data.events && data.events.length > 0 ) {
                var arr = data.events.sort(_startTimeSort);
                for(var i = 0; i < arr.length; i++) {
                    var event = _getEventHtml(arr[i], i);
                    wrapper.append(event);
                }
            } else {
                var message = $('<h1/>').text('No events in calendars');
                wrapper.append(message);
            }
        },

        _getEventHtml = function(event, eventNum) {
            var html;
            var startDate = new Date(event.startTime*1000);
            var startTime = Zero.Tools.formatAMPM(startDate);
            var location = event.location || '';
            var persons = _getAttendees(event.attendees);

            if(eventNum == 0){
            html = $('<div class="nextEventFirst"><h3>NEXT UP</h3>'
                + '<p class="dates">' + startTime + '</p>'
                + '<h1>' + event.subject + '<h1/>'
                + '<h4>You Are Attending<h4/>'
                + '<h2>' + event.location + '<h2/>'
                + '<span>' + event.description + '<span/>'
                + '</div>');
            } else {
                html = $('<div class="nextEventSecond">' + '<h1>' + event.subject + '<h1/>' +
                    + '<p class="dates">' + startTime + '</p>'
                    + '<h4>You Are Attending<h4/>'
                    + '<h2>' + location + '<h2/>'
                    + '<span>' + event.description + '<span/>'
                    + '</div>');
            }

            return html;
        },

        _startTimeSort = function (a, b) {
            return a.startTime - b.startTime;
        },

        _handlers = function(data){
            console.log(data);
        };

    view.initialize = function(){
        _render();
    };

    return view;
}(Zero));

