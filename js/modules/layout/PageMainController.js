Zero.PageMainController = (function(module){
	var view = {},
	    
	    config = {
	    },
	
	    _render = function(){
            _paintMain();
	    },
	    
	    _paintMain = function(){
	    	$(function() {
	    		Zero.TitleController.initialize();
	    		Zero.ChartsController.initialize();
                Zero.SmallCalendarWidgetController.initialize();

	    		Zero.ChartsSettings.initialize();
	    		Zero.YesterdayController.initialize();
				Zero.Events.nextUpEvents();
//				Zero.Team.lastMessages($('#lastMessage'));

                Zero.EnergySameController.initialize();
                Zero.EnergyController.initialize();
                Zero.EnergyUserController.initialize();
			})
	    };
	    
	view.initialize = function(param){
		_render();
	};
	
	return view;
}(Zero));
