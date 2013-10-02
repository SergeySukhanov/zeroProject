Zero.WeatherController = (function(module){
    var view = {},

        config = {
            units:"metric",
            wrapper: ""
        },

        tokens = module.getTokens(),

        _getLocationData = function(wrapper) {
            wrapper.addClass('weather');
            var message = $('<h1/>').text('Loading weather...').addClass('weathermsg');
            wrapper.append(message);

            if (navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition(_showPosition, _noLocation);
            }
            else
            {
                _noLocation();
            }
        },

        _showPosition = function(position)
        {
            var filter = { 'lon' : position.coords.longitude, 'lat' : position.coords.latitude, 'client' : 'leia', 'units' : config.units }
            _getWeatherData(filter);
        },

        _noLocation = function() {
            _paintWeatherBox(null);
        },

        _getWeatherData = function(dataFilter){
            try{
                $.ajax({
                beforeSend: function (request) {
                    request.setRequestHeader("Access-Token", tokens.accessToken);
                    },
                    url:initConfiguration.urlWeather,
                    type:'GET',
                    dataType:'json',
                    contentType:'application/json',
                    data:dataFilter,
                    success:function(data){
                        _postRender(data);
                    },
                    error:function(error){
                        console.log(error);
                    }
                });
            }catch(e){
                console.log(e);
            }
        },

        _postRender = function(data){
            _paintWeatherBox(data);
            _handlers();
        },

        _paintWeatherBox = function(data){
            var wrapper = config.wrapper;
            wrapper.addClass('weather');
            wrapper.empty();
            if(data == null){
               var message = $('<h1/>').text('Could not get weather').addClass('weathermsg');
               wrapper.append(message);
               return;
            }

            try
            {
                var tempValue = parseInt(data.result.temperature);
            }
            catch(ex)
            {
                console.log(ex);
                var message = $('<h1/>').text('Could not get weather').addClass('weathermsg');
                wrapper.append(message);
                return;
            }
            var typeValue = data.result.weatherType.toLowerCase();;
            var divWeather = $('<div/>');
            var img = $('<img/>').attr('src', data.result.weatherIconUrl).addClass('weathericon');
            var text = $('<div/>').addClass('text');
            var temp = $('<div/>').text(tempValue).addClass('grad');
            var sup = $('<sup/>').text('o');
            temp.append(sup);
            var type = $('<div/>').text(typeValue).addClass('type');
            divWeather.append(img);
            text.append(temp);
            text.append(type);
            divWeather.append(text);
            wrapper.append(divWeather);
        },

        _handlers = function(data){
            console.log(data);
        },

        _render = function(wrapper) {
            _getLocationData(wrapper);
        };

    view.initialize = function(wrapper){
        config.wrapper = wrapper;
        _render(wrapper);
    };

    return view;
}(Zero));
