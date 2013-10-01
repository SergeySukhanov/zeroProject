Zero.SmallCalendarWidgetController = (function(module){
    var view = {},

        _locationBlock=null,

        _render = function(holder){
            _paintCalendar(holder);
            _handlers();
        },

        _handlers = function(){
        	$('.addEventButton').bind('click', function(event){
        		console.log('click');
        		Zero.Events.showEventPopup();
				e.preventDefault();
        	})
        },

        _paintCalendar = function(wrapper){
            var divWeatherClock = $('<div/>').addClass('weather-clock-block').addClass("cf");
            var divWeather = $('<div/>').addClass('weather');
            divWeatherClock.append(divWeather);
            _createWeather(divWeather);
            var timeLocationBlock = $('<div/>').addClass('town c-dgrey');
            _locationBlock = timeLocationBlock;
            _paintClock(timeLocationBlock);
            divWeatherClock.append(timeLocationBlock);
            wrapper.append(divWeatherClock);
            _addDatePicker(wrapper);
            var addEventButton = $('<div/>').addClass('addEventButton').addClass('cf');
            var plus = $('<p/>').text("+");
            var text = $('<div/>').text("ADD EVENT");
            addEventButton.append(plus);
            addEventButton.append(text);
            wrapper.append(addEventButton);
        },

        _createWeather = function(wrap){
            Zero.WeatherController.initialize(wrap);
        },

        _paintClock = function(wrap)
        {
            var timeBlock = $('<div/>').addClass('time');
            _setTime(timeBlock);
            setTimeout(function(){_setTime(timeBlock)},15000);
            wrap.append(timeBlock);
            if (navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition(_getLocationName);
            }
        },

        _getLocationName = function(position) {
            Zero.Tools.getLocationName(position.coords.longitude, position.coords.latitude,_setLocation);
        },

        _setLocation = function(location){
            var locBlock = $('<div/>').addClass('place');
            locBlock.text(location);
            _locationBlock.append(locBlock);
        },

        _setTime = function(wrap){
            wrap.text(_getTimeNow());
        },

        _getTimeNow = function(){
            var date = new Date();
            var time = Zero.Tools.formatAMPM(date);
            return time.time + time.ampm;
        },

        _addDatePicker = function(wrapper){
            var datepicker = $('<div/>').addClass('smalldatepicker');
            wrapper.append(datepicker);
            datepicker.datepicker();
        };

    view.initialize = function(holder){
        _render(holder);
    };

    return view;
}(Zero));
