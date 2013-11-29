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
            var wrapper = $('#members-friends');
          for(var i=0; i<data.length; i++){
              var wrapUser = $('<div/>').addClass('wrap-user-item');
             var user = Zero.Tools.getUserAvatar(data[i], 50, 50);
              wrapUser.append(user);

              wrapper.append(wrapUser);


          }
        },

        _handlers = function(){

        };

    view.initialize = function(){
      _render();
    };

    return view;
}(Zero));