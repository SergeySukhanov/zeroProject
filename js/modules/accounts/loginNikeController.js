/**
 * Created with JetBrains WebStorm.
 * User: SNSukhanov
 * Date: 12.12.13
 * Time: 13:54
 * To change this template use File | Settings | File Templates.
 */


 function getNikeConnect(){
    try{
       if(location.search != ""){
              var token  = location.search.split('?')[1];
       }else{
           var token = localStorage.accessToken
       }

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
                location.href = location.href+'?login='+$('#nikeConnectLogin').val()+'&pass='+$('#nikeConnectPass').val()
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