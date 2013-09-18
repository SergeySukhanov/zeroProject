Zero.PageIndexController = (function(module){
	var view = {},
	
	    config = {
	    	textTitle:'human<br/>simple<br/>authentic',
	    	srcZeroBrand:initConfiguration.rootContext+initConfiguration.rootFolder+initConfiguration.imagesFolder+'small-brand.png',
	    	textSubTitle:'Want Early Access?',
	    	textLoginLink:'or log in',
	    	textRegisterLink:'Register now',
	    	textFooter:"It's fast and easy. We promise never to<br/>post anything without your permission.",
	    	dataPopup:{}
	    },
	
	    _render = function(){
	    	try{
	    		$.ajax({
	       	       url:initConfiguration.rootContext+initConfiguration.rootFolder+initConfiguration.localDataFolder+'menuData.json',
	       	       dataType:'json',
	       	       success:function(data){
	       	       	config.dataPopup = data;
	       	     	_postRender();
	       	       }
	           });
	    	}catch(e){
	    		console.log(e);
	    	}
	    },
	    
	    _postRender = function(data){
	       _paintIndex();
	       _handlers();
	    },
	    
	    _handlers = function(){
	    	Zero.Tools.CheckboxUpdate({elems:$('.checkbox')});
	    };
	    
	    _paintIndex = function(){            var wrapperHeader = $('.header-index');
            var wrapperFooter = $('.footer-index');           
            var titleWrap = $('<div/>').addClass('title-wrap');
            var brandWrap = $('<div/>').addClass('brand-wrap');
            var registerWrap = $('<div/>').addClass('register-wrap');
            var socLoginWrap = $('<div/>').addClass('soclogin-wrap');
            
            var title = $('<h1/>').html(config.textTitle);
            var brand = $('<img/>').attr('src', config.srcZeroBrand);            var register = $('<div/>').addClass('register');
            var login = $('<div/>').addClass('login');
            
            titleWrap.append(title);
            brandWrap.append(brand);
            registerWrap.append(register);
            registerWrap.append(login);
            
            wrapperHeader.append(titleWrap);
            wrapperHeader.append(brandWrap);
            wrapperHeader.append(registerWrap);
           
           view.parseData(register, login);
           //create footer
            var messageFooterWrap = $('<div/>').addClass('message-footer-wrap');
            var message = $('<p/>').html(config.textFooter); 
                messageFooterWrap.append(message);
                wrapperFooter.append(messageFooterWrap);
            
            
	    },
	    
	    view.parseData = function(reg, log){
	    	var data = config.dataPopup;
	    	new AuthController({data:data[0].registerForm, wrap:reg, textLink:"Register now"});
	    	new AuthController({data:data[0].loginForm, wrap:log, textLink:"or log in"});           
	    }
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));
