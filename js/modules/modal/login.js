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
        var loginData =  $('#email-log').val();
		try{
		  $.ajax({
			url:initConfiguration.apiAuthUrl+'check_email_exists',
			type:"GET",
			dataType:'json',
			contentType:"application/json",
			data:{
				email:loginData
			},
			success:function(data){
            if(data.result.exists){
                 console.log(data.result.exists);
                $('#button-login').val('Sign In');
                $('#email-log').css('color', '#75caea');
            }else{
                $('#email-log').css('color', '#FDCB00');
                $('.random-member').slideUp(300);
                $('#button-login').val('Sign Up');
                $('.form-login').fadeOut(100, function(){
                    $('.form-login').empty();
                    new RegisterCtrl({
                        wrap:$('.form-login'),
                        data:config.regData,
                        logData:config.data,
                        email:loginData
                    });
                });
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
	
	
	_createForm = function(){
        var constructor = new ConstructorForm();
        var wrapperForm = $('.form-login');
		var data = config.data;
        var field;

		for(var i=0; i<data.length; i++){
            if(data[i].type == "text" || data[i].type == "password"){
                switch(data[i].fieldType){
                    case "simple-text": field = constructor.simpleTextField({
                        data:data[i],
                        blur: _blurText,
                        focus: _focusText,
                        key: _keyPressText
                    });
                        break;

                    case "full-name-text": field = constructor.multiFieldText({
                        data:data[i],
                        blur: _blurText,
                        focus: _focusText,
                        key: _keyPressText
                    });
                        break;
                }
            }else if(data[i].type == "button"){
                switch(data[i].fieldType){
                    case "simple-button": field = constructor.simpleButtonField({
                        data:data[i],
                        click: _clickButton
                    });
                        break;

                    case "multi-button": field = constructor.multiFieldButton({
                        data:data[i],
                        click: _clickButton
                    });
                        break;
                }
            }
            wrapperForm.append(field);

		}
	},
    _blurText = function(event){
        console.log(event);
        if($(event.target).attr('id') == "email-log"){
            if($(event.target).val() != ""){
                if(!$(event.target).next().hasClass('false-error')){
                    _checkLogin(event);
                }
            }
        }
    },

    _focusText = function(){

    },
        _keyPressText = function(event){
            _validationLogin(event)
        },

        _clickButton = function(event){
            _parseDataBeforeAjax($(event.target).parent());
        },
	
	
	_validationLogin = function(event){
	   	   var elem = $(event.currentTarget);
	   	   if(elem.val() == ""){	   	   	
	   	   	 _showErrorMessage(elem);
	   	   }else{
               if(elem.attr('id') == "email-log"){
                   if(_validateEmail(elem)){
                       _showSuccessMessage(elem);
                   }else{
                       _showErrorMessage(elem);
                   }
               }else{
                  if(elem.val().length < 6){
                      _showErrorMessage(elem);
                  }else{
                      _showSuccessMessage(elem);
                  }
               }
	   	   }
    },
        _validateEmail = function(elem){
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(elem.val());
        },
	   
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
	    		var email = dataForm['email-log'],
	                pass = dataForm['password-log'];
	    	}
		try{
		  $.ajax({
			url:initConfiguration.apiAuthUrl+'session',
			type:"POST",
			dataType:'json',
			contentType:"application/json",
			data: JSON.stringify({
			   "email":email,
               "password":pass,
                "deviceType":"web"
            }),
			success:function(data){
				if(data.code == 10){
                    console.log(data.code);
				}else if(data.code == 1){
				    localStorage.setItem('accessToken', data.result.accessToken);
				    localStorage.setItem('refreshToken', data.result.refreshToken);
				    localStorage.setItem('accessTokenTTL', data.result.accessTokenTTL);
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
	};
	
	view.init = function(){
		_render();
	};
	
	view.init();
	
	
	
}