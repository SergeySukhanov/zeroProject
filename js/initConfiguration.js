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
//LOCAL	 

	 //auth	  
	apiUrl: 'http://zerosrv02.domain.corp/api_srv/V1/', 
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
	urlSliders:'http://zerosrv02.domain.corp/api_srv/V1/willpower/sliders',
    urlWillpower:'http://zerosrv02.domain.corp/api_srv/V1/willpower/data',
    urlWeather:'http://zerosrv02.domain.corp/api_srv/V1/weather',


//DEV
/*
    urlRegister:'http://ec2-54-216-165-90.eu-west-1.compute.amazonaws.com/api_usr/V1/register/w',
	urlLogin:'http://ec2-54-216-165-90.eu-west-1.compute.amazonaws.com/api_usr/V1/login',
	
	urlCharts:'http://ec2-54-216-165-90.eu-west-1.compute.amazonaws.com/api_srv/V1/getChartsData',
	urlCalendarsList:'http://ec2-54-216-165-90.eu-west-1.compute.amazonaws.com/api_srv/V1/calendars',
	urlEventsCalendar:'http://ec2-54-216-165-90.eu-west-1.compute.amazonaws.com/api_srv/V1/calendarEvents',

	urlGoogleAuthorizationURL : 'http://ec2-54-216-165-90.eu-west-1.compute.amazonaws.com/api_srv/V1/getGoogleAuthorizationURL',
	urlFitBitAuthorizationURL : 'http://ec2-54-216-165-90.eu-west-1.compute.amazonaws.com/api_srv/V1/getFitbitAuthorizationURL',
	urlNikeAuthorizationURL : 'http://ec2-54-216-165-90.eu-west-1.compute.amazonaws.com/api_srv/V1/getNikeConnect',
	
	urlSettings:'http://ec2-54-216-165-90.eu-west-1.compute.amazonaws.com/api_srv/V1/settings',
	urlSliders:'http://ec2-54-216-165-90.eu-west-1.compute.amazonaws.com/api_srv/V1/willpower/sliders',
	urlWillpower:'http://ec2-54-216-165-90.eu-west-1.compute.amazonaws.com/api_srv/V1/willpower/data',
	urlWeather:'http://ec2-54-216-165-90.eu-west-1.compute.amazonaws.com/api_srv/V1/weather',

*/	
//DEMO	
	/*
	urlRegister:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/api_usr/V1/register/w',
	urlLogin:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/api_usr/V1/login',
	
	urlCharts:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/api_srv/V1/getChartsData',
	urlCalendarsList:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/api_srv/V1/calendars',
	urlEventsCalendar:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/api_srv/V1/calendarEvents',

	urlGoogleAuthorizationURL : 'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/api_srv/V1/getGoogleAuthorizationURL',
	urlFitBitAuthorizationURL : 'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/api_srv/V1/getFitbitAuthorizationURL',
	urlNikeAuthorizationURL : 'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/api_srv/V1/getNikeConnect',
	
	urlSettings:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/api_srv/V1/settings',
	urlSliders:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/api_srv/V1/willpower/sliders',
	urlWillpower:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/api_srv/V1/willpower/data',
	urlWeather:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/api_srv/V1/weather',
 
 
 
  
*/
	
	
	
	
	monthList:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	monthShortList:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	
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
