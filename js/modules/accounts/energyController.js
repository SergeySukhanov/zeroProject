/**
 * Created with JetBrains WebStorm.
 * User: SNSukhanov
 * Date: 26.11.13
 * Time: 12:54
 * To change this template use File | Settings | File Templates.
 */


Zero.EnergyController = (function(module){
    var view = {},

        token = module.getTokens(),

        _render = function(){
            try{
                $.ajax({
                    beforeSend: function (request) {
					   request.setRequestHeader("Access-Token", token.accessToken);
				    },
                    url:initConfiguration.apiUrl + 'energy/detail',
                    type:'GET',
                    dataType:'json',
                    contentType:'application/json',
                    success:function(res){
                      _postRender(res.result);
                    }
                })
            }catch(e){
                console.log(e);
            }
        },

        _postRender = function(data){
            _paperPaint(data, 'energy');
        },

        _paperPaint = function(data, wrap){
            var width = 450;
            var height = 400;
            var center = [width/2, height/2];
            var bodyProgress = data.energy.bodyProgress;
            var mindProgress = data.energy.mindProgress;
            var socialProgress = data.energy.socialProgress;





            var paper = Raphael(wrap, width, height);

            var text11 = 'of your time is';
            var text12 = 'spent at work.';
            var text13 = 'Take several breaks';
            var text14 = 'throughout the day';

            var text21 = 'Attend your final Cross-Fit class';
            var text22 = 'this Friday and will complete';
            var text23 = '100% of your activity!';

            var text31 = 'You are on track with all of your';
            var text32 = 'metings! Keep up the great work';
            var text33 = 'You only have 2 more scheduled';
            var text34 = 'events. Atten and reach 100%';

            var paperLeft = paper.circle(center[0]-50, center[1]-50, bodyProgress+20);
               paperLeft.attr({'fill':'#FF6600', 'stroke-width':0, 'opacity':0.6});

            var paperRight = paper.circle(center[0], center[1]+50, mindProgress+20);
            paperRight.attr({'fill':'#FF9900', 'stroke-width':0, 'opacity':0.6});

            var paperRightBottom = paper.circle(center[0]+50, center[1]-50, socialProgress+20);
            paperRightBottom.attr({'fill':'#FFCC00', 'stroke-width':0, 'opacity':0.6});

    //center

            var rectCenter = paper.rect(center[0]-55, center[1]+80, 220, 90, 5);
            rectCenter.attr({'fill':'#fef5ee', 'stroke':'#feb485'}).hide();

            var CenterRectText1 = paper.text(center[0]+45, center[1]+105, text31);
            CenterRectText1.attr({
                'font-size':'13px',
                'fill':'#666'
            }).hide();
            var CenterRectText2 = paper.text(center[0]+45, center[1]+117, text32);
            CenterRectText2.attr({
                'font-size':'13px',
                'fill':'#666'
            }).hide();
            var CenterRectText3 = paper.text(center[0]+45, center[1]+137, text33);
            CenterRectText3.attr({
                'font-size':'13px',
                'fill':'#666'
            }).hide();
            var CenterRectText4 = paper.text(center[0]+45, center[1]+152, text34);
            CenterRectText4.attr({
                'font-size':'13px',
                'fill':'#666'
            }).hide();


     // right

            var rectLeft = paper.rect(center[0]+75, center[1]-110, 150, 90, 5);
            rectLeft.attr({'fill':'#fef5ee', 'stroke':'#feb485'}).hide();

            var leftRectText1 = paper.text(center[0]+140, center[1]-95, text11);
            leftRectText1.attr({
                'font-size':'13px',
                'fill':'#666'
            }).hide();
            var leftRectText2 = paper.text(center[0]+140, center[1]-77, text12);
            leftRectText2.attr({
                'font-size':'13px',
                'fill':'#666'
            }).hide();
            var leftRectText3 = paper.text(center[0]+140, center[1]-47, text13);
            leftRectText3.attr({
                'font-size':'13px',
                'fill':'#666'
            }).hide();
            var leftRectText4 = paper.text(center[0]+140, center[1]-32, text14);
            leftRectText4.attr({
                'font-size':'13px',
                'fill':'#666'
            }).hide();


     // left
            var rectRight = paper.rect(center[0]-125, center[1]-170, 200, 90, 5);
            rectRight.attr({'fill':'#fef5ee', 'stroke':'#feb485'}).hide();

            var RightRectText1 = paper.text(center[0]-25, center[1]-145, text21);
            RightRectText1.attr({
                'font-size':'13px',
                'fill':'#666'
            }).hide();
            var RightRectText2 = paper.text(center[0]-35, center[1]-127, text22);
            RightRectText2.attr({
                'font-size':'13px',
                'fill':'#666'
            }).hide();
            var RightRectText3 = paper.text(center[0]-59, center[1]-107, text23);
            RightRectText3.attr({
                'font-size':'13px',
                'fill':'#666'
            }).hide();


            var smallLeftCircle =  paper.circle(center[0]-70, center[1]-70, 20);
                smallLeftCircle.attr({'fill':'#FF6600', 'stroke-width':0, 'opacity':1, 'stroke':'#f4f4f4'});

            var leftText = paper.text(center[0]-70, center[1]-70, data.energy.bodyProgress+'%');
            leftText.attr({
                'font-size':'13px',
                'fill':'#f2f2f2'
            }).hover(function(){
                    rectRight.show();
                    RightRectText1.show();
                    RightRectText2.show();
                    RightRectText3.show();
                },
                function(){
                    rectRight.hide();
                    RightRectText1.hide();
                    RightRectText2.hide();
                    RightRectText3.hide();
                });


            var smallRightCircle = paper.circle(center[0], center[1]+80, 20);
                smallRightCircle.attr({'fill':'#FF6600', 'stroke-width':0, 'opacity':1, 'stroke':'#f4f4f4'});
            var rightText = paper.text(center[0], center[1]+80, data.energy.mindProgress+'%');
            rightText.attr({
                'font-size':'13px',
                'fill':'#f2f2f2'
            }).hover(function(){
                    rectCenter.show();
                    CenterRectText1.show();
                    CenterRectText2.show();
                    CenterRectText3.show();
                    CenterRectText4.show();
                },
                function(){
                    rectCenter.hide();
                    CenterRectText1.hide();
                    CenterRectText2.hide();
                    CenterRectText3.hide();
                    CenterRectText4.hide();
                });



            var smallRightBottomCircle = paper.circle(center[0]+70, center[1]-70, 20);
                smallRightBottomCircle.attr({'fill':'#FF6600', 'stroke-width':0, 'opacity':1, 'stroke':'#f4f4f4'});
            var rightBottomText = paper.text(center[0]+70, center[1]-70, data.energy.socialProgress+'%');
            rightBottomText.attr({
                'font-size':'13px',
                'fill':'#f2f2f2'
            }).hover(function(){
                    rectLeft.show();
                    leftRectText1.show();
                    leftRectText2.show();
                    leftRectText3.show();
                    leftRectText4.show();
                },
                function(){
                    rectLeft.hide();
                    leftRectText1.hide();
                    leftRectText2.hide();
                    leftRectText3.hide();
                    leftRectText4.hide();
                });


            var centerCircle = paper.circle(center[0], center[1], 50);
            centerCircle.attr({'fill':'#fcfcfc', 'stroke-width':0, 'opacity':0.8});
           var centerText = paper.text(center[0], center[1], data.energy.totalProgress);
               centerText.attr({
                   'font-size':'55px',
                   'fill':'#ff701e'
               });





            function arc(center, radius, startAngle, endAngle) {
                angle = startAngle;
                coords = toCoords(center, radius, angle);
                path = "M " + coords[0] + " " + coords[1];
                while(angle<=endAngle) {
                    coords = toCoords(center, radius, angle);
                    path += " L " + coords[0] + " " + coords[1];
                    angle += 1;
                }
                return path;
            }

            function toCoords(center, radius, angle) {
                var radians = (angle/180) * Math.PI;
                var x = center[0] + Math.cos(radians) * radius;
                var y = center[1] + Math.sin(radians) * radius;
                return [x, y];
            }

//            var finish = (willpower*3.6)-90;
            var finish = 300;


            var ps = paper.path(arc(center, 51, -90, finish));
            ps.attr({stroke:'#ff701e',"stroke-width":4});
        };



    view.initialize = function(){
        _render();
    };

    return view;
}(Zero));