Zero.EventChartsController = (function(module){
	var view = {},
	
	    config = {
	    	
	    },
	    _calendars = new Array(),
	    _start,
	    _finish,
	    _primaryCalendar = new Array();
	    _secondaryCalendar = new Array();
	    _thirdCalendar = new Array();
	    
	
	    _render = function(){	    	
	       _postRender();
	    },
	    
	    _postRender = function(data){
	    	 if(_calendars.toString() == null) return;
	    	
	    	try{
	    		$.ajax({
			       url: initConfiguration.urlEventsCalendar,
			        type: 'GET',
			        dataType: 'json',
			        contentType: "application/json",
			        data: {
				      "start" : _start,
				      "end" : _finish,
				      "direction": 1, 
				      "amount": 100, 
				      "calendarIds": _calendars.toString()
				     },			
			         success: function (resp) {	
				        _paintEventCharts(resp.events);
			          },
			         error : function(error) {
				       
			          }
		          })	
	    	  }catch(e){
	    	  	
	    	  }

	    },
	    
	    _handlers = function(){
	    	
	    },
	    
	    _setParamsEvents = function(ids, start, finish){
	    	_calendars = ids;
	    	_start = start;
	    	_finish = finish;
	    	
	    },
	    
	    _drawPrimaryCalendar = function(paper, diff, calendar, set){
	    	var paxelDiff = diff;
	    	
	    	for(var i=0; i<calendar.length; i++){
	    		var startEvent = calendar[i].startTime;
	    		var endEvent = calendar[i].endTime;
	    		var startX = (startEvent-_start)/diff;
	    		var endX = (endEvent-_start)/diff;	
	    	   
	    	   var rect = paper.rect(startX, 0, endX-startX, 18);
	    	   rect.attr({
	    	   	  "fill":'#f7982f',
	    	   	  "opacity":0.7,
	    	   	  "stroke":"transparent"
	    	   });
	    	}
	    },
	    _drawSecondaryCalendar = function(paper, diff, calendar, set){
	    	var paxelDiff = diff;
	    	
	    	for(var i=0; i<calendar.length; i++){
	    		if(calendar[i] != undefined){
	    			var startEvent = calendar[i].startTime;
	    		    var endEvent = calendar[i].endTime;
	    		    var startX = ((startEvent-_start)/diff);
	    		    var endX = ((endEvent-_start)/diff);
	    	   
	    	   var rect = paper.rect(startX, 21, endX-startX, 18);
	    	   rect.attr({
	    	   	  "fill":'#a3a9ad',
	    	   	  "opacity":0.9,
	    	   	  "stroke":"transparent"
	    	   }).click(function(){
	    	   	console.log(calendar);
	    	   }).data('id', '123');
	    		}
	    		
	    	}
	    },
	    
	    _paintEventCharts = function(events){
	    	var paperDOM = $('#diagramEventHolder');
	    	paperDOM.empty();
	    	var paperWidth = paperDOM.width();
	    	var paperHeight = paperDOM.height();
	    	var calendarsEvents = events;
	    	var startEventsTime = new Date(_start*1000);
	    	var endEventsTime = new Date(_finish*1000);
	    	
	    	var paperDay = parseInt(paperWidth/7);
	    	var paperHour = parseInt(paperDay/24);
	    	var differents = _finish-_start;
	    	var pixel = differents/paperWidth;
	    	
	    	var fillArray = ['#f7982f', '#d7dadb', '#a3a9ad'];
	    	
               var paper = Raphael('diagramEventHolder', paperWidth, paperDOM.height());
               var setRect =paper.set();
               var startX = 0;
               var startY = 0;
                  for(var j=0; j< _calendars.length; j++){
                  	setRect.push(paper.rect(startX, startY, paperWidth, paperHeight/3));
                  	startY = startY + paperHeight/3;
                  	
                  	setRect[j].attr({
                  		"stroke":"transparent"
                  	});
                  }
               var indexP = 0;
               var indexS = 0;
               var indexT = 0;
               
               for(var i=0; i<calendarsEvents.length; i++){
	    		if(calendarsEvents[i].calendarId == _calendars[0]){
	    	     	 _primaryCalendar[indexP] = calendarsEvents[i];
	    	     	 indexP++;
	    		}
	    		if(calendarsEvents[i].calendarId == _calendars[1]){
	    			_secondaryCalendar[indexS] = calendarsEvents[i];
	    		    indexS++;
	    		}
	    		
	    		if(calendarsEvents[i].calendarId == _calendars[2]){
	    			_thirdCalendar[indexT] = calendarsEvents[i];
	    		    indexT++;
	    		}
	    		
	    		
	    	}
            _drawPrimaryCalendar(paper, pixel, _primaryCalendar, setRect);
            _drawSecondaryCalendar(paper, pixel, _secondaryCalendar, setRect);
	    };
	    
	    
	view.initialize = function(calendarsId, start, finish){
		_setParamsEvents(calendarsId, start, finish);
		_postRender();
	};
	
	return view;
}(Zero));