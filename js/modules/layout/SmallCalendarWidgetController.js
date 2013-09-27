Zero.SmallCalendarWidgetController = (function(module){
    var view = {},

        config = {
        },

        _render = function(holder){
            _paintCalendar(holder);
        },

        _handlers = function(){
        },

        _paintCalendar = function(wrapper){
            var divWeather = $('<div/>').attr('id','weatherHolder');
            wrapper.append(divWeather);
            _createWeather(divWeather);
        },

        _createWeather = function(wrap){
            Zero.WeatherController.initialize(wrap);
        },

        _getTimeNow = function(){
            var date = new Date();
            var time = Zero.Tools.formatAMPM(date);
            return time;
        };

    view.initialize = function(holder){
        _render(holder);
    };

    return view;
}(Zero));
