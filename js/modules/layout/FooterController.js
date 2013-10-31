Zero.FooterController = (function(module){
	var view = {},
	
	    config = {
	    	brandImg:'small-brand.png'
	    },
	
	    _render = function(){
	       _postRender();
	    },
	    
	    _postRender = function(data){
	       _paintFooter();
	       // _handlers();

	    },
	    
	    _handlers = function(){
	    	
	    },
	    
	    _paintFooter = function(){			
	       var footer = $('footer.footer');
	       var root = initConfiguration.getRootLocation();
	       var copyRightWrapper = $('<div/>').addClass('copyright-wrapper');
	       var pCopy = $('<img/>').attr('src', root+initConfiguration.imagesFolder+config.brandImg);
	           copyRightWrapper.append(pCopy);
	           
		   var links = $('<ul />').addClass('footer-menu'),
		       privacy = $('<li><a href="' + initConfiguration.settingsData.privacy +'">Privacy Policy</a></li>'),
			   downloads = $('<li class="downloads"><a href="' + root +'/downloads.html">Downloads</a></li>');
			   	
			   privacy.appendTo(links);
			   downloads.appendTo(links);
			   
			   copyRightWrapper.append(links);
			   
	           footer.append(copyRightWrapper);
	    };
	    
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));