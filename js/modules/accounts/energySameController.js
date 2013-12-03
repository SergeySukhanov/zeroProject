/**
 * Created with JetBrains WebStorm.
 * User: SNSukhanov
 * Date: 29.11.13
 * Time: 11:32
 * To change this template use File | Settings | File Templates.
 */

Zero.EnergySameController = (function(module){
    var view = {},

        config = {

        },

        _id = 0,

        tokens = module.getTokens(),

        _render = function() {
             try{
                 $.ajax({
                     beforeSend: function (request) {
                         request.setRequestHeader("Access-Token", tokens.accessToken);
                     },
                     url:initConfiguration.apiUrl + 'energy/same',
                     type:'GET',
                     dataType:'json',
                     contentType:'application/json',
                     success:function(res){
                         _postRender(res.result);
                     }
                 })
             }catch (e){
                 console.log(e);
             }
        },

        _postRender = function(data){
            console.log(data);
            var wrapper = $('#members-friends');
            var popup = $('.member-details');
            var activeId = 0;
          for(var i=0; i<data.length; i++){
              var wrapUser = $('<div/>').addClass('wrap-user-item').attr('user-id', data[i].userId);
             var user = Zero.Tools.getUserAvatar(data[i], 50, 50);

              wrapUser.append(user);

              wrapper.append(wrapUser);
             wrapUser.bind('click', function(event){
                 _id = parseInt($(event.currentTarget).attr('user-id'))
                    if(parseInt($(event.currentTarget).attr('user-id')) == activeId){
                        if(popup.css('display') == 'none'){
                            _getUserInfo($(event.currentTarget).attr('user-id'));
                        }else{
                            popup.slideUp(500);
                        }
                    }else{
                        activeId = $(event.currentTarget).attr('user-id');
                        _getUserInfo($(event.currentTarget).attr('user-id'));
                    }
              })

          }
        },


        _getUserInfo = function(i){
            try{
                $.ajax({
                    beforeSend: function (request) {
                        request.setRequestHeader("Access-Token", tokens.accessToken);
                    },
                    url:initConfiguration.apiUrl + 'user',
                    type:'GET',
                    dataType:'json',
                    contentType:'application/json',
                    data:{
                      'ids':i
                    },
                    success:function(res){
                        _renderUserInfo(res.result[0]);
                    }
                })
            }catch (e){
                console.log(e);
            }
        },

        _renderUserInfo = function(res){
            console.log(res);
           var wrapper = $('.member-details');
               wrapper.empty();
           var wrapperPhoto = $('<div/>').addClass('wrapper-photo');
            var photo = $('<img/>').attr({
                'src':res.avatarUrl
            });
            wrapperPhoto.append(photo);

            var wrapperBasicInfo = $('<div/>').addClass('wrapper-basic-info');


            wrapperBasicInfo.append(_paintColDetails('name: ', res.name));
            wrapperBasicInfo.append(_paintColDetails('email: ', res.email));
            wrapperBasicInfo.append(_paintColDetails('position: ', res.position));
            wrapperBasicInfo.append(_paintColDetails('company: ', res.company));

            wrapper.append(wrapperPhoto);
            wrapper.append(wrapperBasicInfo);

            wrapper.append(_paintPrograms(res.programs));
            wrapper.append(_paintComplete(res.justCompleted));
            _paintTeams(wrapper);
            wrapper.slideDown(500);
        },

        _paintColDetails = function(label, name){
            if(name == undefined){
                name = 'not specified';
            }
            var row = $('<div/>').addClass('row-member-details');
            var spanLabel = $('<span/>').addClass('label').text(label);
            var spanName = $('<span/>').addClass('name').text(name);

            row.append(spanLabel);
            row.append(spanName);

            return row;
        },

        _paintPrograms = function(data){
           var wrapper = $('<div/>').addClass('wrap-current-programs');
           var wrapperHead = $('<div/>').addClass('head-current-programs');
            var head = $('<h4>').text('Current programs');
                wrapperHead.append(head);
           var wrapperBody = $('<div/>').addClass('body-current-programs');

            for(var i=0; i<data.length; i++){

                var row = $('<div/>');
               var wrapImg = $('<div/>').addClass('wrap-img-programs');
                var img = $('<img/>').attr({
                    'src':data[i].imageUrl
                });

                wrapImg.append(img);

                var wrapProgram = $('<div/>').addClass('wrap-program-info');

                var h6 = $('<h6/>').text(data[i].name);
                var progress = $('<span/>').text('progress: ' + data[i].progress);
                var p = $('<p/>').text(data[i].desc);

                wrapProgram.append(h6);
                wrapProgram.append(progress);
                wrapProgram.append(p);

                row.append(wrapImg);
                row.append(wrapProgram);

                wrapperBody.append(row);

            }

            wrapper.append(wrapperHead);
            wrapper.append(wrapperBody);

            return wrapper;
        },

        _paintComplete = function(data){
            var wrapper = $('<div/>').addClass('wrap-complete-programs');
            var wrapperHead = $('<div/>').addClass('head-complete-programs');
            var head = $('<h4>').text('Just completed');
            wrapperHead.append(head);
            var wrapperBody = $('<div/>').addClass('body-complete-programs');

            for(var i=0; i<data.length; i++){

                var row = $('<div/>');
                var wrapImg = $('<div/>').addClass('wrap-img-programs-complete');
                var img = $('<img/>').attr({
                    'src':data[i].imageUrl
                });

                wrapImg.append(img);

                var wrapProgram = $('<div/>').addClass('wrap-program-info-complete');

                var h6 = $('<h6/>').text(data[i].text);

                wrapProgram.append(h6);

                row.append(wrapImg);
                row.append(wrapProgram);

                wrapperBody.append(row);

            }

            wrapper.append(wrapperHead);
            wrapper.append(wrapperBody);

            return wrapper;
        },

        _paintTeams = function(wrap){
            try{
                $.ajax({
                    beforeSend: function (request) {
                        request.setRequestHeader("Access-Token", tokens.accessToken);
                    },
                    url:initConfiguration.apiUrl + 'user/team',
                    type:'GET',
                    dataType:'json',
                    contentType:'application/json',
                    data:{
                        'ids':_id
                    },
                    success:function(res){
                        console.log(res);
                        wrap.append(_postPaintTeam(res.result[0].teams));
                    }
                })
            }catch (e){
                console.log(e);
            }
        },

        _postPaintTeam = function(res){
            var wrapper = $('<div/>').addClass('wrap-teams-friends');
            var wrapperHead = $('<div/>').addClass('head-teams-friends');
            var head = $('<h4>').text('Teams');
            wrapperHead.append(head);
            var wrapperBody = $('<div/>').addClass('body-teams-friends');

            for(var i=0; i<res.length; i++){

                var row = $('<div/>');

                var wrapProgram = $('<div/>').addClass('wrap-teams-friends-row');

                var h6 = $('<h6/>').text(res[i].name);
                var sup = $('<sup/>');
                  if(res[i].active){
                     sup.text('active').addClass('active-team');
                  }else{
                     sup.text('inactive').addClass('inactive-team');
                  }

                h6.append(sup);

                var date = $('<span/>').addClass('date-create-team').text(Zero.Tools.getFormatedDate(res[i].created, 0, 'weekView'));

                var wrapDivBodyTeam = $('<div/>').addClass('wrap-div-team');

                var count = $('<p/>').html('<span>Members count:</span>' + res[i].membersCount);
                var energy = $('<p/>').html('<span>Energy:</span>' + res[i].energy);
                var owner = $('<p/>').html('<span>Owner:</span>' + res[i].owner);

                wrapDivBodyTeam.append(energy);
                wrapDivBodyTeam.append(count);
                wrapDivBodyTeam.append(owner);


                wrapProgram.append(h6);
                wrapProgram.append(date);

                row.append(wrapProgram);
                row.append(wrapDivBodyTeam);

                wrapperBody.append(row);

            }

            wrapper.append(wrapperHead);
            wrapper.append(wrapperBody);

            return wrapper;
        },

        _handlers = function(){

        };

    view.initialize = function(){
      _render();
    };

    return view;
}(Zero));