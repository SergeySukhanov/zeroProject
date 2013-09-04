var initConfiguration = {
	 rootContext:location.protocol + "//" + location.host,
	 rootFolder:'/',
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
	urlRegister:'http://zerosrv02.domain.corp/api_usr/V1/register/w',
	urlLogin:'http://zerosrv02.domain.corp/api_usr/V1/login',
	
	//set data charts
	urlCharts:'http://zerosrv02.domain.corp/api_srv/V1/getChartsData',
	urlGetChartsData:'http://zerosrv02.domain.corp/api_srv/V1/getNikeChartsData',
	urlCalendarsList:'http://zerosrv02.domain.corp/api_srv/V1/calendars',
	urlEventsCalendar:'http://zerosrv02.domain.corp/api_srv/V1/calendarEvents',
	
	//Account	
	urlGoogleAuthorizationURL : 'http://zerosrv02.domain.corp/api_srv/V1/getGoogleAuthorizationURL',
	urlFitBitAuthorizationURL : 'http://zerosrv02.domain.corp/api_srv/V1/getFitbitAuthorizationURL',
	
	//settings
	urlSettings:'http://zerosrv02.domain.corp/api_srv/V1/settings',
	
	diagramData:{
      "min":"0",
      "max":"100",
      "dataOfDay":[
         {
           "date":"1 october",
           "power":"50"
         },
         {
           "date":"2 october",
           "power":"91"
         },
         {
           "date":"3 october",
           "power":"-55"
         },
         {
           "date":"4 october",
           "power":"100"
         },
         {
           "date":"5 october",
           "power":"67"
         },
         {
           "date":"6 october",
           "power":"-80"
         },
         {
           "date":"7 october",
           "power":"50"
         },
         {
           "date":"8 october",
           "power":"-12"
         },
         {
           "date":"9 october",
           "power":"-20"
         },
         {
           "date":"10 october",
           "power":"95"
         },
         {
           "date":"11 october",
           "power":"33"
         },
         {
           "date":"12 october",
           "power":"-88"
         }
      ]
   },
	
	monthList:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	 
}
