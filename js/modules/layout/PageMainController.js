Zero.PageMainController = (function(module){
	var view = {},
        titleWrapper ='#userProfileHolder',
        chartsCurrentWrapper = '#diagramHolder',
        chartsWeekWrapper = '#yesterdayCharts',
	    
	    _paintMain = function(){
	    	$(function() {
	    		Zero.TitleController.initialize(titleWrapper);
	    		Zero.ChartsController.initialize(chartsCurrentWrapper, chartsWeekWrapper);
                Zero.SmallCalendarWidgetController.initialize();

	    		Zero.ChartsSettings.initialize();
	    		Zero.YesterdayController.initialize();
				Zero.Events.nextUpEvents();
				Zero.Team.lastMessages($('#lastMessage'));

                Zero.EnergySameController.initialize();
                Zero.EnergyController.initialize();
                Zero.EnergyUserController.initialize();
                Zero.EnergyIntervalController.initialize();
			})
	    };
	    
	view.initialize = function(param){
        _paintMain();
	};
	
	return view;
}(Zero));
