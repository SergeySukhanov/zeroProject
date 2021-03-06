function onJsGraphDataLoad(holder, series, flag) {
		var graphsData = null;
			graphsData = series.charts;

			var data = [];
			
			for(var i=0; i<graphsData.length; i++){
				var dataLength = graphsData[i].x.length;
				var dataItem = [];
				if(i==0){
					color = '#3CC6F0'
				}else if(i==1){
					color = '#358c2f'
				}else{
					color = '#d4523d'
				}
                 for(var j=0; j<dataLength; j++){
                 	dataItem.push([graphsData[i].x[j]*1000, graphsData[i].y[j]]);
                 }
                 ObjData = {
                 	name:graphsData[i].plot, 
                 	data:dataItem, 
                 	type:'spline',
                 	dashStyle:'ShortDot', 
                 	lineWidth:2,
                 	color:color
                 };
                 data.push(ObjData);
			}

			var generalTooltip = {
						xDateFormat: '%b %e, %l %p'
			};
            $(holder).empty();
			if(flag){
				try {
                
				$(holder).highcharts('StockChart', {
					chart : {
                      borderRadius:0,
                      backgroundColor:'transparent'
                      
                      
					},
					
					credits : {
						enabled : false
					},
					
					legend : {
						enabled : true,
						y:1,
						borderWidth:0
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
						}]
					},
					navigator:{

						enabled:false

					},
					scrollbar: {
						enabled:false,
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
				console.log(e);
				throw e;
			 }
			}else{
				try {
                
				$(holder).highcharts('StockChart', {
					chart : {
                      borderRadius:0,
                      backgroundColor:'transparent'
                      
                      
					},
					
					credits : {
						enabled : false
					},
					
					legend : {
						enabled : false,
						y:1,
						borderWidth:0
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
						}]
					},
					navigator:{

						enabled:false

					},
					scrollbar: {
						enabled:false,
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
						}
						
					},
					yAxis : {
						gridLineWidth:1,
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
				console.log(e);
				throw e;
			 }
			}
		}