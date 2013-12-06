/**
 * Created with JetBrains WebStorm.
 * User: SNSukhanov
 * Date: 05.12.13
 * Time: 11:59
 * To change this template use File | Settings | File Templates.
 */

Zero.EnergyUserController = (function(module){
    var view = {},

        config = {

        },
        _dataUser = {},
        _dataUserTeam = {},

        _id = 0,

        tokens = module.getTokens(),

        _render = function() {
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
                        'ids':initConfiguration.settingsData.userId
                    },
                    success:function(res){
                        _dataUser = res.result[0];
                        _postRender();

                    }
                })
            }catch (e){
                console.log(e);
            }
        },

        _postRender = function(data){
            _paintTeams();
        },

        _paintTeams = function(){
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
                        'ids':initConfiguration.settingsData.userId
                    },
                    success:function(res){
                        console.log(res);
                        _dataUserTeam = res.result[0];
                        console.log(_dataUser);
                        console.log(_dataUserTeam);
                        var wrapper = $('#user-settings-details');

                        wrapper.append(_paintPrograms(_dataUser.programs));
                        wrapper.append(_paintComplete(_dataUser.justCompleted));
                        wrapper.append(_postPaintTeam(_dataUserTeam.teams));

                        $('.user-head-teams').bind('click', function(event){
                            $('.user-body-programs').slideUp();
                            $('.user-head-teams').find('span').removeClass('corner-head-up').addClass('corner-head-down');
                            $(event.currentTarget).next().slideToggle(function(){
                                if($(event.currentTarget).next().css('display') == 'none'){
                                    $(event.currentTarget).find('span').removeClass('corner-head-up').addClass('corner-head-down');
                                }else{
                                    $(event.currentTarget).find('span').removeClass('corner-head-down').addClass('corner-head-up');
                                }
                            });

                        });
                    }
                })
            }catch (e){
                console.log(e);
            }
        },

        _paintPrograms = function(data){
            var wrapper = $('<div/>').addClass('user-wrap-current-programs');
            var wrapperHead = $('<div/>').addClass('user-head-current-programs').addClass('user-head-teams');
            var head = $('<h4>').text('Current programs');
            var cornerHead = $('<span/>').addClass('corner-head-up');
            wrapperHead.append(head);
            wrapperHead.append(cornerHead);
            var wrapperBody = $('<div/>').addClass('user-body-current-programs').addClass('user-body-programs');

            for(var i=0; i<data.length; i++){

                var row = $('<div/>');
                var wrapImg = $('<div/>').addClass('user-wrap-img-programs');
                var img = $('<img/>').attr({
                    'src':data[i].imageUrl
                });

                wrapImg.append(img);

                var wrapProgram = $('<div/>').addClass('user-wrap-program-info');

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
            var wrapper = $('<div/>').addClass('user-wrap-complete-programs');
            var wrapperHead = $('<div/>').addClass('user-head-complete-programs').addClass('user-head-teams');
            var head = $('<h4>').text('Just completed');
            var cornerHead = $('<span/>').addClass('corner-head-down');
            wrapperHead.append(head);
            wrapperHead.append(cornerHead);
            var wrapperBody = $('<div/>').addClass('user-body-complete-programs').addClass('user-body-programs');

            for(var i=0; i<data.length; i++){

                var row = $('<div/>');
                var wrapImg = $('<div/>').addClass('user-wrap-img-programs-complete');
                var img = $('<img/>').attr({
                    'src':data[i].imageUrl
                });

                wrapImg.append(img);

                var wrapProgram = $('<div/>').addClass('user-wrap-program-info-complete');

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

        _postPaintTeam = function(res){
            var wrapper = $('<div/>').addClass('user-wrap-teams-friends');
            var wrapperHead = $('<div/>').addClass('user-head-teams-friends').addClass('user-head-teams');
            var head = $('<h4>').text('Teams');
            var cornerHead = $('<span/>').addClass('corner-head-down');
            wrapperHead.append(head);
            wrapperHead.append(cornerHead);
            var wrapperBody = $('<div/>').addClass('user-body-teams-friends').addClass('user-body-programs');

            for(var i=0; i<res.length; i++){

                var row = $('<div/>');

                var wrapProgram = $('<div/>').addClass('user-wrap-teams-friends-row');

                var h6 = $('<h6/>').text(res[i].name);
                var sup = $('<sup/>');
                if(res[i].active){
                    sup.text('active').addClass('active-team');
                }else{
                    sup.text('inactive').addClass('inactive-team');
                }

                h6.append(sup);

                var date = $('<span/>').addClass('date-create-team').text(Zero.Tools.getFormatedDate(res[i].created, 0, 'weekView'));

                var wrapDivBodyTeam = $('<div/>').addClass('user-wrap-div-team');

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
            $('.user-head-teams').bind('click', function(event){
                $('.user-body-programs').slideUp();
                $(event.currentTarget).next().slideToggle();
                console.log('lala');
            });
        };

    view.initialize = function(){
        _render();
    };

    return view;
}(Zero));