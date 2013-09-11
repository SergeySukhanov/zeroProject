/**
 * @author SNSukhanov
 */

function LoginController(options){
	var view = this,
	    wrap = options.wrap,
	    data = options.data,
	    parseData = {},
	    config = {
	    	textLink:'or log in'
	    },
	
	   _renderLogin = function(){
	   	  _paintLog();
	   	  _handlers();
	   },
	   
	   _paintLog = function(){
	   	  var linkWrap = $('<div/>').addClass('link-wrap');
          var link = $('<span/>').text(config.textLink);
              linkWrap.append(link);
          var innerPopup = $('<div/>').addClass('inner-popup').hide();
          
          wrap.append(linkWrap);
          wrap.append(innerPopup);
          
          for(var i=0; i<data.length; i++){
          	var row = $('<div/>').addClass('row');
          	    innerPopup.append(row);
          	   if(data[i].type !="button"){
          	   	  _createTextField(row, data[i]);
          	   }else{
          	   	  _createButtonField(row, data[i]);
          	   }
          	  
          }
          link.bind('click', function(event){
          	var box = $(event.currentTarget).parent().next();
          	var otherBox = $('.inner-popup').not(box);
          	  if($(box).filter(":visible").length > 0){
          	  	box.slideUp(200);
          	  }else{
          	  	box.slideDown(200);
          	  	otherBox.slideUp(200);
          	  }
          	    
          })
	   },
	   
	   _handlers = function(){
          $(document).bind('keypress', function(event){
          	var contains = $('.inner-popup').filter(":visible");
          	var focusField = contains.find('input').not("input[type='button']").filter(":focus");
          	var buttonField = contains.find("input[type='button']");
          	if(event.keyCode == 9){
          		$(focusField).trigger("blur");
          	}else if(event.keyCode == 13){
          		if(buttonField.filter(":focus").length > 0){
          		   $(buttonField).trigger('click');	
          		}
          	}
          })
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
	   	      
	   	  input.bind('focus', function(event){
	   	  		
	   	  });
	   	  
	   	  input.bind('blur', function(event){
	   	  	_validation(event);
	   	  });
	   	  
	   	  input.bind('keypress', function(event){
	   	  	
	   	  });
	   	  
	   	  
	   },
	   
	   _createButtonField = function(wrap, dataItem){
	   	  var input = $('<input/>').attr({
	   	  	                        id:dataItem.id,
	   	  	                        type:dataItem.type, 
	   	  	                        value:dataItem.value
	   	                           }).addClass('disable-button');
	   	      wrap.append(input);
	   	      
	   	  input.bind('click', function(event){
	   	  	  if(!input.hasClass('disable-button')){
	   	  	  	_parseDataBeforeAjax(wrap);
	   	  	  }
	   	  });
	   	  
	   }
	   
	   _validation = function(event){
	   	   var elem = $(event.currentTarget);
	   	   if(elem.val() == ""){	   	   	
	   	   	 _showErrorMessage(elem);
	   	   }else{
	   	   	_showSuccessMessage(elem);             
	   	   }
	   },
	   
	   _parseDataBeforeAjax = function(row){
	   	var wrapper = $(row).parent();
	   	  var fields = wrapper.find('input').not("input[type='button']");
	   	    for(var i=0; i<fields.length; i++){
	   	    	parseData[$(fields[i]).attr('id')] = $(fields[i]).val();
	   	    }
	   	    
	   	   _loginAjax(wrapper, parseData); 
	   	  
	   },
	   
	   _showSuccessMessage = function(elem){
	   	  var errorEl = $(elem).parent().find('.error');
	     	  errorEl.addClass('true-error').removeClass('false-error');  
	     	  errorEl.fadeIn(100);
	     	  
	      var countSuccess = $(elem).parent().parent().find('.true-error').length;;
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
	   
	    _loginAjax = function(wrap, dataForm){
		try{
		  $.ajax({
			url:initConfiguration.urlLogin,
			type:"POST",
			dataType:'json',
			contentType:"application/json",
			data: JSON.stringify({
			   "name":dataForm['auth-email'],
               "password": dataForm['auth-password']
            }),
			success:function(data){
				if(data.errorCode == 10){
                   console.log(data);
				}else if(data.errorCode == 1){
				    localStorage.setItem('accessToken', data.accessToken);
				    localStorage.setItem('refreshToken', data.refreshToken);
				    localStorage.setItem('accessTokenTTL', data.accessTokenTTL);
				   $(wrap).slideIn(200);
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
		try{
		  $.ajax({
			url:initConfiguration.urlRegister,
			type:"POST",
			dataType:'json',
			contentType:"application/json",
			data: JSON.stringify({
			   "name":dataForm['register-login'],
               "email":dataForm['register-email'],
               "password": dataForm['register-password']
            }),
			success:function(data){
				var pComplete = $('<p/>').addClass('register-complete').text('Register complete');
				$('.index-page').append(pComplete);
				$(wrap).fadeOut(200);
				setTimeout(function(){$('.register-complete').fadeOut(200)},3000);			
			},
			error:function(e){
				 _showError('#register-email');
				
				
			}
		  });
		}catch(e){
			console.log(e);
		}
	};
	   
   view.initialize = function(){
   	  _renderLogin();  
   }
   view.initialize();
}

