var initConfiguration = {
	 rootContext:location.protocol + "//" + location.host,
	 rootFolder:'/',
	 imagesFolder:'resources/images/',
	 localDataFolder:'resources/data/',
	 templatesFolder:'resources/templates',
	 
	 getRootLocation:function(){
	 	return initConfiguration.rootContext + initConfiguration.rootFolder;
	 },
	 
	 getChartsData:function(){
	 	return initConfiguration.urlCharts;
	 },
//LOCAL	 
	 //auth	  
	chatUrl: 'http://zerosrv02.firstlinesoftware.ru:9999',

    apiAuthUrl:'http://zerosrv02.firstlinesoftware.ru/api_usr/V1/',
	apiUrl: 'http://zerosrv02.firstlinesoftware.ru/api_srv/V1/',

    apiUrlTom: 'http://zerosrv02.firstlinesoftware.ru:8080/api_srv/V1/',

	urlSession:'http://zerosrv03.firstlinesoftware.ru/api_usr/V1/session',
	urlLogin:'http://zerosrv03.firstlinesoftware.ru/api_usr/V1/login',
	urlLoginCheck:'http://zerosrv03.firstlinesoftware.ru/api_usr/V1/check_email_exists',
	
	//set data charts
	urlCharts:'http://zerosrv02.firstlinesoftware.ru/api_srv/V1/getChartsData',
	urlCalendarsList:'http://zerosrv02.firstlinesoftware.ru/api_srv/V1/calendars',
	urlEventsCalendar:'http://zerosrv02.firstlinesoftware.ru/api_srv/V1/calendarEvents',
	
	//Account	
	urlGoogleAuthorizationURL : 'http://zerosrv02.firstlinesoftware.ru/api_srv/V1/getGoogleAuthorizationURL',
	urlFitBitAuthorizationURL : 'http://zerosrv02.firstlinesoftware.ru/api_srv/V1/getFitbitAuthorizationURL',
	urlNikeAuthorizationURL : 'http://zerosrv02.firstlinesoftware.ru/api_srv/V1/getNikeConnect',
	
	//settings
	urlSettings:'http://zerosrv02.firstlinesoftware.ru/api_srv/V1/settings',
	urlSliders:'http://zerosrv02.firstlinesoftware.ru/api_srv/V1/willpower/sliders',
    urlWillpower:'http://zerosrv02.firstlinesoftware.ru/api_srv/V1/willpower/data',
    urlWeather:'http://zerosrv02.firstlinesoftware.ru/api_srv/V1/weather',

	monthList:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	monthShortList:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekShortList:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	
	labelsSilder:{
		distance:"distance",
		floors:"floors",
		calories:"calories",
		steps:"steps",
		itemsOnWorkDay:"items on work day",
		itemsOnPlayDay:"items on play day",
		itemsGap:"items gap",
		itemsSteps:"items steps"
	}

	 
}