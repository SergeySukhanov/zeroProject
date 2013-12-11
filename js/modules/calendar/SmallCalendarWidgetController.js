Zero.SmallCalendarWidgetController = (function(module){
    var view = {},

        _locationBlock=null,

        _render = function(){
            _paintCalendar();
            _handlers();
        },

        _handlers = function(){
        	$('.addEventButton').bind('click', function(event){
        		Zero.Events.showEventPopup();
				event.preventDefault();
        	})        	
        },

        _paintCalendar = function(){
            var wrapper = $('#smallCalendarHolder');
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
            Zero.WeatherController.initialize(wrap, _setLocation);
        },

        _paintClock = function(wrap)
        {
            var timeBlock = $('<div/>').addClass('time');
            _setTime(timeBlock);
            setInterval(function(){_setTime(timeBlock)},15000);
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
            if(_locationBlock.find('.place').length > 0){
                _locationBlock.find('.place').text(location);
            } else {
                var locBlock = $('<div/>').addClass('place');
                _locationBlock.append(locBlock);
                if(location && location != ""){
                    locBlock.text(location);
                } else{
                    if (navigator.geolocation)
                    {
                        navigator.geolocation.getCurrentPosition(_getLocationName);
                    }
                }
            }
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
            datepicker.datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
				onSelect: function(){
					var selectDay = $(this).datepicker("getDate")
					_showWeekPopup(selectDay);
				}
			});
        },
		
		_showWeekPopup = function(date) {
			if($('#weekView').length !=0) {
				$('#weekView').remove();
			}
		
			var switcher = $('<div />').attr('id', 'weekSwitcher');
			var wrapper = $('<div />').attr('id', 'weekWrapper');
			var papper = $('<div />').attr('id', 'paper');
			var eventInfo = $('<div />').attr('id', 'eventInfo');
			var popupContent = $('<div />').attr('id', 'weekView');
			var closePopup = $('<button />').addClass('close-popup').text('Cancel');
			var btHolder = $('<div />').addClass('popup-action');
			
			
			closePopup.appendTo(btHolder);			
			btHolder.appendTo(popupContent);			
			switcher.appendTo(popupContent);
			wrapper.appendTo(popupContent);
			papper.appendTo(popupContent);
			eventInfo.appendTo(popupContent);

			popupContent.appendTo($('body')[0]);	
			
			closePopup.bind('click',function(){
				$('#weekView').remove();
			});
			
			module.Week.init(date);
			
		};

    view.initialize = function(){
        _render();
    };

	
	
	
    return view;
}(Zero));
