Zero.LoadPageController = (function(module){
	var view = {};
	
	view.switchLoadPage = function(currentUrl, list){
		console.warn(currentUrl + ' || ' + initConfiguration.getRootLocation()+list.indexPage)
	
		switch(currentUrl){
			case (initConfiguration.getRootLocation()+list.indexPage || initConfiguration.getRootLocation()+list.root): {
				 var index = Zero.PageIndexController;
                     index.initialize();
			}
			case initConfiguration.getRootLocation()+list.mainPage : {
				break;
			}
			
		}
	}
	
	return view;
}(Zero));
