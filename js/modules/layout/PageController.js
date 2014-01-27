Zero.PageController = (function(module){
	var view = {},
	
	    _param,
	    
	    tokens = module.getTokens(),
	    
	    _renderSettings = function(){
	    	if(tokens.accessToken){
	    	   try{
	    		$.ajax({
	    		beforeSend: function (request) {
					   request.setRequestHeader("Access-Token", tokens.accessToken);
				    },	
					url:initConfiguration.apiUrl+'settings',
					type:'GET',
					dataType:'json',
					contentType:'aplication/json',
					success:function(data){
						initConfiguration.settingsData = data.result;
						module.buildCalendarAccounts();
                        _paintView();
                        _handlers();
                        _renderUserEnergy();
					},
					error:function(error){
						if(error && error.status == '401') {
							localStorage.clear();
							window.location = initConfiguration.getRootLocation();
						}
					}
	    	    });
	    	    }catch(e){
	    		   console.log(e);
	    	   }	
	    	}else{
                _paintView();
                _handlers();
	    	}
	    },

        _renderUserEnergy = function(){
            try{
                $.ajax({
                    beforeSend: function (request) {
                        request.setRequestHeader("Access-Token", tokens.accessToken);
                    },
                    url:initConfiguration.apiUrl + 'user',
                    type:'GET',
                    dataType:'json',
                    contentType:'application/json',
                    data:{
                        'ids':initConfiguration.settingsData.userId
                    },
                    success:function(res){
                        initConfiguration.energyUser = res.result[0];
                        _renderUserTeam();

                    }
                })
            }catch (e){
                console.log(e);
            }
        },

        _renderUserTeam = function(){
            try{
                $.ajax({
                    beforeSend: function (request) {
                        request.setRequestHeader("Access-Token", tokens.accessToken);
                    },
                    url:initConfiguration.apiUrl + 'user/team',
                    type:'GET',
                    dataType:'json',
                    contentType:'application/json',
                    data:{
                        'ids':initConfiguration.settingsData.userId
                    },
                    success:function(res){
                        initConfiguration.energyUserTeam = res.result[0];

                    }
                })
            }catch (e){
                console.log(e);
            }
        },
	    
	    _handlers = function(){
	    	Zero.Tools.CheckboxUpdate({elems:$('.checkbox')});
            Zero.Tools.selectUpdate($('.dropdown'));
        },
	    
	    _paintView = function(){
	    	//header
           var header = Zero.HeaderController;
               header.initialize();
           //mainContent
           var content = Zero[_param];
              content.initialize();
           //footer☺
           var footer = Zero.FooterController;
               footer.initialize();
               
	    },
	    
	    _setParams = function(param){
	    	_param = param
	    };
		
		
	    
	view.initialize = function(param){
		_setParams(param);
        _renderSettings();
	};
	
	return view;
}(Zero));