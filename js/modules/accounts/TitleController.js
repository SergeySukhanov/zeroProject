Zero.TitleController = (function(module){
	var view = {},
	
	    config = {
		  faceImg:"face1.png"
	    },
	
	    _render = function(){
	    	
		   _postRender();
	    },
	    
	    _postRender = function(data){
	       _paintTitle();
	       _handlers();
	    },
	    
	    _handlers = function(){
	    	
        },
	    
	    _paintTitle = function(){
            var wrapperTitle = $('.header-block');
            var accountHolder = $('<div/>').attr('id', 'userHolder');
            wrapperTitle.append(accountHolder);
            _createAccountName(accountHolder);
	    },
	    
	    _createAccountName = function(wrap){
	    	var wrapper = wrap;
	    	var divPhoto = $('<div/>').attr('id','userPhotoHolder').addClass('account-photo');
//            Zero.AccountPhotoController.initialize();
              var userAvatar = Zero.Tools.getUserAvatar(initConfiguration.settingsData, 120, 120);
            divPhoto.append(userAvatar);
	    	var divWelcome = $('<div/>').addClass('welcome-user');
	    	
	    	var h1 = $('<h1/>').text('Good');
	    	var spanDayPeriod = $('<span/>').attr('id', 'dayPeriod');
	    	var spanName = $('<span/>').attr('id', 'nameAccount');
	    	var smallDate = $('<small/>').attr('id', 'currentDate');
	    	
	    	var currentUserName = initConfiguration.settingsData.username;
	    	var currentHour = new Date().getHours();
	    	
	    	if(currentHour <= 12){
	    		spanDayPeriod.text('Morning,');
	    	}else if(currentHour > 12 && currentHour <= 18){
	    		spanDayPeriod.text('Afternoon,');
	    	}else if(currentHour > 18){
	    		spanDayPeriod.text('Evening,');
	    	}
	    	
	    	spanName.text(currentUserName);
	    	smallDate.text(Zero.Tools.getFullDate());
	    	
	    	h1.append(spanDayPeriod);
	    	h1.append(spanName);
	    	
	    	divWelcome.append(h1);
	    	divWelcome.append(smallDate);
	    	
	    	wrapper.append(divPhoto);
	    	wrapper.append(divWelcome);
	    };
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));
