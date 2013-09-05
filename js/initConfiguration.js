var initConfiguration = {
	 rootContext:location.protocol + "//" + location.host,
	 rootFolder:'/,
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
	urlCalendarsList:'http://zerosrv02.domain.corp/api_srv/V1/calendars',
	urlEventsCalendar:'http://zerosrv02.domain.corp/api_srv/V1/calendarEvents',
	
	//Account	
	urlGoogleAuthorizationURL : 'http://zerosrv02.domain.corp/api_srv/V1/getGoogleAuthorizationURL',
	urlFitBitAuthorizationURL : 'http://zerosrv02.domain.corp/api_srv/V1/getFitbitAuthorizationURL',
	urlNikeAuthorizationURL : 'http://zerosrv02.domain.corp/api_srv/V1/getNikeConnect',
	
	//settings
	urlSettings:'http://zerosrv02.domain.corp/api_srv/V1/settings',
	urlWillpower:'http://zerosrv02.domain.corp/api_srv/V1/willpower',
	
	
	diagramData:{
      "min":"0",
      "max":"100",
      "dataOfDay":[
         {
           "date":"1 october",
           "percent":100
         },
         {
           "date":"2 october",
           "percent":100
         },
         {
           "date":"3 october",
           "percent":100
         },
         {
           "date":"4 october",
           "percent":100
         },
         {
           "date":"1 october",
           "percent":100
         },
         {
           "date":"2 october",
           "percent":100
         },
         {
           "date":"3 october",
           "percent":100
         },
         {
           "date":"4 october",
           "percent":100
         },{
           "date":"1 october",
           "percent":100
         },
         {
           "date":"2 october",
           "percent":-100
         },
         {
           "date":"3 october",
           "percent":100
         },
         {
           "date":"4 october",
           "percent":100
         },{
           "date":"1 october",
           "percent":100
         },
         {
           "date":"2 october",
           "percent":-100
         },
         {
           "date":"3 october",
           "percent":100
         },
         {
           "date":"4 october",
           "percent":100
         }
         
      ]
   },
	
	monthList:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	monthShortList:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	 
}
