Zero.PageIndexController = (function(module){
	var view = {},
	
	    config = {
	    	textTitle:'human simple authentic',
	    	srcZeroBrand:initConfiguration.rootContext+initConfiguration.rootFolder+initConfiguration.imagesFolder+'small-brand.png',
	    	textSubTitle:'Want Early Access?',
	    	textLoginLink:'Sign in',
	    	textRegisterLink:'Sign up',
	    	textFooter:"It's fast and easy. We promise never to post anything without your permission."
	    },
	
	    _render = function(){
	    	try{
	    		$.ajax({
	       	       url:initConfiguration.rootContext+initConfiguration.rootFolder+initConfiguration.localDataFolder+'menuData.json',
	       	       dataType:'json',
	       	       success:function(data){
	       	     	_postRender(data);
	       	       }
	           });
	    	}catch(e){
	    		console.log(e);
	    	}
	    },
	    
	    _postRender = function(data){
	       _paintIndex();
	       _parseData(data);
	       _handlers();
	    },
	    
	    _handlers = function(){
	    	$('.link-index').on('click', function(event){
	    		event.preventDefault();	
	    		_showTo($(event.currentTarget).attr('showTo'));    		
	    	});
	    	
	    	$(document).on('keyup', function(e) {    
             if (e.which == 27){ 
             	if($('.popup-index').filter(':visible').length > 0){
             		_hideTo();
             	}
             } 
        });
	    	
	    };
	    
	    _paintIndex = function(){
	    	$('body').css('backgroundColor', '#111111');
	    	var wrapperHeader = $('.header-index');
	    	var wrapperFooter = $('.footer-index');
	    	
	    	var titleWrapper = $('<div/>').addClass('title-wrapper');
	    	var titleH1 = $('<h1/>').text(config.textTitle);
	    	    titleWrapper.append(titleH1);
	    	
	    	var brandWrapper = $('<div/>').addClass('brand-wrapper');
	    	var imgBrand = $('<img/>').attr({
	    		                         'src':config.srcZeroBrand,
	    		                         'alt':'la la la'
	    	                           });
	    	    brandWrapper.append(imgBrand);
	    	    
	    	var subTitleWrapper = $('<div/>').addClass('subtitle-wrapper');
	    	var subTitleH2 = $('<h2/>').text(config.textSubTitle);
	    	    subTitleWrapper.append(subTitleH2);
	    	    
	    	var linkWrapper = $('<div/>').addClass('link-wrapper');
	    	var linkALogin = $('<a/>').attr({
	    	    	                   'href':'',
	    	    	                   'showTo':'loginLink'
	    	                           }).text(config.textLoginLink).addClass('link-index'); 
	    	var linkARegister = $('<a/>').attr({
	    	    	                   'href':'',
	    	    	                   'showTo':'registerLink'
	    	                           }).text(config.textRegisterLink).addClass('link-index'); 
	    	    linkWrapper.append(linkALogin);
	    	    linkWrapper.append(linkARegister);
	    	    
	    	var footer = $('<div/>').addClass('footer-wrapper');
	    	var footerP = $('<p/>').text(config.textFooter);
	    	    footer.append(footerP);
	    	    
	    	wrapperHeader.append(titleWrapper);
	    	wrapperHeader.append(brandWrapper);
	    	wrapperHeader.append(subTitleWrapper);
	    	wrapperHeader.append(linkWrapper);
	    	wrapperFooter.append(footer); 
	    },
	    
	    _showTo = function(show){
	    	var currentId = '#'+show
	    	$(currentId).fadeIn(500);
	    	$('.hidden-layout').fadeIn(400);
	    }
	    
	    _hideTo = function(){
	    	var showPopup = $('.popup-index').filter(':visible');
	    	showPopup.fadeOut(500);
	    	$('.hidden-layout').fadeOut(400);
	    }
	    
	    _parseData = function(data){
	    	var login = new LoginController(data[0].loginForm);
	    	login.initialize();
	    	var register = new RegisterController(data[0].registerForm);
	    	register.initialize();
	    }
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));
