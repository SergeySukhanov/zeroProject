Zero.HeaderController = (function(module){
	var view = {},
	
	    config = {
	    	brandImg:'small-brand.png',
	    	searchImg:'search-icon.PNG',
	    	settingsImg:'settings-icon.PNG',
	    	headerImg:'header-icon-brand.PNG',
	    	
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
				/*
				settings : {
					id : 'settings',
					namePage : 'Settings',
					url : 'settings.html'
				},
				*/	
	    		logout:{
	    			id:'logout-item',
	    			namePage:'Log out',
	    			url:''
	    		},
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
	    		var dropdown = $(event.currentTarget).next();
	    		if(dropdown.css('display') == 'none'){
	    			dropdown.slideDown();
	    		}else{
	    			dropdown.slideUp();
	    		}
	    	});
	    	
	    	$('#logout-item > a').on('click', function(event){
	    		event.preventDefault;
	    		localStorage.clear();
	    		window.location.href = initConfiguration.getRootLocation();
	    	});
	    	
	    	setInterval(_intervalTime, 1000);           $('.test-link').click(function(event){
           	  Zero.ModalController.getPopup('test-popup');
           });            
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
           
           var wrapperTimeDate = $('<div/>').addClass('wrapper-time-date');
           var time = $('<div/>').addClass('test-link').text('link');               
              wrapperTimeDate.append(time);
              
           var menu = $('<div/>').addClass('wrapper-menu');
           var currentItem = $('<span/>').addClass('current-item');
           var ul = _createMenu(root);
               menu.append(currentItem);
               menu.append(ul);
               
           header.append(wrapperBrand);
           header.append(wrapperTimeDate);
           header.append(menu);
           // Zero.SettingsController.initialize();
	    },
	    
	    _createMenu = function(root){
	    	var ul = $('<ul/>');
	    	var cornerMenu = $('<span/>').addClass('corner-menu');
	    	    ul.append(cornerMenu);
	    	var data = config.configMenu;
	    	for(var prop in data[0]){
	    		var li = $('<li/>').attr('id', data[0][prop].id);
	    	 	var a = $('<a/>').attr({
	    	 		              'href':root+data[0][prop].url
	    	 	                 }).text(data[0][prop].namePage);
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
	    	   menu.each(function(index, elem){
	    	   	  if($(elem).attr('href') == currentLocation){
	    	   	  	displayItem.text($(elem).text());
	    	   	  }
	    	   });
	    },
	    
	    _showMenu = function(){
	    	
	    },
	    
	    _hideMenu = function(){
	    	
	    };
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));