/**
 * Created with JetBrains WebStorm.
 * User: SNSukhanov
 * Date: 14.11.13
 * Time: 11:26
 * To change this template use File | Settings | File Templates.
 */

Zero.DailyController = (function(module){
    var view  = {},

        config = {

        },

        _params = {},

        _createDaily = function(){
          var wrapper = $('.daily');

            var visibleItems = $('<div/>').addClass('visible-items');

            var innerVisibleItem = $('<div/>').addClass('visible-item');
            var h6Visible = $('<h6/>').text(_params[_params.length-1].date);
            var pVisibleSteps = $('<p/>').addClass('visible-step').text('Steps: '+_params[_params.length-1].steps);
            var pVisibleDistance = $('<p/>').addClass('visible-distance').text('Distance: '+_params[_params.length-1].distance);

            var spanCorner = $('<span/>').addClass('corner-daily');
            innerVisibleItem.append(h6Visible);
            innerVisibleItem.append(pVisibleSteps);
            innerVisibleItem.append(pVisibleDistance);
            innerVisibleItem.append(spanCorner);

            visibleItems.append(innerVisibleItem);


            var otherItems = $('<div/>').addClass('other-items');
            for(var i=_params.length-1; i>=0; i--){
                if(i != _params.length-1){
                    var item = $('<div/>').addClass('other-item');
                    var h6 = $('<h6/>').text(_params[i].date);
                    var pSteps = $('<p/>').addClass('steps').text('Steps: '+_params[i].steps);
                    var pDistance = $('<p/>').addClass('distance').text('Distance: '+_params[i].distance);

                    item.append(h6);
                    item.append(pSteps);
                    item.append(pDistance);

                    otherItems.append(item);
                }
            }

            wrapper.append(visibleItems);
            wrapper.append(otherItems);

        },

        _actionDaily = function(){

            $('.visible-item').bind('click', function(event){
                console.log('click');
               $('.other-items').slideToggle();
            });



        };

    view.init = function(data){
        if(1==0){
            _params = data;
        }else{
           _params = [
               {
                   "date": '7 nov 2013',
                   "fuel": null,
                   "steps": '200',
                   "distance": '1'
               },
               {
                   "date": '8 nov 2013',
                   "fuel": null,
                   "steps": '200999',
                   "distance": '123'
               },
               {
                   "date": '9 nov 2013',
                   "fuel": null,
                   "steps": '28900',
                   "distance": '12'
               },
               {
                   "date": '10 nov 2013',
                   "fuel": null,
                   "steps": '12200',
                   "distance": '10'
               },
               {
                   "date": '11 nov 2013',
                   "fuel": null,
                   "steps": '800',
                   "distance": '1.5'
               },
               {
                   "date": '12 nov 2013',
                   "fuel": null,
                   "steps": '600',
                   "distance": '1'
               },
               {
                   "date": '13 nov 2013',
                   "fuel": null,
                   "steps": '2200',
                   "distance": '4'
               },
               {
                   "date": '14 nov 2013',
                   "fuel": null,
                   "steps": '1200',
                   "distance": '3'
               }

           ]
        }
     _createDaily();
        _actionDaily();
    };

    return view;
}(Zero));