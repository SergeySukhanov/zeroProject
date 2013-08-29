function onJsGraphDataLoad(series) {
		var graphsData = null;
			graphsData = series.charts;
	   var _calculate = function(data, index){
				var resultData = [];
				var accurate = 60;
				var min = index;
				var max = min+accurate;
				var sumX = 0;
				var sumY = 0;
				  if(data.x[index+accurate] == undefined){				
				    for(min; min<max; min++){
					     sumX = sumX+data.x[min];
					     sumY = sumY+data.y[min];
				     }
				   resultData.push([sumX/accurate, sumY/accurate]);
				
				   return [sumX/accurate, sumY/accurate];	
				}else{
					resultData.push([data.x[min], data.y[min]]);
				
				   return [data.x[min], data.y[min]];
				}
			};
			var data = [];
			var dataStp = [];
			var dataCal = [];
			var dataF = [];
			var accurate = 50;
			
			for(var i=0; i<graphsData.length; i++){
				var dataLength = graphsData[i].x.length;
				if(graphsData[i].plot == "nikeSteps"){
                  		var stp = 0;
                  		for(stp; stp<dataLength; stp = stp+accurate){
                  			var sumDataStp = _calculate(graphsData[i], stp);
                  			  dataStp.push(sumDataStp);                 			  
                  		}
                  	}else if(graphsData[i].plot == "nikeCalories"){
                  		var cal = 0;
                  		for(cal; cal<dataLength; cal = cal+accurate){
                  			var sumDataCal = _calculate(graphsData[i], cal);
                  			  dataCal.push(sumDataCal);                			  
                  		}                 		
                  	}else{
                  		var F = 0;
                  		for(F; F<dataLength; F = F+accurate){
                  			var sumDataF = _calculate(graphsData[i], F);
                  			  dataF.push(sumDataF);                 			  
                  		}
                  	}
			}
			
          
			data = [
			    {
				 name : "calories",
				 data : dataCal,
				 type : 'spline',
				 dashStyle : 'ShortDot',
				 lineWidth : 2,
				 color : "#d4523d",
				 dataGrouping : {
					 enabled : false
				   },
				 marker:{
					 symbol:'url(/zeroProject/resourses/images/drop.png)'
				}
				
			   },
		       
			    {
				name : "steps",
				data : dataStp,
				type : 'spline',
				dashStyle : 'ShortDot',
				lineWidth : 2,
				color:'#47b748',
				marker:{
					symbol:'url(/zeroProject/resourses/images/step.png)'
				 }
			    }, 
			    {
				name : "fuels",
				id : "fuels",
				dashStyle : 'ShortDot',
				type : 'spline',
				data : dataF,
				color : "#7292cb",
				lineWidth : 2,
				marker:{
					symbol:'url(/zeroProject/resourses/images/circle.png)'
				},
				tooltip : {
					pointFormat : '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} %</b><br/>'
				    }
			    }
			 ];

			var generalTooltip = {
						xDateFormat: '%b %e, %l %p'
			}

			try {

				$('#diagramHolder').highcharts('StockChart', {
					chart : {
                      borderRadius:0,
                      backgroundColor:'#ffffff'
                      
					},
					
					credits : {
						enabled : false
					},
					
					legend : {
						enabled : true
					},

					colors : ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
					rangeSelector:{
						enabled : false,
						selected:0,
						inputEnabled:false,
						buttons: [{
							type: 'day',
							count: 1,
							text: '1d'
						},{
							type: 'week',
							count: 1,
							text: '1w'
						},{
							type: 'month',
							count: 1,
							text: '1m'
						}, {
							type: 'month',
							count: 6,
							text: '6m'
						}, {
							type: 'year',
							count: 1,
							text: '1y'
						}, {
							type: 'all',
							text: 'All'
						}]
					},
					navigator:{

						enabled:true,
						maskFill:'rgba(255,255,255,1)',
						height:5,
						series:{
							lineWidth:0,
							type:'spline',
							color:'#000000'},
						xAxis:{
							labels:{
								enabled:false
						}
                }
					},
					scrollbar: {
						barBackgroundColor: 'white',
						buttonBackgroundColor: 'gray',
						trackBackgroundColor: 'none',
						trackBorderWidth: 0
					},

					xAxis : {
						gridLineWidth:1,
						plotLines : [{
							value : 0,
							width : 0,
							color : 'silver'
						}],
						labels:{
							enabled:true
						},
						
					},
					yAxis : {
						gridLineWidth:0,
						plotLines : [{
							value : 0,
							width : 0,
							color : 'silver'
						}],
						labels:{
							enabled:false
						}
					},
					tooltip:generalTooltip,
					series : data
				});
			} catch (e) {
				console.log(e)
				throw e;
			}
		}