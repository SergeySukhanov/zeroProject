var initConfiguration = {
	 rootContext:location.protocol + "//" + location.host,
	 rootFolder:'/zeroNew/zeroProject',
	 imagesFolder:'resources/images',
	 localDataFolder:'resources/data/',
	 templatesFolder:'resources/templates',
	 init:function (initializationParams, contentParams) {
        $(window).trigger('hashchange');
    }
}
