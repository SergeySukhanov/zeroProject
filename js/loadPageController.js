Zero.LoadPageController = (function(module){
	var view = {};
	
	view.switchLoadPage = function(currentUrl, list){
		switch(currentUrl){
			case (initConfiguration.getRootLocation()+list.indexPage || initConfiguration.getRootLocation()+list.root): {
				 var index = Zero.PageIndexController;
                     index.initialize();
			}
			case initConfiguration.getRootLocation()+list.mainPage
			break;
		}
	}
	
	return view;
}(Zero));
