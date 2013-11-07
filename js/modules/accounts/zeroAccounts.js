Zero.GoogleAccount = (function(module){
	var m = {}, accountHolder, 	tokkens = module.getTokens(), g_account = [], nike_account, fitbit_account, jawbone_account;
	var addButtonImg = initConfiguration.getRootLocation()+initConfiguration.imagesFolder+"addedCircle.png";

	_getGoogleAuthUrl = function() {
        var html = '<div class="googleAccount">add another <span class="g1">G</span><span class="o1">o</span><span class="o2">o</span><span class="g2">g</span><span class="l">l</span><span class="e">e</span> account</div>';
		try{
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},							
				url: initConfiguration.urlGoogleAuthorizationURL,
				type: 'GET',
				data : {
					redirect : initConfiguration.getRootLocation() + 'transport.html' 					
				},
				dataType: 'json',
				contentType: "application/json",
				success: function (resp) {		
					var params = {
						html : html,
						title : 'Google Account(s)',
						type : 'Google'
						
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
	},
        _getJawboneAuthUrl = function() {
            var html = '<div class="jawboneAccount">add another Jawbone account</div>';
            try{
                $.ajax({
                    beforeSend: function (request) {
                        request.setRequestHeader("Access-Token", tokkens.accessToken);
                    },
                    url: initConfiguration.apiUrl+'jawbone_auth_url',
                    type: 'GET',
                    data : {
                        redirect : initConfiguration.getRootLocation() + 'transport.html'
                    },
                    dataType: 'json',
                    contentType: "application/json",
                    success: function (resp) {
                        var params = {
                            html : html,
                            title : 'Jawbone Account',
                            type : 'Jawbone'

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
        },
	
	_getFitBitAuthUrl = function() {
        var html = '<div class="fitbitAccount">add another <span class="f">f</span><span class="i1">i</span><span class="t1">t</span><span class="b">b</span><span class="i2">i</span><span class="t2">t</span> account</div>';
		try{
			$.ajax({
				beforeSend: function (request) {
					request.setRequestHeader("Access-Token", tokkens.accessToken);
				},							
				url: initConfiguration.urlFitBitAuthorizationURL,
				type: 'GET',
				data : {
					mode : 'web',
					redirect : initConfiguration.getRootLocation() + 'transport.html' 
				},				
				dataType: 'json',
				contentType: "application/json",
				success: function (resp) {	
					var params = {
						html : html,
						className : 'fitbit',
						title : 'FitBit Account',
						type : 'FitBit'
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
            registered = $('<h3/>').text('Registered Account'),
            step1 = $('<p/>').addClass('nike-info').html('Login with you email and password:<a href="https://developer.nike.com/"> https://developer.nike.com/</a><br />Get your nike access token on <a href=" https://developer.nike.com/console"> https://developer.nike.com/console</a>'),
			text = $('<p />').text('Please point your Nike Access token in field below'),
			nikeTokken = $('<input />').attr({
				'id' : 'nikeTokken'
			}),
			bt = $('<button />').text('Connect');
			
			if(nike_account) {
				text = $('<p>You have Nike Account linked.<br />If You want reconnect please point you new Nike Access token in field below</p>');
			}
			
			header.appendTo(html);
            registered.appendTo(html);
			step1.appendTo(html);
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
	
	_analyzeAccounts = function() {
		var accounts = initConfiguration.settingsData.accounts;
		console.log(accounts);
		
		for(var i = 0; i < accounts.length; i++) {
			if(accounts[i].type  == 'GOOGLE') {
				g_account.push(accounts[i].externalId);
			}
			if(accounts[i].type  == 'NIKE') {
				nike_account = true;
			}			
			if(accounts[i].type  == 'FITBIT') {
				fitbit_account= true;
            }
            if(accounts[i].type == 'JAWBONE'){
                jawbone_account = true;
            }
		}
			
	};
	
	
	_setAccountHolder = function(holder) {
		accountHolder = holder;
		
		g_account = [];
		nike_account = null;
		fitbit_account = null;
        jawbone_account = null;
		
		_analyzeAccounts();
		_getGoogleAuthUrl();
		_getFitBitAuthUrl();
        _getJawboneAuthUrl();
	}
	
	_drawGoogleAuthButton = function(link, params) {	
		var html = $('<div />').addClass('account-item');
		var header = $('<h2 />').text(params.title)
		var $bt = $('<button />').data('google-link',link);//.attr('src', link);
        var img = $('<img/>').attr('src', addButtonImg);
        $bt.append(img);
        $bt.append(params.html);
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

        if(params.type == 'FitBit' && fitbit_account) {
            var registered = $('<h3/>').text('Registered Account');
            registered.appendTo(html);
        }
        if(params.type == 'Jawbone' && jawbone_account) {
            var registered = $('<h3/>').text('Registered Account');
            registered.appendTo(html);
        }
		
		if(params.type == 'Google') {
			if(g_account && g_account.lenght != 0) {
				var list = $('<div />').addClass('account-list');
				for(var i = 0; i < g_account.length; i++) {
					var item = $('<div />').addClass('item').text(g_account[i]);
					item.appendTo(list);
				}
				
				list.appendTo(html);
			}
		}

		$bt.appendTo(html);
		html.appendTo(accountHolder);
	}
	
	
	m.closeConnectWindow = function(w) {
		accountHolder.html('');		
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Access-Token", tokkens.accessToken);
			},							
			url: initConfiguration.urlSettings,
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			success: function (resp) {	
				if(resp && resp.result && resp.result.accounts) {
					accounts = resp.result.accounts;
					initConfiguration.settingsData.accounts = accounts; 					
				}
				_setAccountHolder(accountHolder);
				//Zero.Calendar.init($('#calendarHolder'));
				w.close();				
			},
			error : function(error) {
				console.log(error);
			}
		})		
	}
	
	m.init = function(holder) {		
		_setAccountHolder(holder);		
	}
	
	
	return m;
}(Zero));