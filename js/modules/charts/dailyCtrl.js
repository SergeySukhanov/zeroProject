/**
 * Created with JetBrains WebStorm.
 * User: SNSukhanov
 * Date: 14.11.13
 * Time: 11:26
 * To change this template use File | Settings | File Templates.
 */

Zero.DailyController = (function(module){
    var view  = {},

        _params = {},

        _createDaily = function(){
          var wrapper = $('#dailyHolder');

            var visibleItems = $('<div/>').addClass('visible-items');

            var innerVisibleItem = $('<div/>').addClass('visible-item');
            var h6Visible = $('<h6/>').text(Zero.Tools.setFullDate(_params[_params.length-1].date*1000));
            var pVisibleSteps = $('<p/>').addClass('visible-step')
                                         .text('Steps: '+_params[_params.length-1].steps);
            var pVisibleDistance = $('<p/>').addClass('visible-distance')
                                            .text('Distance: '+_params[_params.length-1].distance.toFixed(2));
            var spanCorner = $('<span/>').addClass('corner-daily');

            innerVisibleItem.append(h6Visible);
            innerVisibleItem.append(pVisibleSteps);
            innerVisibleItem.append(pVisibleDistance);
            innerVisibleItem.append(spanCorner);

            visibleItems.append(innerVisibleItem);

            //handler
            visibleItems.bind('click', function(event){
                $(event.currentTarget).next().slideToggle();
            });

            var otherItems = $('<div/>').addClass('other-items');
            for(var i=_params.length-1; i>=0; i--){
                if(i != _params.length-1){
                    var item = $('<div/>').addClass('other-item').attr('idItem', i);
                    var h6 = $('<h6/>').text(Zero.Tools.setFullDate(_params[i].date*1000));
                    var pSteps = $('<p/>').addClass('steps')
                                          .text('Steps: '+_params[i].steps);
                    var pDistance = $('<p/>').addClass('distance')
                                             .text('Distance: '+_params[i].distance.toFixed(2));

                    item.append(h6);
                    item.append(pSteps);
                    item.append(pDistance);

                    otherItems.append(item);
                }
            }

            wrapper.append(visibleItems);
            wrapper.append(otherItems);

        };

    view.init = function(data){
        _params = data.daily;
        _createDaily();
    };

    return view;
}(Zero));