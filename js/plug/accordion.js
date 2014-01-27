/**
 * Created with JetBrains WebStorm.
 * User: SNSukhanov
 * Date: 14.01.14
 * Time: 15:38
 * To change this template use File | Settings | File Templates.
 */

function Accordion(options){
    var view = this;

    var config = {
      wrap:options.wrap,
      count:options.count,
      labels:options.labels,
      ids:options.ids,
      addData:options.add
    };

    var _paintAccordionHTML = function(){
        var wrapper = $(config.wrap);

        for(var i=0; i<config.count; i++){
           var divHead = $('<div/>').addClass('user-head-wrapper').attr('ids', config.ids[i]);
           var h3 = $('<h3/>').addClass('user-head').text(config.labels[i]);
           var span = $('<span/>').addClass('corner-head-down');
            divHead.append(h3);
            divHead.append(span);

           var divBody = $('<div/>').addClass('user-body');

            wrapper.append(divHead);
            wrapper.append(divBody);

            _handler(divHead);
        }
    };

    var _handler = function(handler){
         handler.bind('click', function(event){
             var head = $(event.currentTarget);
             var otherHead = $('.user-head-wrapper').not($(event.currentTarget));
             var body = $(event.currentTarget).next();
             var otherBody = $('.user-head-wrapper').not($(event.currentTarget)).next();
             otherHead.removeClass('revert');
             head.toggleClass('revert');
             otherBody.slideUp();
             body.slideToggle();
           config.addData(body);
         });
    };

    view.init = function(){
       _paintAccordionHTML();
    };

    view.init();
}