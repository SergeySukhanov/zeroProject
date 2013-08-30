Zero.LoadPageController = (function(module){
	var view = {}, page;
	view.switchLoadPage = function(currentUrl, list){	
		switch(currentUrl){
			case (initConfiguration.getRootLocation()+list.root.url || initConfiguration.getRootLocation()+list.indexPage.url): {
				page = Zero.PageIndexController;
                page.initialize();
				break;
			}
			case initConfiguration.getRootLocation()+list.mainPage.url : {
				page = Zero.PageController;
				page.initialize(list.mainPage.moduleName);
				break;
			}
			case initConfiguration.getRootLocation()+list.accountPage.url : {
				page = Zero.PageController;
				page.initialize(list.accountPage.moduleName);
				break;
			}
			case initConfiguration.getRootLocation()+list.eventPage.url : {
				page = Zero.PageController;
				page.initialize(list.eventPage.moduleName);
				break;
			}			
			
		}
	}
	
	return view;
}(Zero));
