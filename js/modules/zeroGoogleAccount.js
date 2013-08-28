Zero.GoogleAccount = (function(module){
	var m = {};
	
	_getAuthUrl = function() {
		var tokkens = module.getTokens();		
		
		try{
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},							
				url: initConfiguration.urlGoogleAuthorizationURL,
				type: 'GET',
				dataType: 'json',
				contentType: "application/json",
				success: function (resp) {			
					console.warn(resp);
				},
				error : function(error) {
					console.log(error);
				}
			})		
		}catch(e){
			console.log(e);
		};			
		
		
	}
	
	m.init = function(holder) {		
		_getAuthUrl();
	}
	
	return m;
}(Zero));