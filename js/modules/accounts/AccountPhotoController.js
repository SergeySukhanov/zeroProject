Zero.AccountPhotoController = (function(module){
    var view = {},

        config = {
            faceImg:"no-photo.PNG"
        },

        tokens = module.getTokens(),

        _render = function() {
            _getMomentumData();
        }

        _getMomentumData = function(dataFilter){
            try{
                $.ajax({
                    beforeSend: function (request) {
                        request.setRequestHeader("Access-Token", tokens.accessToken);
                    },
                    url:initConfiguration.urlWillpower,
                    type:'GET',
                    dataType:'json',
                    contentType:'application/json',
                    success:function(data){
                        _postRender( data.result)
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
            _paintAvatar(data);
            _handlers();
        },

        _paintAvatar = function(data){
            var root = initConfiguration.getRootLocation();

            if(data == null){
                var imgFace = $('<img/>').attr('src', root+initConfiguration.imagesFolder+config.faceImg);
                wrapper.prepend(imgFace);
                return;
            }

            var willpower = data[data.length-1].percent;
            var paper = Raphael('userPhotoHolder', 170, 170);

            paper.customAttributes.arc = function(xc, yc, power, r){
                var angle = 90 * Math.PI / 180;
                var x0 = xc + r * Math.cos(angle);
                var y0 = yc - r * Math.sin(angle);
                var alpha = (360/100)*power;
                angle = (90 - alpha) * Math.PI / 180;
                var x1 = xc + r * Math.cos(angle);
                var y1 = yc - r * Math.sin(angle);
                var a = +(alpha > 180);
                if (power == 100) {
                    var path = [["M", x0, y0], ["A", r, r, 0, 1, 1, x0-0.01, y0]];
                } else {
                    var path = [["M", x0, y0], ["A", r, r, 0, a, 1, x1, y1]];
                }
                return {path:path};
            }

            var radius = 40;
            var xc = 50;
            var yc = 50;
            var path = paper.path().attr({arc: [xc, yc, 0, radius]});
            var color = '#8ebf88';
            if (willpower > 100)
            {
                willpower=100;
            }
            if(willpower < 0)
            {
                willpower = -willpower;
                color = '#D69494';
            }
            path.attr('stroke',color);
            path.attr('stroke-width','5');
            path.animate({arc: [xc, yc, willpower, radius]}, 3e3);

            var imgExample = paper.image(root+initConfiguration.imagesFolder+config.faceImg,10,10,80,80);
        },

        _handlers = function(data){
            console.log(data);
        };

    view.initialize = function(){
        _render();
    };

    return view;
}(Zero));

