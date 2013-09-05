Zero.GoogleAccount = (function(module){
	var m = {}, accountHolder, 	tokkens = module.getTokens();
	
	_getGoogleAuthUrl = function() {
		
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
						title : 'Google Account'
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
						className : 'fitbit',
						title : 'Fitbit Account'
					}
					_drawGoogleAuthButton(resp.authorizationURL, params);
					_getNikeConnectHtml();
				},
				error : function(error) {
					console.log(error);
				}
			})		
		}catch(e){
			console.log(e);
		};			
	}	
	
	_getNikeConnectHtml = function() {
		var html = $('<div />').addClass('account-item'),
			header = $('<h2/>').text('Nike Connect'),
			text = $('<p />').text('Please point your Nike Access token in field below'),
			nikeTokken = $('<input />').attr({
				'id' : 'nikeTokken',
			}),
			bt = $('<button />').text('Connect');
			
			header.appendTo(html);
			text.appendTo(html);
			nikeTokken.appendTo(html);
			bt.appendTo(html);
			
			bt.bind('click', _getNikeConnect);
			
			html.appendTo(accountHolder);
	}
	
	_getNikeConnect = function() {
		//getNikeConnect
		
		var tk = $('#nikeTokken').val();

		if(!tk) return;

		try{
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},							
				url: initConfiguration.urlNikeAuthorizationURL + '/?accessToken=' + tk,
				type: 'GET',
				dataType: 'json',
				contentType: "application/json",
				success: function (resp) {	
					console.warn(resp)
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
		var html = $('<div />').addClass('account-item');
		var header = $('<h2 />').text(params.title)
		var $bt = $('<button />').data('google-link', link).text(params.text);
		if(params.className) { 
			$bt.addClass(params.className)
		}
		$bt.bind('click', function(e) {
			var params = "menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes,width=500,height=500, top=100, left=100";
			window.open($(this).data('google-link'), params);
			e.preventDefault();
		})	
		
		if(params.title && params.title != '') {
			header.appendTo(html);
		}
		$bt.appendTo(html);
		html.appendTo(accountHolder);
		
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