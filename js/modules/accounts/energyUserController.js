/**
 * Created with JetBrains WebStorm.
 * User: SNSukhanov
 * Date: 05.12.13
 * Time: 11:59
 * To change this template use File | Settings | File Templates.
 */

Zero.EnergyUserController = (function(module){
    var view = {},

        _addContent = function(){
            var ev = $(event.currentTarget);
            var body = ev.next().children().length;
            if(body === 0){
                var evId = ev.attr('ids');
                var data = {};
                if(evId === 'teams'){
                    data = initConfiguration.energyUserTeam[evId];
                    ev.next().html(_paintContentTeams(data));
                }else{
                    data = initConfiguration.energyUser[evId];
                    ev.next().html(_paintContentPrograms(data));
                }
            }
        },

        _paintContentPrograms = function(data){
            var items = [];
            for(var i=0; i<data.length; i++){
                var wrapperItem = $('<div/>').addClass('wrapper-item');
                var imageWrap = $('<div/>').addClass('img-wrap');
                var textWrap = $('<div/>').addClass('text-wrap');
                var img = $('<img/>').attr({
                    'src':data[i].imageUrl
                });
                imageWrap.append(img);

                var p;
                if(data[i].text){
                     p = $('<p/>').text(data[i].text);
                    textWrap.append(p);
                }else{
                    var h4 = $('<h4/>').text(data[i].name);
                    var span = $('<span/>').text('progress: ' + data[i].progress);
                    p = $('<p/>').text(data[i].desc);
                    textWrap.append(h4);
                    textWrap.append(span);
                    textWrap.append(p);
                }
                wrapperItem.append(imageWrap);
                wrapperItem.append(textWrap);
                items.push(wrapperItem);
            }
            return items;
        },

        _paintContentTeams = function(data){
              var items = [];

            for(var i=0; i<data.length; i++){
                var wrapperItem = $('<div/>').addClass('wrapper-item');
                var textWrap = $('<div/>').addClass('text-wrap').addClass('team');
                var h4 = $('<h4/>').text(data[i].name);
                var sup = $('<sup/>').html('active: ' + '<span class=' + data[i].active + '>' + data[i].active + '</span>');
                var spanMembers = $('<span/>').text('Members: ' + data[i].membersCount);
                var spanEnergy = $('<span/>').text('Energy: ' + data[i].energy);
                var spanOwner = $('<span/>').text('Owner: ' + data[i].owner);
                var spanDate = $('<span/>').addClass('date').text(Zero.Tools.setFullDate(data[i].created));

                h4.append(sup);
                textWrap.append(h4);
                textWrap.append(spanMembers);
                textWrap.append(spanEnergy);
                textWrap.append(spanOwner);
                textWrap.append(spanDate);

                wrapperItem.append(textWrap);
                items.push(wrapperItem);
            }

            return items;
        };

    view.initialize = function(){
        new Accordion({
            wrap:'#user-settings-details',
            count:3,
            labels:['Current programs', 'Just completed', 'Teams'],
            ids:['programs', 'justCompleted', 'teams'],
            add:_addContent
        })
    };

    return view;
}(Zero));