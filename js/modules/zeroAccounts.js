Zero.GoogleAccount = (function(module){
	var m = {}, accountHolder;
	
	_getGoogleAuthUrl = function() {
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
					var params = {
						text : 'Add Google Account',
					}				
					_drawGoogleAuthButton(resp.authorizationURL, params)
				},
				error : function(error) {
					console.log(error);
				}
			})		
		}catch(e){
			console.log(e);
		};			
	}
	
	_getFitBitAuthUrl = function() {
		var tokkens = module.getTokens();		
		
		try{
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},							
				url: initConfiguration.urlFitBitAuthorizationURL,
				type: 'GET',
				dataType: 'json',
				contentType: "application/json",
				success: function (resp) {	
					var params = {
						text : 'Add Fitbit Account',
						className : 'fitbit'
					}
					_drawGoogleAuthButton(resp.authorizationURL, params)
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
		_getGoogleAuthUrl();
		_getFitBitAuthUrl();
	}
	
	_drawGoogleAuthButton = function(link, params) {		
		var $bt = $('<button />').data('google-link', link).text(params.text);
		if(params.className) { 
			$bt.addClass(params.className)
		}
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