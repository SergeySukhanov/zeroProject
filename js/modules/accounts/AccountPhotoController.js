Zero.AccountPhotoController = (function(module){
    var view = {},

        config = {
            faceImg:"no-photo.PNG"
        },

        tokens = module.getTokens(),

        paper = "",

        _renderPhotoController = function() {
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
                        _postRenderPhotoController( data.result)
                    },
                    error:function(error){
                        console.log(error);
                    }
                });
            }catch(e){
                console.log(e);
            }
        },

        _postRenderPhotoController = function(data){
            _paintAvatar(data);
            _handlers();
        },

        _paintAvatar = function(data){
            if(data && data.length > 0){
                var willpower = data[data.length-1].percent;
            }
            else{
                var willpower = 50;
            }
            paper = Raphael('userPhotoHolder', 170, 170);

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

            _getAvatarUrl();
        },

        _getAvatarUrl = function() {
            $.ajax({
                beforeSend: function (request) {
                    request.setRequestHeader("Access-Token", tokens.accessToken);
                },
                url: initConfiguration.urlSettings,
                type: 'GET',
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    _loadAvatar(data);
                },
                error : function(error) {
                    console.log(error);
                }
            })
        },

        _loadAvatar = function(data){
            var root = initConfiguration.getRootLocation();
            var url = data.result.avatarUrl;
            var circle = paper.circle(50, 50, 38);
            var uuid = Raphael.createUUID();
            var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
            if(url){
                var image = paper.image(url,0,0,1,1);
                image.rotate(90);
            } else {
                var image = paper.image(root+initConfiguration.imagesFolder+config.faceImg,0,0,1,1);
            }
            pattern.setAttribute("id", uuid);
            pattern.setAttribute("x", 0);
            pattern.setAttribute("y", 0);
            pattern.setAttribute("height", 1);
            pattern.setAttribute("width", 1);
            pattern.setAttribute("patternContentUnits", "objectBoundingBox");
            $(image.node).appendTo(pattern);
            $(pattern).appendTo(paper.defs);
            $(circle.node).attr({fill: "url(#" + pattern.id + ")", stroke: "#FFF", "stroke-width": 0});
        }

        _handlers = function(data){
            // console.log(data);
        };

    view.initialize = function(){
        _renderPhotoController();
    };

    return view;
}(Zero));

