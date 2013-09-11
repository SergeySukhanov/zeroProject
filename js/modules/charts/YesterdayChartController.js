Zero.YesterdayController = (function(module){
	var view = {},
	
	    config = {
	    	title:"YESTERDAY'S RECAP",
	    	subTitle:"You're Reached Your Activity Goal!",
	    	article1:"You walked 17,000 steps yesterday! That is 12% better than your best day of 15,320 steps on July 24th, 2013.",
	    	article2:"Take a moment to think about what you did and recreate that every day",
	    	chart:"yes-chart.png"
	    	
	    },
	
	    _render = function(){
	       _postRender();
	    },
	    
	    _postRender = function(data){
	       _paintYesterday();
	       // _handlers();

	    },
	    
	    
	    _handlers = function(){
	    	
	    },
	    
	    _paintYesterday = function(){
	    	var root = initConfiguration.getRootLocation();
	       var wrap = $('.chart-yesterday');
	       var h1yes = $('<h1/>').addClass('header-yes').text(config.title);
	       var subH2 = $('<h2/>').text(config.subTitle);
	       var chartImg = $('<img/>').attr('src', root+initConfiguration.imagesFolder+config.chart);
	       var yesChart = $('<div/>').addClass('wrap-p');
	       var pArticle1 = $('<p/>').text(config.article1);
	       var pArticle2 = $('<p/>').text(config.article2);
	       
	       yesChart.append(pArticle1);
	       yesChart.append(pArticle2);
	       
	       wrap.append(h1yes);
	       wrap.append(subH2);
	       wrap.append(chartImg);
	       wrap.append(yesChart);
	    };
	    
	    
	view.initialize = function(){
		_render();
	};
	
	return view;
}(Zero));