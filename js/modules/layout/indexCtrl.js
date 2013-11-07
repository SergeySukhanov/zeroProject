Zero.PageIndexController = (function(module){
	var view = {},
	
	    config = {
	       dataPopupRegister:null,
	       dataPopupLogin:null,
	       dataPopupSocLogin:null,
	       srcZeroBrand:initConfiguration.rootContext+initConfiguration.rootFolder+initConfiguration.imagesFolder+'small-brand.png',
	       
	       
	       footerMessage:"It's fast and easy. We promise never to <br/>post anything without your permission."
	    },
	
	    _render = function(){
	      try{
	    		$.ajax({
	       	       url:initConfiguration.rootContext+initConfiguration.rootFolder+initConfiguration.localDataFolder+'formLogin.json',
	       	       dataType:'json',
	       	       success:function(data){
	       	       	config.dataPopupRegister = data[0].formRegister;
	       	       	config.dataPopupLogin = data[1].formLogin;
	       	     	_postRender();
	       	       }
	           });
	    	}catch(e){
	    		console.log(e);
	    	}
	    },
	    
	    _postRender = function(){
            _drawMember();
	      _brand();
	      _authSection();
	      _socialLoginSection();
	      _footerSection();
	    },
	    
	    _handlers = function(){
	    	
	    },
	    
	    _paintIndex = function(){

	    },
	    
//	    _randomMember = function(){
//            try{
//                $.ajax({
//                    url:initConfiguration.apiUrl+'achieve',
//                    type:"GET",
//                    dataType:"json",
//                    contentType:"application/json",
//                    success:function(data){
//                        _drawMember(data);
//                    }
//                });
//            }catch(e) {
//               console.log(e);
//            }
//	    },

        _drawMember = function(){
            var wrapperRandom = $('.random-member');
            var imageFace = $('<div/>').addClass('wrapper-face-member');
            var user = Zero.Tools.getUserAvatar({
                    'avatarUrl':initConfiguration.getRootLocation()+initConfiguration.imagesFolder+'face12.jpg'
                },
                100,
                100
            );
            imageFace.append(user);
            var wrapperContent = $('<div/>').addClass('wrapper-content-member');
            //create fields
            var headerMemberName = $('<h3/>').addClass('member-name').text("Kroeni Molly Schellenberg");
            var socLoginName = $('<div/>').addClass('soc-login-member-name');
            var skypeType = $('<span/>').addClass('skype-field').text('Triathete / ');
            var twitterType = $('<span/>').addClass('twitter-field').text('@ladylourdesV');

            var linkMessage = $('<p/>').addClass('link-member-message').html('"Top Energy &trade; earner this week!"');
            var message = $('<p/>').addClass('member-message').html('Comparing myself with others in <br/> my field is inspiring and fun!');

            socLoginName.append(skypeType);
            socLoginName.append(twitterType);

            wrapperContent.append(headerMemberName);
            wrapperContent.append(socLoginName);
            wrapperContent.append(linkMessage);
            wrapperContent.append(message);

            wrapperRandom.append(imageFace);
            wrapperRandom.append(wrapperContent);
        },
	    
	    _authSection = function(){
	      $('.login-form').empty();
	      new LoginCtrl({
	      	wrap:$('.login-form'),
	      	data:config.dataPopupLogin,
	      	regData:config.dataPopupRegister
	      });
	       	
	    },

	    _brand = function(){
	    	var wrapperBrand = $('.brand');
	    	var image = $('<img/>').addClass('brand-img').attr('src', config.srcZeroBrand);
	    	wrapperBrand.append(image);
        },
	    
	    _socialLoginSection = function(){
	    	var data = config.dataPopupSocLogin;
	    	var wrapperSocLogin = $('.social-login-section');
	    	
	    	var ul = $('<ul/>').addClass('list-soc-login');
	    	
	    	for(var i=0; i<data; i++){
	    		var li = $('<li/>').addClass('item-soc-login');
	    		ul.append(li);
	    	}
	    	
	    	wrapperSocLogin.append(ul);
	    },
	    
	    _footerSection = function(){
	    	var wrapperFooter = $('.footer-index');
	    	var pFooter = $('<p/>').addClass('footer-message').html(config.footerMessage);
	    	wrapperFooter.append(pFooter);
	    };
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));
