Zero.Tools = (function(module){
	var m = {};
	
	m.getFormatedDate = function(timestamp) {
		var date = new Date(timestamp*1000);
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();		
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();		
		if(month < 10) {
			month = '0' + month;
		}		
		var formattedTime = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ':' + seconds;	
		return formattedTime;	
	}	
	
	m.getFullDate = function(){
		var date = new Date();
		var day = date.getDate()+'th';
		var month = initConfiguration.monthList[date.getMonth()];
		var year = date.getFullYear();
		
		var formatDate = month + ' ' + day + ', ' + year;
		return formatDate;
	}
	
	m.getFullTime = function(){
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		if(hours < 10) {
			hours = '0' + hours;
		}
		if(minutes < 10) {
			minutes = '0' + minutes;
		}
		if(seconds < 10) {
			seconds = '0' + seconds;
		}
		var formatTime = hours + ':' + minutes + ':' + seconds;	
		return formatTime;
	}
	return m;
}(Zero));