var Zero = (function(m){
    
    var router = {
    	root:{
    		url:'',
    		moduleName:'PageIndexController'
    	},
    	indexPage:{
    		url:'index.html',
    		moduleName:'PageIndexController'
    	},
    	mainPage:{
    		url:'main.html',
    		moduleName:'PageMainController'
    	},	
		settingsPage:{
    		url:'settings.html',
    		moduleName:'PageSettingsController'
    	}			
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
	};
	
	//Calendars Account
	m.buildCalendarAccounts = function() {
		var accounts = initConfiguration.settingsData.accounts;
		var calendars = initConfiguration.settingsData.calendarAccounts = new Array();
		if(accounts && accounts.length !=0) {
			for(var i=0; i < accounts.length; i++) {
				if(accounts[i].type == 'GOOGLE') {
					calendars.push(accounts[i]);
				}
			}
		}		
	};
	
	m.getCalendarAccounts = function() {
		var answer = false;
		
		if(initConfiguration.settingsData.calendarAccounts) {
			answer = initConfiguration.settingsData.calendarAccounts;
		}
		
		return answer;
	};
	
	
	
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
				   window.location.href = rootLink + router.mainPage.url;
                   break;
				};
				default : {
					
				}
			}			
		}
		_loadPage(url);	
				
	};
	return m;
}(Zero || {}))