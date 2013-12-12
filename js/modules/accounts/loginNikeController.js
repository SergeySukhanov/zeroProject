/**
 * Created with JetBrains WebStorm.
 * User: SNSukhanov
 * Date: 12.12.13
 * Time: 13:54
 * To change this template use File | Settings | File Templates.
 */


 function getNikeConnect(){
    try{
        $.ajax({
            beforeSend: function (request) {
                request.setRequestHeader("Access-Token", localStorage.accessToken);
            },
            url: initConfiguration.apiUrl+'account/nike',
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            data:{
                'login':$('#nikeConnectLogin').val(),
                'password':$('#nikeConnectPass').val()
            },
            success: function (resp) {
//                var wrap = $('#nikeTokken').parent();
//                $('#nikeTokken').hide();
//                $('#nikeTokken').next().hide();
//                var connected = $('<p/>').text('Connected').addClass('connected');
//                wrap.append(connected);
                console.log(resp);
                var html = '<p>You connected with NIKE!!!</p><span id="closeWindowNike">Close window</span>';
                $('.login-nike').find('form').html(html);

                $('#closeWindowNike').bind('click', function(){
                    window.close()
                });
            },
            error : function(error) {
                console.log(error);
            }
        })
    }catch(e){
        console.log(e);
    };
}

$(document).ready(function(){
     $('#nikeConnectButton').bind('click', getNikeConnect)
});