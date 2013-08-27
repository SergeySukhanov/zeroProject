var initConfiguration = {
	 rootContext:location.protocol + "//" + location.host,
	 rootFolder:'/zeroNew/zeroProject/',
	 imagesFolder:'resources/images/',
	 localDataFolder:'resources/data/',
	 templatesFolder:'resources/templates',
	 
	 //auth
	urlRegister:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/zero-auth-webapp/api/V1/register/m',
	urlLogin:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/zero-auth-webapp/api/V1/login',
	
	//set data charts
	urlGraph:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/zero-backend/api/V1/getNikeData',
	urlGetChartsData:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/zero-backend/api/V1/getNikeChartsData',
	urlCalendarsList:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/zero-backend/api/V1/calendars',
	urlEventsCalendar:'http://ec2-54-216-166-33.eu-west-1.compute.amazonaws.com/zero-backend/api/V1/calendarEvents'
	 
}
