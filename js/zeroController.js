var Zero = (function(m){

	_checkAuth = function() {
		var answer = false;
		if(localStorage.accessToken) {
			answer = true;
		}
		return answer;
	}


	m.init = function() {
		var auth = _checkAuth();	
		
		if(!auth) {
			window.location.href = "/";
		} else {
		
		}
	}
	return m;
}(Zero || {}))



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
	return m;
}(Zero));




Zero.init();