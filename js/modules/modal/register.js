function RegisterCtrl(options){
	
	var view = this;
	
	var config = {
		wrap:options.wrap,
		data:options.data,
		logData:options.logData,
		
		
		messageP:"Create on account to manage all your fitness bands, training shedules and life in general. <br/>You'll enjoy personal services and the ability to:",
		listItems:['Quickly set up and manage team events', 'See your fitness band data along side daily scedule', 'Set team goals, play and communicate together']
	},
	parseData = {},
	
	_render = function(){
		var linkWrapper = $('<div/>').addClass('link-wrapper');
		var link = $('<p/>').text('Register Now');
		var wrapperMessage = $('<div/>').addClass('wrapper-message-register');
		var message = $('<p/>').html(config.messageP);
		var ul = $('<ul/>').addClass('list-items');
		for(var i=0; i<config.listItems.length; i++){
			var li = $('<li/>').text(config.listItems[i]);
			ul.append(li);
		}
		var registerInner = $('<div/>').addClass('register-inner');
		var registerInnerLeft  = $('<div/>').addClass('register-inner-left');
		var registerInnerRight  = $('<div/>').addClass('register-inner-right');
		
		linkWrapper.append(link);
		wrapperMessage.append(message);
		wrapperMessage.append(ul);
		
		config.wrap.append(linkWrapper);
		config.wrap.append(wrapperMessage);
		
		registerInner.append(registerInnerLeft);
		registerInner.append(registerInnerRight);
		config.wrap.append(registerInner);
		_createForm(registerInner, registerInnerLeft, registerInnerRight);
		$('.register').fadeIn();
	},
	
	
	_createForm = function(wrapper, wrapperLeft, wrapperRight){
		var data = config.data;
		for(var i=0; i<data.length; i++){
			var row = $('<div/>').addClass('row-auth');
			if(i<=5){
				wrapperLeft.append(row);
			}else{
				if(data[i].type == "button"){
					wrapper.append(row);
				}else{
				   wrapperRight.append(row);	
				}
			}
          	   
			switch(data[i].type){
				case "text": _createTextField(row, data[i]);
				break;
				case "password": _createTextField(row, data[i]);
				break;
				case "birthday": _createBirthdayField(row, data[i]);
				break;
				case "gender": _createRadioField(row, data[i]);
				break;
				case "button":_createButtonField(row, data[i]);
				break;
			}
			
		}
		
		var backToLogin = $('<span/>').addClass('back-to-login').text('Back to login');
		wrapper.append(backToLogin);
		backToLogin.bind('click', function(){
			$('.login').fadeOut(100, function(){
						$('.login').empty();
                   new LoginCtrl({
                   	  wrap:$('.login'),
	      	         data:config.logData,
	      	         regData:config.data
	      	     });
            });
		});
	},
	_createBirthdayField = function(wrap, dataItem){
		var list = dataItem.listItem;
		for(var i=0; i<list.length; i++){
			var input = $('<input/>').attr({
	   	  	                         id:list[i].id,
	   	  	                         type:list[i].type,
	   	  	                         placeholder:list[i].placeholder
	   	                           });
		wrap.append(input);
		var errorBlock = $('<div/>').addClass('error');
	   	  var errorMessage = $('<span/>').addClass('error-message');
	   	  var errorLabel = $('<span/>').addClass('error-label');
	   	      errorBlock.append(errorMessage);
	   	      errorBlock.append(errorLabel);
	   	      wrap.append(errorBlock);
	   	      
	   	  
	   	  input.bind('blur', function(event){
	   	  	if(wrap.parent().parent().hasClass('login')){
	   	  		_validationLogin(event);
	   	  	}else{
	   	  	   _validation(event);	
	   	  	}
	   	  	
	   	  });
		}
		wrap.addClass('birthday-wrap');
	}
	
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
	   	  
	   	  if(dataItem.rule != undefined){
	   	  	  var countRule = dataItem.rule;
	   	  	  var wrapRule = $('<div/>').addClass('wrap-rule');
	   	  	  var titleRule = $('<h6/>').addClass('title-rule').text('please use:');
	   	  	  var innerRuleWrap = $('<div/>').addClass('inner-rule');
	   	  	      wrapRule.append(titleRule);
	   	  	      for(var i=0; i<countRule.length; i++){
	   	  	      	var field = $('<div/>').addClass('rule-field').attr('id', countRule[i].id);
	   	  	      	var icon = $('<span/>').addClass('icon-rule-field').addClass('error-small');
	   	  	      	var message = $('<span/>').addClass('message-rule-field').text(countRule[i].message);
	   	  	      	field.append(icon);
	   	  	      	field.append(message);
	   	  	      	
	   	  	      	innerRuleWrap.append(field);
	   	  	      }
	   	  	      wrapRule.append(innerRuleWrap);
	   	  	   wrap.append(wrapRule);
	   	  }
	   	  
	   	  if(dataItem.typeField == "name"){
	   	  	wrap.addClass("name-row");
	   	  }else if(dataItem.typeField == "confirm-password" || dataItem.typeField == "confirm-email"){
	   	  	input.hide();
	   	  }
	   	  
	   	  if(dataItem.typeField == "password"){
	   	  	input.next().hide();
	   	  }
	   	  var errorBlock = $('<div/>').addClass('error');
	   	  var errorMessage = $('<span/>').addClass('error-message');
	   	  var errorLabel = $('<span/>').addClass('error-label');
	   	      errorBlock.append(errorMessage);
	   	      errorBlock.append(errorLabel);
	   	      wrap.append(errorBlock);
	   	      
	   	  input.bind('focus', function(event){
	   	  	if($(event.currentTarget).attr('id') == "register-password"){
	   	  		$(event.currentTarget).next().slideDown();
	   	  	}	
	   	  });
	   	  
	   	  input.bind('blur', function(event){
	   	  	   _validation(event);	
	   	  	
	   	  });
	   	  
	   	  input.bind('keyup', function(event){
	   	  	if($(event.currentTarget).attr('id') == "register-email" || $(event.currentTarget).attr('id') == "register-password"){
	   	  		$(event.currentTarget).parent().next().children('input').slideDown();
	   	  	}
	   	  	
	   	  	if($(event.currentTarget).attr('id') == "register-password"){
	   	  		_validateRulePassword(event);
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
	
	_createRadioField = function(wrap, dataItem){
		var mainLabel = $('<span/>').addClass('label-gender').text(dataItem.value);
		var wrapperRadio = $('<div/>').addClass('radio-wrapper-gender').attr({
			                                                              id:dataItem.id,
			                                                              type:dataItem.type
		                                                                });
		var listItem = dataItem.listItem;
		for(var i=0; i<listItem.length; i++){
			var rowInner = $('<div/>').addClass('row-inner').addClass(dataItem.id);
			var input = $('<input/>').attr({
				                        id:listItem[i].id,
	   	  	                            type:listItem[i].type,
	   	  	                            name:dataItem.value
			                          });
			var label = $('<label/>').attr('for', listItem[i].id).text(listItem[i].value);
			rowInner.append(input);
			rowInner.append(label);
			
		wrapperRadio.append(rowInner);
		}
		
		wrap.append(mainLabel);
		wrap.append(wrapperRadio);
		wrap.addClass('radio-field-wrap');
	},
	
	_validationLogin = function(event){
	   	   var elem = $(event.currentTarget);
	   	   if(elem.val() == ""){	   	   	
	   	   	 _showErrorMessage(elem);
	   	   }else{
	   	   	 _showSuccessMessage(elem);
	   	   }
	   }
	   
	   _validation = function(event){
	   	   var elem = $(event.currentTarget);
	   	   if(elem.val() == ""){	   	   	
	   	   	 _showErrorMessage(elem);
	   	   }else{
	   	   	 if(elem.attr('id') == "register-email"){
	   	   	 	if(_validateEmail(elem)){
	   	   	 		_showSuccessMessage(elem);
	   	   	 		
	   	   	 	}else{
	   	   	 		_showErrorMessage(elem);
	   	   	 		
	   	   	 	}
	   	   	 }else if(elem.attr('id') == "register-confirm-email"){
	   	   	 	if(_validateConfirm(elem)){
	   	   	 		_showSuccessMessage(elem);
	   	   	 	}else{
	   	   	 		_showErrorMessage(elem);
	   	   	 	}
	   	   	 	
	   	   	 }else if(elem.attr('id') == "register-password"){
	   	   	 	if(_validatePass(elem)){
	   	   	 		_showSuccessMessage(elem);
	   	   	 	}else{
	   	   	 		_showErrorMessage(elem);
	   	   	 	}
	   	   	 	
	   	   	 }else if(elem.attr('id') == "register-confirm-password"){
	   	   	 	if(_validateConfirm(elem)){
	   	   	 		_showSuccessMessage(elem);
	   	   	 	}else{
	   	   	 		_showErrorMessage(elem);
	   	   	 	}
	   	   	 		   	   	 	
	   	   	 }else if(elem.attr('id') == "register-first-name" || elem.attr('id') == "register-last-name"){
	   	   	 	_showSuccessMessage(elem);
	   	   	 	
	   	   	 }else if(elem.attr('id') == "register-zip"){
	   	   	 		if(_validateZipCode(elem)){
	   	   	 		_showSuccessMessage(elem);
	   	   	 	    }else{
	   	   	 		_showErrorMessage(elem);
	   	   	 	    }          
	   	     }else if(elem.attr('id') == "month" || elem.attr('id') == "day"){
	   	     	if(_validationDayMonth(elem)){
	   	   	 		_showSuccessMessage(elem);
	   	   	 	    }else{
	   	   	 		_showErrorMessage(elem);
	   	   	 	    } 
	   	     }else if(elem.attr('id') == "year"){
	   	     	if(_validationYear(elem)){
	   	   	 		_showSuccessMessage(elem);
	   	   	 	    }else{
	   	   	 		_showErrorMessage(elem);
	   	   	 	    } 
	   	     }
	   	     
	   	    }
	   },
	   
	   _validationDayMonth = function(elem){
	   	  if(elem.val().length <= 2){
	   	 	return true;
	   	 }else{
	   	 	return false;
	   	 }
	   },
	   
	   _validationYear = function(elem){
	   	  if(elem.val().length == 4){
	   	 	return true;
	   	 }else{
	   	 	return false;
	   	 }
	   }
	   
	   _validateZipCode = function(elem){
	   	 if(elem.val().length == 5){
	   	 	return true;
	   	 }else{
	   	 	return false;
	   	 }
	   },
	   
	   _validateEmail = function(elem){
	   	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(elem.val());
	   },
	   
	   _validatePass = function(elem){
	   	   var newPassword = elem.val();
	   	   
	   	   var minNumberofChars = 8;
           var maxNumberofChars = 20;
           var regexpCap = new RegExp(/[A-Z]/g);
           var regexpSym = new RegExp(/[@#$%^&*!]+?[0-9]|[0-9]+?[@#$%^&*!]/g);
           
           if(newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars){
             return false;
           }else{
           	  
           	  if(!regexpSym.test(newPassword)) {             
                return false;
              }else{
              	if(!regexpCap.test(newPassword)) {             
                return false;
              }else{
              	return true;
              }
              }
           }
           
	   	   
	   },
	   
	   _validateConfirm = function(elem){
	   	   var valueConfirmPass = elem.val();
	   	   var valuePass = elem.parent().prev().children('input').val();
	   	   if(valuePass === valueConfirmPass){
	   	   	  return true;
	   	   }else{
	   	   	  return false;
	   	   }
	   },
	   
	   _validateRulePassword =  function(event){
	   	var wrapRule = $('.inner-rule');
	   	var length = wrapRule.find('#length');
	   	var specSymbol = wrapRule.find('#specSymbol');
	   	var upperCase = wrapRule.find('#uppercase');
        var answer = {
           digits : false,
           capital : false,
           length : false
        }, 
        
       val = $(event.currentTarget).val(),
       minNumberofChars = 8,
       maxNumberofChars = 20,
       
       reqexpCap = new RegExp(/[A-Z]/g),
       regexpSym = new RegExp(/[@#$%^&*!]+?[0-9]|[0-9]+?[@#$%^&*!]/g);

       if(val.length > minNumberofChars && val.length < maxNumberofChars){
           answer.length = true
           length.children('.icon-rule-field').addClass('success-small').removeClass('error-class');
       }else{
       	   length.children('.icon-rule-field').removeClass('success-small').addClass('error-class');
       }
   
       if(val.match(reqexpCap)) {
           answer.capital = true;
           upperCase.children('.icon-rule-field').addClass('success-small').removeClass('error-class');
       }else{
       	  upperCase.children('.icon-rule-field').removeClass('success-small').addClass('error-class');
       }   

       if(regexpSym.test(val)) {
           answer.digits = true;
           specSymbol.children('.icon-rule-field').addClass('success-small').removeClass('error-class');
       }else{
       	   specSymbol.children('.icon-rule-field').removeClass('success-small').addClass('error-class');
       }   

         // return answer;

       },
	   
	   
	   _parseDataBeforeAjax = function(row){
	   	var wrapper = $(row).parent();
	   	  var fields = wrapper.find('input').not("input[type='button']");
	   	    for(var i=0; i<fields.length; i++){
	   	    	parseData[$(fields[i]).attr('id')] = $(fields[i]).val();
	   	    }
	   	       _registerAjax(wrapper, parseData);

	   	    
	   	  
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
                   console.log(data);
				}else if(data.errorCode == 1){
				    localStorage.setItem('accessToken', data.accessToken);
				    localStorage.setItem('refreshToken', data.refreshToken);
				    localStorage.setItem('accessTokenTTL', data.accessTokenTTL);
				   location.href  = initConfiguration.rootContext+initConfiguration.rootFolder+'main.html';
				 }	
							
			},
			error:function(e){
			   	
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
