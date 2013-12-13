/**
 * Created with JetBrains WebStorm.
 * User: SNSukhanov
 * Date: 12.12.13
 * Time: 13:54
 * To change this template use File | Settings | File Templates.
 */


 function getNikeConnect(){
    if(location.search != ""){
        var token  = location.search.split('?token=')[1];
    }else{
        var token = localStorage.accessToken
    }
    try{

        $.ajax({
            beforeSend: function (request) {
                request.setRequestHeader("Access-Token", token);
            },
            url: initConfiguration.apiUrl+'account/nike',
            type: 'GET',
            dataType: 'json',
            async:false,
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
                localStorage.setItem("errorCode", resp.errorCode);
                initConfiguration.errorCode = resp.errorCode;
                if(resp.errorCode == 1){
                    location.href = initConfiguration.apiUrl+'account/nike?token='+token+'&login='+$('#nikeConnectLogin').val()+'&password='+$('#nikeConnectPass').val()
                }else if(resp.errorCode == 10){
                    location.href = initConfiguration.apiUrl+'account/nike?token='+token+'&login='+$('#nikeConnectLogin').val()+'&password='+$('#nikeConnectPass').val()
                }


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
    if(localStorage.accessToken != undefined){
        if(location.search != ""){

            if(localStorage.errorCode == 1){
                var html = '<p>You connected with NIKE!!!</p><span id="closeWindowNike">Close window</span>';
                $('.login-nike').find('form').html(html);

                $('#closeWindowNike').bind('click', function(){
                    window.close()
                });
            }else{
                var html = '<p>You not connected with NIKE!!! Please, try again.</p><span id="closeWindowNike">Close window</span>';
                $('.login-nike').find('form').html(html);

                $('#closeWindowNike').bind('click', function(){
                    window.close()
                });
            }
        }
    }
     $('#nikeConnectButton').bind('click', getNikeConnect)
});