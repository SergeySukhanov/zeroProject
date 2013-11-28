Zero.PageMainController = (function(module){
	var view = {},
	    
	    config = {
	    },
	
	    _render = function(){
	    	_postRender();
	    },
	    
	    _postRender = function(){
	       _paintMain();
	       _handlers();
	    },
	    
	    _handlers = function(){
	    	
	    };
	    
	    _paintMain = function(){
	    	$(function() {
	    		Zero.TitleController.initialize();
	    		Zero.ChartsController.initialize();
	    		Zero.ChartsSettings.initialize();
	    		Zero.YesterdayController.initialize();
	    		
                Zero.SmallCalendarWidgetController.initialize($('#smallCalendarHolder'));
				//Zero.Calendar.init($('#calendarHolder'));
				Zero.Events.nextUpEvents('#nextUpEventsHolder');
				Zero.Team.lastMessages($('#lastTeamMessage'));
                Zero.EnergyController.initialize();
			})
	    },
	    
	    _setParams = function(param){
	    	
	    }
	    
	view.initialize = function(param){
		
		_render();
	};
	
	return view;
}(Zero));
