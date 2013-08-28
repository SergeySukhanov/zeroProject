Zero.HeaderController = (function(module){
	var view = {},
	
	    config = {
	    	brandImg:'small-brand.png',
	    	
	    	configMenu:[{
	    		account:{
	    			id:'account-item',
	    			namePage:'Account',
	    			url:'account.html'
	    		},
	    		main:{
	    			id:'main-item',
	    			namePage:'Main',
	    			url:'main.html'
	    		},
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
	    },
	    
	    _paintHeader = function(){
	    var header = $('header.header'); 
	       var root = initConfiguration.getRootLocation();
           var wrapperBrand = $('<div/>').addClass('wrapper-brand');
           var brand = $('<img/>').attr('src', root+initConfiguration.imagesFolder+config.brandImg);
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
           var time = $('<div/>').addClass('time');
           var date = $('<div/>').addClass('date');
              wrapperTimeDate.append(time);
              wrapperTimeDate.append(date);
              
           var menu = $('<div/>').addClass('wrapper-menu');
           var currentItem = $('<span/>').addClass('current-item');
           var ul = _createMenu(root);
               menu.append(currentItem);
               menu.append(ul);
               
           header.append(wrapperBrand);
           header.append(wrapperTimeDate);
           header.append(menu);
	    },
	    
	    _createMenu = function(root){
	    	var ul = $('<ul/>');
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