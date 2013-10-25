function LoginCtrl(options){
	
	var view = this;
	
	var config = {
		wrap:options.wrap,
		data:options.data,
		regData:options.regData
	},
	parseData = {},
	
	_render = function(){
		var linkWrapper = $('<div/>').addClass('link-wrapper');
		var link = $('<p/>').text('Sign In');
		
		var registerInner = $('<div/>').addClass('login-inner');
		
		linkWrapper.append(link);
		
		config.wrap.append(linkWrapper);		
		config.wrap.append(registerInner);
		_createForm(registerInner);
		$('.login').fadeIn();
	},
	
	_checkLogin = function(){
		try{
		  $.ajax({
			url:initConfiguration.urlLoginCheck,
			type:"GET",
			dataType:'json',
			contentType:"application/json",
			data: JSON.stringify({
               "email":$('#auth-email').val()
            }),
			success:function(data){
            if(data.result.exists){
            	$('#auth-email').css('color', '#0072BC');
            	$('#auth-button').val('Sign In');
            }else{
            	$('#auth-email').css('color', '#FDCB00');
            	$('#auth-button').val('Sign Up');
            }
			},
			error:function(e){
				 _showError('#register-email');								
			}
		  });
		}catch(e){
			console.log(e);
		}
	},
	
	
	_createForm = function(wrapper){
		var data = config.data;
		for(var i=0; i<data.length; i++){
			var row = $('<div/>').addClass('row-auth');
			wrapper.append(row);
          	   
			switch(data[i].type){
				case "text": _createTextField(row, data[i]);
				break;
				case "password": _createTextField(row, data[i]);
				break;
				case "button":_createButtonField(row, data[i]);
				break;
			}
			
		}
	},
	
	_createTextField = function(wrap, dataItem, align){
	   	  var input = $('<input/>').attr({
	   	  	                         id:dataItem.id,
	   	  	                         type:dataItem.type,
	   	  	                         placeholder:dataItem.placeholder
	   	                           });
	   	      wrap.append(input);                     
	   	  if(dataItem.label != undefined){
	   	  	var label = $('<label/>').attr('for', dataItem.id).text(dataItem.label);
	   	  	if(align == 'top'){
	   	  	  wrap.prepend(label);
	   	  	}else if(align == 'bottom'){
	   	  		wrap.append(label);
	   	  	}
	   	  }
	   	  
	   	  
	   	  var errorBlock = $('<div/>').addClass('error');
	   	  var errorMessage = $('<span/>').addClass('error-message');
	   	  var errorLabel = $('<span/>').addClass('error-label');
	   	      errorBlock.append(errorMessage);
	   	      errorBlock.append(errorLabel);
	   	      wrap.append(errorBlock);
	   	      
	   	  
	   	  input.bind('blur', function(event){
	   	  		_validationLogin(event);
	   	  		if($(event.target).attr('id') == "auth-email"){
	   	  		  _checkLogin();	
	   	  		}
	   	  	
	   	  });
	   	  
	   	  
	   },
	   
	   _createButtonField = function(wrap, dataItem){
	   	  var input = $('<input/>').attr({
	   	  	                        id:dataItem.id,
	   	  	                        type:dataItem.type, 
	   	  	                        value:dataItem.value
	   	                           });
	   	      wrap.append(input);
	   	      
	   	  input.bind('click', function(event){
	   	  	  if(!input.hasClass('disable-button')){
	   	  	  	_parseDataBeforeAjax(wrap);
	   	  	  }
	   	  });
	   	  wrap.addClass('button-field');
	   },
	
	
	_validationLogin = function(event){
	   	   var elem = $(event.currentTarget);
	   	   if(elem.val() == ""){	   	   	
	   	   	 _showErrorMessage(elem);
	   	   }else{
	   	   	 _showSuccessMessage(elem);
	   	   }
	   }
	   
	   _parseDataBeforeAjax = function(row){
	   	var wrapper = $(row).parent();
	   	  var fields = wrapper.find('input').not("input[type='button']");
	   	    for(var i=0; i<fields.length; i++){
	   	    	parseData[$(fields[i]).attr('id')] = $(fields[i]).val();
	   	    }
	   	       _loginAjax(false, parseData); 	
	   	    
	   	  
	   },
	   
	   _showSuccessMessage = function(elem){
	   	  var errorEl = $(elem).parent().find('.error');
	     	  errorEl.addClass('true-error').removeClass('false-error');  
	     	  errorEl.fadeIn(100);
	     	  
	      var countSuccess = $(elem).parent().parent().find('.true-error').length;
	      var countFields = $(elem).parent().parent().find('input').not("input[type='button']").length;
	      var button = $(elem).parent().parent().find("input[type='button']");
	      if(countSuccess == countFields){
	      	button.removeClass('disable-button').addClass("open-button");
	      }else{
	      	button.addClass("disable-button").removeClass("open-button");
	      }
	    
	   },
	   
	   _showErrorMessage = function(elem){
	     	var errorEl = $(elem).parent().find('.error');
	     	    errorEl.addClass('false-error').removeClass('true-error');
	     	    errorEl.fadeIn(100);
	     	var button = $(elem).parent().parent().find("input[type='button']");
	     	button.addClass("disable-button").removeClass("open-button");
	   },
	   
	    _loginAjax = function(flag, dataForm){
	    	if(flag){
	    		var email = dataForm['register-email'],
	                pass = dataForm['register-password'];
	    	}else{
	    		var email = dataForm['auth-email'],
	                pass = dataForm['auth-password'];
	    	}
		try{
		  $.ajax({
			url:initConfiguration.urlLogin,
			type:"POST",
			dataType:'json',
			contentType:"application/json",
			data: JSON.stringify({
			   "name":email,
               "password":pass
            }),
			success:function(data){
				if(data.errorCode == 10){
					$('.register').fadeOut(100, function(){
						$('.register').empty();
                    new RegisterCtrl({
                   	    wrap:$('.register'),
	      	            data:config.regData,
	      	            logData:config.data
                   });
					});
				}else if(data.errorCode == 1){
				    localStorage.setItem('accessToken', data.accessToken);
				    localStorage.setItem('refreshToken', data.refreshToken);
				    localStorage.setItem('accessTokenTTL', data.accessTokenTTL);
				   location.href  = initConfiguration.rootContext+initConfiguration.rootFolder+'main.html';
				 }	
							
			},
			error:function(e){
			  console.log(e); 	
			}
		  });
		}catch(e){
			console.log(e);
		}
	},
	 _registerAjax = function(wrap, dataForm){
	 	var fullName = dataForm['register-first-name']+' '+dataForm['register-last-name'];
		try{
		  $.ajax({
			url:initConfiguration.urlRegister,
			type:"POST",
			dataType:'json',
			contentType:"application/json",
			data: JSON.stringify({
			   "name":fullName,
               "email":dataForm['register-email'],
               "password": dataForm['register-password']
            }),
			success:function(data){
               _loginAjax(true, dataForm);
			},
			error:function(e){
				 _showError('#register-email');								
			}
		  });
		}catch(e){
			console.log(e);
		}
	},
	
	_preload = function(wrap){
		var preload = $('<img/>').attr('src', config.srcPreloader);
		wrap.append(preload);
	},
	
	_postRenderRegister = function(data){
		var message;
		if(data.errorCode == 1){
			_successDisplay(parseData['register-first-name']);
		}else if(data.errorCode == 3){
		   message = "Sorry, user already exists.";
		   _errorDisplay(message)
		}
	},
	
	_successDisplay = function(name){
		var wrap = $('.register');
		  wrap.empty();
		var messageText = 'thank you '+name+', you are on your way<br/> to something good.';
		var successImg = $('<img/>').attr('src', config.srcZeroSuccess);
		var successTitle = $('<h3/>').text('success!');
		var successMessage = $('<p/>').html(messageText);
		var linkSuccess = $('<a/>').attr('href', '#').addClass('success-link').text('return login form');
		
		wrap.append(successImg);
		wrap.append(successTitle);
		wrap.append(successMessage);
		wrap.append(linkSuccess);
		
		
		$('.success-link').bind('click', function(event){
          	 event.preventDefault();
          	 var mainWrap = $('.register-wrap');
	   	      mainWrap.children().empty();
	   	      mainWrap.children().show(); 
          	 Zero.PageIndexController.parseData($('.register'), $('.login'));
          	var title = $('.title-wrap').children();
          	var brand = $('.brand-wrap');
          	var box = $('.login').find('.inner-popup');
          	box.slideDown(300);
          });
	},
	
	_errorDisplay = function(message){
		var wrap = $('.register');
		  wrap.empty();
		var messageText = message;
		var errorImg = $('<img/>').attr('src', config.srcZeroError);
		var errorTitle = $('<h3/>').text('error!');
		var errorMessage = $('<p/>').html(messageText);
		var linkError = $('<a/>').attr('href', '#').addClass('error-link').text('return register form');
	    wrap.append(errorImg);
		wrap.append(errorTitle);
		wrap.append(errorMessage);
		wrap.append(linkError)
		  
		$('.error-link').bind('click', function(event){
          	 event.preventDefault();
          	 var mainWrap = $('.register-wrap');
	   	      mainWrap.children().empty();
	   	      mainWrap.children().show(); 
          	 Zero.PageIndexController.parseData($('.register'), $('.login'));
          	var title = $('.title-wrap').children();
          	var brand = $('.brand-wrap');
          	var box = $('.register').find('.inner-popup');
          	box.slideDown(300);
          	  	
          });
	}
	
	view.init = function(){
		_render();
	}
	
	view.init();
	
	
	
}