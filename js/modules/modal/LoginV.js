/**
 * @author SNSukhanov
 */

function LoginController(data){
	var view = this,
	
	
	   _render = function(){
	   	  _paintView();
	   	  _handlers();
	   },
	   
	   _paintView = function(){
	   	  var wrapperRegister = $('.login');
	   	  var registerInner = $('<div/>').addClass('login-inner');
	   	  
	   	  for(var i=0; i<data.length; i++){
	   	  	var input = $('<input/>');
	   	  	var row = $('<div/>').addClass('row');
	   	     if(data[i].value == null){
	   	     	var label = $('<label/>').attr({
	   	     		                       'for':data[i].id
	   	     	                         }).text(data[i].label);
	   	     	input.attr({
	   	     		      'id':data[i].id,
	   	     		      'type':data[i].type,
	   	     		      'placeholder':data[i].placeholder
	   	     	         });
	   	       var errorBlock = $('<div/>').addClass('error').attr('ErrorId',data[i].id);
	   	       var cornerError = $('<span/>').addClass('corner-error');
	   	       var messageError = $('<span/>').addClass('message-error').text(data[i].errorMessage);
	   	           errorBlock.append(cornerError);
	   	           errorBlock.append(messageError);
	   	           
	   	      row.append(label);
	   	      row.append(input);
	   	      row.append(errorBlock);	
	   	      row.addClass('field');
	   	     }else{
	   	     	input.attr({
	   	     		      'id':data[i].id,
	   	     		      'type':data[i].type,
	   	     		      'value':data[i].value
	   	     	         });
	   	       row.append(input);	
	   	       row.addClass('button');
	   	     }
	   	     registerInner.append(row);
	   	  }
	   	  wrapperRegister.append(registerInner);
	   },
	   
	   _handlers = function(){
	   	  $('#auth-button').on('click', function(event){
	   	  	  _authActivate(event);
	   	  });
	   	  $(document).on('keyup', function(e){
	   	  	  if (e.which == 13){
	   	  	  	var currentId = $('.popup-index').filter(':visible').find('input[type="button"]').attr('id');
	   	  	  	if(currentId == "auth-button"){
	   	  	  	   $('#'+currentId).trigger('click');	
	   	  	  	}
	   	  	  	
	   	  	  }
	   	  });
	   },
	   
	   _validation = function(dataForValidate){
	   	  
	   	  
	   },
	   
	   _authActivate = function(event){
	   	var dataValidate = {};
	   	  var loginForm = $('.login');
	   	  var fields = loginForm.find("input").not("input[type='button']");
	   	  for(var i=0; i<fields.length; i++){
	   	  	    if($(fields[i]).val() == ""){
	   	  	    	_showError(fields[i]);	
	   	  	    }else{
	   	  	    	_hideError(fields[i]);
	   	  	    	dataValidate[$(fields[i]).attr('id')] = $(fields[i]).val();
	   	  	    }
	   	  }	 
	   	    if(fields.filter('.invalid').length == 0){
	   	        _loginAjax('.hidden-layout', '#loginLink', dataValidate);
	   	    }else{
	   	    	console.log('has empty fields');
	   	    }
	   },
	   
	   _hideError = function(elem){
	   	    $(elem).css({
	   	  	      'outline':'none',
	   	  	      'backgroundColor':'#ffffff'
	   	  	    }).removeClass('invalid');
	   },
	   
	   _showError = function(elem){
	     	$(elem).css({
	   	  	    	'outline':'1px solid #ff0000',
	   	  	    	'backgroundColor':'#f4a4a4'
	   	  	    }).addClass('invalid');	
	   },
	   
	    _loginAjax = function(layout, wrap, dataForm){
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
				console.log(data);
				if(data.errorCode == 10){
                   
				}else if(data.errorCode == 1){
				    localStorage.setItem('accessToken', data.accessToken);
				    localStorage.setItem('refreshToken', data.refreshToken);
				    localStorage.setItem('accessTokenTTL', data.accessTokenTTL);
				    $(layout).fadeOut(200);
				   $(wrap).fadeOut(200);
				   location.href  = initConfiguration.rootContext+initConfiguration.rootFolder+'main.html';
				}	
							
			},
			error:function(e){
			   	
			}
		  });
		}catch(e){
			console.log(e);
		}
	};
	   
   view.initialize = function(){
   	  _render();  
   }
}

