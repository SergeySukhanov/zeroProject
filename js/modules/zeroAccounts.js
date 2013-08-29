Zero.GoogleAccount = (function(module){
	var m = {}, accountHolder;
	
	_getAuthUrl = function() {
		var tokkens = module.getTokens();		
		
		try{
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},							
				url: initConfiguration.urlGoogleAuthorizationURL,
				type: 'GET',
				data : {
					mode : 'web'
				},
				dataType: 'json',
				contentType: "application/json",
				success: function (resp) {			
					_drawGoogleAuthButton(resp.authorizationURL)
				},
				error : function(error) {
					console.log(error);
				}
			})		
		}catch(e){
			console.log(e);
		};			
	}
	
	_setAccountHolder = function(holder) {
		accountHolder = holder;
		_getAuthUrl();
	}
	
	_drawGoogleAuthButton = function(link) {		
		var $bt = $('<button />').data('google-link', link).text('Add Google Account');
		$bt.bind('click', function(e) {
			var params = "menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=500,height=500, top=100, left=100";
			window.open($(this).data('google-link'), params);
			e.preventDefault();
		})	
		$bt.appendTo(accountHolder);
		
	}
	
	m.closeConnectWindow = function(w) {
		w.close();
		console.warn('page closed');
	}
	
	m.init = function(holder) {		
		_setAccountHolder(holder);
	}
	
	return m;
}(Zero));