var initConfiguration = {
	 rootContext:location.protocol + "//" + location.host,
	 rootFolder:'/zeroProject/',
	 imagesFolder:'resources/images/',
	 localDataFolder:'resources/data/',
	 templatesFolder:'resources/templates',
	 
	 getRootLocation:function(){
	 	return initConfiguration.rootContext+initConfiguration.rootFolder;
	 },
	 
	 getChartsData:function(){
	 	return initConfiguration.urlCharts;
	 },
	 
	 //auth
	urlRegister:'http://zerosrv02.domain.corp/api_usr/V1/register/m',
	urlLogin:'http://zerosrv02.domain.corp/api_usr/V1/login',
	
	//set data charts
	urlCharts:'http://zerosrv02.domain.corp/api_srv/V1/getChartsData',
	urlGetChartsData:'http://zerosrv02.domain.corp/api_srv/V1/getNikeChartsData',
	urlCalendarsList:'http://zerosrv02.domain.corp/api_srv/V1/calendars',
	urlEventsCalendar:'http://zerosrv02.domain.corp/api_srv/V1/calendarEvents',
	
	//Account	
	urlGoogleAuthorizationURL : 'http://zerosrv02.domain.corp/api_srv/V1/getGoogleAuthorizationURL',
	urlFitBitAuthorizationURL : 'http://zerosrv02.domain.corp/api_srv/V1/getFitbitAuthorizationURL'

	 
}
