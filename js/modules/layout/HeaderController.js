Zero.HeaderController = (function(module){
	var view = {},
	
	    config = {
	    	brandImg:'small-brand.png',
	    	searchImg:'search-icon.PNG',
	    	settingsImg:'settings-icon.PNG',
	    	headerImg:'header-icon-brand.PNG',
	    	configAddMenu:[{
	    	    event:{
	    	    	id:'addEvent-item',
	    	    	namePage:'event',
	    	    	url:''
	    	    },
	    	    group:{
	    	    	id:'addGroup-item',
	    	    	namePage:'team',
	    	    	url:''
	    	    // },
	    	    // message:{
	    	    	// id:'addMessage-item',
	    	    	// namePage:'message',
	    	    	// url:''
	    	    // },	    	    
	    	    // actionItem:{
	    	    	// id:'addItem-item',
	    	    	// namePage:'action item',
	    	    	// url:''
	    	    }	

	    	}],
	    	configMenu:[{
	    		account:{
	    			id:'account-item',
	    			namePage:'Account',
	    			url:'account.html'
	    		},
	    		main:{
	    			id:'main-item',
	    			namePage:'Board',
	    			url:'main.html'
	    		},
				
				event : {
					id : 'events',
					namePage : 'Events',
					url : 'events.html'
				},
				
				settings : {
					id : 'settings',
					namePage : 'Settings',
					url : 'settings.html'
				},
				groups : {
					id :'groups',
					namePage :'Groups',
					url :'groups.html'
				},
					
	    		logout:{
	    			id:'logout-item',
	    			namePage:'Log out',
	    			url:''
	    		}
	    	}]
	    },
	
	    _render = function(){
	       _postRender();
	    },
	    
	    _postRender = function(data){
	       _paintHeader();
	       _handlers();


	    },
	    
	    _handlers = function(){
	    	_menuActive();
	    	_intervalTime();
	    	$('.current-item').on('click', function(event){
               window.location.href = initConfiguration.getRootLocation()+'settings.html';	    		
	    	});
	    	$('.adeed-link').on('click', function(event){
               _showMenu(event);
	    	});
	    	
	    	$('.added-wrapper a').bind('click', function(event){
	    		_hideMenu(event);
	    	});
	    	
	    	$('.log-out-link').on('click', function(event){
	    		event.preventDefault;
	    		localStorage.clear();
	    		window.location.href = initConfiguration.getRootLocation();
	    	});
	    	
	    	$(document).bind('click', function(event){
	    		
	    	})
	    	
	    	
	    	
	    	setInterval(_intervalTime, 1000);

			
			$('#addGroup-item > a').bind('click', function(e){				
				/*Zero.Team.addGroupPopup();	*/
				Zero.Team.showGroupPopup(null,'add')
				
				e.preventDefault();
			})
			          
			$('#addEvent-item > a').bind('click',function(e){			
				Zero.Events.showEventPopup(null,'add');
				e.preventDefault();
			})		  
					  

	    },
	    
	    
	    _intervalTime = function(){
	    	var timeWrapper = $('.time-head');
	    	    timeWrapper.empty();
	    	timeWrapper.append(Zero.Tools.getFullTime());
	    },
	    
	    _paintHeader = function(){
	    var header = $('header.header'); 
	       var root = initConfiguration.getRootLocation();
           var wrapperBrand = $('<div/>').addClass('wrapper-brand');
           var brand = $('<img/>').attr('src', root+initConfiguration.imagesFolder+config.headerImg);
           var brandLink  = $('<a/>');
           var link;
           if(localStorage.accessToken){
           	   link = root+'main.html'
           }else{
           	   link = root+'index.html'
           }
           
           brandLink.attr('href', link);
           
           brandLink.append(brand);
           wrapperBrand.append(brandLink);
           
           // var wrapperTimeDate = $('<div/>').addClass('wrapper-time-date');
           // var time = $('<div/>').addClass('test-link').text('link');               
              // wrapperTimeDate.append(time);
           var setMenu = $('<div/>').addClass('set-menu');
           
           var addedWrapper = $('<div/>').addClass('added-wrapper');
           var linkAdded = $('<span/>').addClass('adeed-link');
           var ulAdd = _createMenu(root, config.configAddMenu); 
               addedWrapper.append(linkAdded);
               addedWrapper.append(ulAdd);  

              
           var menu = $('<div/>').addClass('wrapper-menu');
           var currentItem = $('<span/>').addClass('current-item');
           // var ul = _createMenu(root, config.configMenu);

               menu.append(currentItem);
               // menu.append(ul);

               
           header.append(wrapperBrand);
           setMenu.append(addedWrapper);




           setMenu.append(menu);
           
           var logOutLinkWrapper = $('<div/>').addClass('log-out-wrapper');
           var logOutLink = $('<span/>').addClass('log-out-link');
               logOutLinkWrapper.append(logOutLink);
            setMenu.append(logOutLinkWrapper);   
           // Zero.SettingsController.initialize();
           header.append(setMenu);
	    },
	    
	    _createMenuAdd = function(){
	    	var ul = $('<ul/>');
	    	var cornerAddMenu = $('<span/>').addClass('corner-menu-add');
	    	ul.append(cornerAddMenu);
	    	
	    
	    },
	    
	    _createMenu = function(root, data){
	    	var ul = $('<ul/>').addClass('popup-menu');
	    	var cornerMenu = $('<span/>').addClass('corner-menu');
	    	    ul.append(cornerMenu);
	    	var data = data;
	    	for(var prop in data[0]){
	    		var li = $('<li/>').attr('id', data[0][prop].id);
	    	 	var a = $('<a/>').text(data[0][prop].namePage);
	    	 	if(data[0][prop].url){
	    	 		a.attr({'href':root+data[0][prop].url});
	    	 	}
	    	 	li.append(a);
	    	 	ul.append(li);
	    	  if(a.text() == 'Log out'){
	    	  	a.attr('href', '');
	    	  }
	    	}
	    	 return ul;
	    },
	    
	    _menuActive = function(){
	    	var menu = $('.wrapper-menu a');
	    	var displayItem = $('.current-item');
	    	var currentLocation = window.location.href;
	    	var currentItemMenu;
	    	   // menu.each(function(index, elem){
	    	   	  // if($(elem).attr('href') == currentLocation){
	    	   	  	// // displayItem.text($(elem).text());
// 
	    	   	  // }
	    	   // });

	    },
	    
	    _showMenu = function(event){
	    	// console.log(event);

	    	var currentPopup = $(event.target).next();
	    	$('.popup-menu').not(currentPopup).slideUp();
	    	if(currentPopup.css('display') == 'none'){
	    		currentPopup.slideDown();
	    	}else{
	    		currentPopup.slideUp();
	    	}
	    },
	    
	    
	    _hideMenu = function(event){
	    	var parentUl = $(event.currentTarget).parents('.popup-menu');
	    	parentUl.slideUp();
	    };
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));