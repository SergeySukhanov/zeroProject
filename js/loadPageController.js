Zero.LoadPageController = (function(module){
	var view = {}, page;
	view.switchLoadPage = function(currentUrl, list){	
		switch(currentUrl){
			case (initConfiguration.getRootLocation()+list.indexPage || initConfiguration.getRootLocation()+list.root): {
				page = Zero.PageIndexController;
                page.initialize();
				break;
			}
			case initConfiguration.getRootLocation()+list.mainPage : {
				page = Zero.PageMainController;
				page.initialize('PageChartsController');
				break;
			}
			case initConfiguration.getRootLocation()+list.accountPage : {
				page = Zero.PageMainController;
				page.initialize('PageAccountController');
				break;
			}		
			
		}
	}
	
	return view;
}(Zero));
