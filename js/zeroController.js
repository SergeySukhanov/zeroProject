var Zero = (function(m){
    
    var router = {
    	'root':'index.html',
    	'indexPage':'',
    	'mainPage':'main.html',
		'accountPage' :'account.html'
    	
    };
    
	_checkAuth = function() {
		var answer = false;
		if(localStorage && localStorage.accessToken) {
			answer = true;
		}
		return answer;
	};

	
	_loadPage = function(currentUrl) {
		var load = Zero.LoadPageController;		
		    load.switchLoadPage(currentUrl, router);
	};
	
	m.getTokens = function() {
		var auth = _checkAuth();		
		var answer = {};
		
		if(!auth) return;
		
		answer = {
			accessToken : localStorage.accessToken,
			accessTokenTTL : localStorage.accessTokenTTL,
			refreshToken : localStorage.refreshToken
			}
		
		return answer;
	}
	
	m.init = function() {
		var auth = _checkAuth(), 
			url = window.location.href,
			rootLink = initConfiguration.getRootLocation();
		
		if(!auth) {
			if(url != rootLink) {
				window.location.href = rootLink;
			}
						
		} else {
			switch(url){
				case rootLink:{
				   window.location.href = rootLink + router.mainPage;
                   break;
				};
				default : {
					
				}
			}			
		}
		_loadPage(url);	
				
	}
	return m;
}(Zero || {}))