/**
 * Created with JetBrains WebStorm.
 * User: SNSukhanov
 * Date: 11.12.13
 * Time: 13:50
 * To change this template use File | Settings | File Templates.
 */



Zero.EnergyIntervalController = (function(module){
    var view = {},

        config = {

        },

        tokkens = module.getTokens(),

        _render = function(){
            try{
                $.ajax({
                    beforeSend: function (request) {
                        request.setRequestHeader("Access-Token", tokkens.accessToken);
                    },
                    url:initConfiguration.apiUrl + 'energy/detail',
                    type:'GET',
                    dataType:'json',
                    contentType:'application/json',
                    success:function(res){
                        _postRender(res.result.history);
                    }
                })
            }catch(e){
                console.log(e);
            }
        },

        _postRender = function(res){
            config.wrap = 'energyInterval';
            config.mainWrap = $('.energy-interval');
            config.widthPaper = 800;
            config.heightPaper = 230;

            config.week = res.week;
            config.weekCount = res.week.length;

            config.month = res.month;
            config.monthCount = res.month.length;

            config.year = res.year;
            config.yearCount = res.year.length;

            _paintEnergyPaper("week");
            _switcherEnergy();

        },

        _paintEnergyPaper = function(type){
            if(config.paper){
                config.paper.remove();
                _intervalPaper(type);
            }else{
                _intervalPaper(type);
            }


        },

        _intervalPaper = function(type){
            config.paper = Raphael(config.wrap, config.widthPaper, config.heightPaper);
//            var xLine = config.paper.path("M30 10V200");
//            xLine.attr({'stroke-width':1, 'opacity':1, 'stroke':'#999999'});
//            var yLine = config.paper.path("M10 200H800");
//            yLine.attr({'stroke-width':1, 'opacity':1, 'stroke':'#ffffff'});
           //сетка
            var startX = 10;
            var startY = 10;
            var monthList = initConfiguration.monthShortList;
            var weekList = initConfiguration.weekShortList;
            var widthItem = (config.widthPaper)/config[type].length;
            for(var i=0; i<config[type].length; i++){
                var line = config.paper.path("M"+(startX+35)+" "+startY+"V200");
                line.attr({'stroke-width':1, 'opacity':1, 'stroke':'#999999'});
               if(type == "week"){
                 var typeText = weekList[i];
               }else if(type == "month"){
                 var typeText = monthList[i];
               }else{
                 var typeText = (i+1)+" "+monthList[new Date().getMonth()];
               }

                var textT = config.paper.text((startX+35), 210, typeText);
                textT.attr({
                    'font-size':'12px',
                    'fill':'#222222'
                });

                startX = startX+widthItem;
            }
            var startXCircle = 45;

            for(var j=0; j<config[type].length; j++){
                if(config[type][j+1] != undefined){
                    var lineBetween = config.paper.path("M"+startXCircle+" " + (-config[type][j]+130) + "L" + (startXCircle+widthItem) + " " + (-config[type][j+1]+130));
                    lineBetween.attr({'stroke-width':2, 'opacity':1, 'stroke':'#ff9900'});
                }

               var circle = config.paper.circle(startXCircle, -config[type][j]+130, 20);
                   circle.attr({'stroke-width':2, 'opacity':1, 'stroke':'#ff9900', 'fill':'#ffffff'});
               var text = config.paper.text(startXCircle, -config[type][j]+130, config[type][j]);
                text.attr({
                    'font-size':'13px',
                    'fill':'#333333'
                });

                startXCircle = startXCircle + widthItem;
            }
        },

        _switcherEnergy = function(){
           var wrapperSwitcher = $('<div/>').addClass('wrapper-switcher');
           var week = $('<span/>').addClass('week').text('WEEK');
           var month = $('<span/>').addClass('month').text('MONTH');
           var year = $('<span/>').addClass('year').text('YEAR');

               wrapperSwitcher.append(week);
               wrapperSwitcher.append(month);
               wrapperSwitcher.append(year);

            config.mainWrap.append(wrapperSwitcher);

            week.bind('click', function(event){
               console.log(config.week);
                $('.head-interval-energy').text('Energy week');
                _paintEnergyPaper("week");
            });
            month.bind('click', function(event){
                $('.head-interval-energy').text('Energy month');
                _paintEnergyPaper("month");
            });
            year.bind('click', function(event){
                $('.head-interval-energy').text('Energy year');
                _paintEnergyPaper("year");
            });
        };

    view.initialize = function(){
      _render();
    };

    return view;
}(Zero));