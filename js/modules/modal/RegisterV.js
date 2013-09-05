/**
 * @author SNSukhanov
 */

function RegisterController(data){
	var view = this,
	
	
	   _render = function(){
	   	  _paintView();
	   	  _handlers();
	   },
	   
	   _paintView = function(){
	   	  var wrapperRegister = $('.register');
	   	  var registerInner = $('<div/>').addClass('register-inner');
	   	  
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
	   	      row.append(label);
	   	      row.addClass('field');
	   	     }else{
	   	     	input.attr({
	   	     		      'id':data[i].id,
	   	     		      'type':data[i].type,
	   	     		      'value':data[i].value
	   	     	         });
	   	      row.addClass('button');
	   	     }
	   	     row.append(input);	
	   	     registerInner.append(row);
	   	  }
	   	  wrapperRegister.append(registerInner);
	   },
	   
	   _handlers = function(){
	   	  $('#register-button').on('click', function(event){
	   	  	  _registerActivate(event);
	   	  });
	   	  
	   	  $(document).on('keyup', function(e){
	   	  	  if (e.which == 13){
	   	  	  	var currentId = $('.popup-index').filter(':visible').find('input[type="button"]').attr('id');
	   	  	  	if(currentId == "register-button"){
	   	  	  	   $('#'+currentId).trigger('click');	
	   	  	  	}	   	  	  	
	   	  	  }
	   	  });
	   },
	   
	   _validation = function(dataForValidate){
	   	  if(dataForValidate['register-password'].length < 6){
	   	  	_showError('#register-password');
	   	  	return false;
	   	  }else{
	   	  	if(dataForValidate['register-password'] != dataForValidate['register-password-repeat']){
	   	  	   _showError('#register-password');
	   	  	   _showError('#register-password-repeat');
	   	  	   return false 
	   	    }else{
	   	    	_hideError('#register-password');
	   	  	    _hideError('#register-password-repeat');
	   	    	if(dataForValidate['register-email'].indexOf('@')+1 == 0){
	   	    	    _showError('#register-email');
	   	    	    return false;	
	   	    	}else{
	   	    		return true;
	   	    	}
	   	    }
	   	    
	   	  }
	   },
	   
	   _registerActivate = function(event){
	   	var dataValidate = [];
	   	  var loginForm = $('.register');
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
	   	        if(_validation(dataValidate)){
	   	  	       _registerAjax('.hidden-layout', '#registerLink', dataValidate);
	   	        }else{
	   	  	      console.log('error');
	   	        }
	   	    }
	   },
	   
	   _hideError = function(elem){
	   	    $(elem).css({
	   	  	      'backgroundColor':'#ffffff'
	   	  	    }).removeClass('invalid');
	   },
	   
	   _showError = function(elem){
	     	$(elem).css({
	   	  	    	'backgroundColor':'#f4a4a4'
	   	  	    }).addClass('invalid');	
	   },
	   
	   _registerAjax = function(layout, wrap, dataForm){
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
				$(layout).fadeOut(200);
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
   	  _render();  
   }
}
