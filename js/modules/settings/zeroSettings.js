Zero.Settings = (function(module){
	var m = {};
	var calendarValues = [];	
	
	
	_createTabs = function() {
	
		var holder = $('.settings-content'),	
			buttonHolder = $('<div />').addClass('button-holder'),
			btSave = $('<button />').addClass('bt-save').text('Save');

			
		_createPersonalTab();
		_createTimeTab();
		// _createImportTab();
		// _createUnitTab();
		_createCalendarTab();
			
			
	    Zero.Tools.CheckboxUpdate({elems:$('.checkbox')});
	    Zero.Tools.selectUpdate($('.dropdown'));
			
			
		btSave.appendTo(buttonHolder);
		buttonHolder.appendTo(holder);
		
		btSave.bind('click', function(event){
			_updateSettings(event, "save");
		});
	
	}
	
	_createPersonalTab = function() {
		var holder = $('.tabs-pages .personal-tab'),
			// fName = _createFormRowHtml('name', 'Name', 'string'),
			fUserName = _createFormRowHtml('username', 'Username', 'string'),
			fEmail = _createFormRowHtml('mail', 'E-mail', 'string'),
			fHeight = _createFormRowHtml('height', 'Height', 'string'),
			fWeight = _createFormRowHtml('weight', 'Weight', 'string'),
			fBirthday = _createFormRowHtml('birthday', 'Birthday', 'jq-datepicker');
			
		// fName.appendTo(holder);
		fUserName.appendTo(holder);
		fEmail.appendTo(holder);
		fHeight.appendTo(holder);
		fWeight.appendTo(holder);
		fBirthday.appendTo(holder);
		
	};
	
	_createImportTab = function() {
		var holder = $('.tabs-pages .import-tab'),
			fAcc = _createFormRowHtml('accelerometer', 'Accelerometer', 'checkbox', null, true),
			fLocation = _createFormRowHtml('location', 'Location', 'checkbox',  null, true),
			fContacts = _createFormRowHtml('contacts', 'Contacts', 'checkbox', null, true);
			
			
		fAcc.appendTo(holder);	
		fLocation.appendTo(holder);	
		fContacts.appendTo(holder);	
			
	};
	
	_createUnitTab = function() {
		var holder = $('.tabs-pages .unit-tab'),
			unitValues = [
				{'metric' : 'metric'},
				{'english' : 'english'}
			],
			fMetrics = _createFormRowHtml('metric', 'Set Units', 'dropdown', unitValues),
			fInherit = _createFormRowHtml('metricFromDevice', 'inherit settings from sync device', 'checkbox');
		
		fMetrics.appendTo(holder);
		fInherit.appendTo(holder);
			
	};
	
	_createTimeTab = function() {
		var holder = $('.tabs-pages .time-tab'),
			fUTCValues = [
				{'automatic' : 'auto'},
				{'UTC-0' : '0'},
				{'UTC-1' : '-1'},
				{'UTC-2' : '-2'},
				{'UTC-3' : '-3'},
				{'UTC-4' : '-4'},
				{'UTC-5' : '-5'},
				{'UTC-6' : '-6'},
				{'UTC-7' : '-7'},
				{'UTC-8' : '-8'},
				{'UTC-9' : '-9'},
				{'UTC-10' : '-10'},
				{'UTC-11' : '-11'},
				{'UTC-12' : '-12'},
				{'UTC+1' : '1'},
				{'UTC+2' : '2'},
				{'UTC+3' : '3'},
				{'UTC+4' : '4'},
				{'UTC+5' : '5'},
				{'UTC+6' : '6'},
				{'UTC+7' : '7'},
				{'UTC+8' : '8'},
				{'UTC+9' : '9'},
				{'UTC+10' : '10'},
				{'UTC+11' : '11'},
				{'UTC+12' : '12'}
			]
			fPrimary = _createFormRowHtml('primary', 'Primary', 'dropdown', fUTCValues),
			fSync = _createFormRowHtml('syncToDevice', 'sync to device', 'checkbox'),
			fSecondary = _createFormRowHtml('secondary', 'Secondary', 'dropdown', fUTCValues);
			fTravel = _createFormRowHtml('syncToDevice', 'toggle for travel', 'checkbox'),
			
		fPrimary.appendTo(holder);	
		fSync.appendTo(holder);
		// fSecondary.appendTo(holder);	
		// fTravel.appendTo(holder);
			
	};
	
	
	_createCalendarTab = function() {
		var holder = $('.tabs-pages .calendar-tab'),
			alertValues = [
				{'5 minutes before' : '5'},
				{'10 minutes before' : '10'},
				{'15 minutes before' : '15'},
				{'30 minutes before' : '30'},
				{'45 minutes before' : '45'},
				{'1 hour before' : '60'}				
			],		
			fAlerts = _createFormRowHtml('alerts', 'Default Alert', 'dropdown', alertValues),
			weekValues = [
				{'Sunday' : '1'},
				{'Monday' : '2'}
			],
			fWeek = _createFormRowHtml('weekStarts', 'Week Starts', 'dropdown', weekValues),
			//fShowDeclined = _createFormRowHtml('showDeclined', 'Show Declined', 'checkbox',  null, true),
			//fCheckIn = _createFormRowHtml('autoCheck', 'Auto Check-In', 'checkbox',  null, true);

			
			fCalendars = _createFormRowHtml('primaryCalendar', 'Primary', 'dropdown', calendarValues);
			fCalendarsS = _createFormRowHtml('secondaryCalendar', 'Secondary', 'dropdown', calendarValues);
			fThirdCalendars = _createFormRowHtml('thirdCalendar', 'Third', 'dropdown', calendarValues);
			// fHolyDayCalendars = _createFormRowHtml('holydaysCalendar', 'Holidays', 'dropdown', calendarValues);
			
			fCalendars.appendTo(holder);
			fCalendarsS.appendTo(holder);
			fThirdCalendars.appendTo(holder);
			fAlerts.appendTo(holder);
			// fHolyDayCalendars.appendTo(holder);
			fWeek.appendTo(holder);
			//fShowDeclined.appendTo(holder);
			//fCheckIn.appendTo(holder);	
	};
	
	
	_getCalendars = function() {
		var tokkens = module.getTokens();
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Access-Token", tokkens.accessToken);
			},			
			url: initConfiguration.urlCalendarsList,
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			success: function (resp) {			
				if(resp && resp.accounts && resp.accounts.length > 0) {
					for(var i=0; i < resp.accounts.length; i++) {
						var cal = resp.accounts[i].calendars;
						for(var j=0; j < cal.length; j++) {
							var item = cal[j];
							var obj = {};
							obj[cal[j].summary] = cal[j].id;
							calendarValues.push(obj);							
						}
					}				
					_createTabs();
				}
				
			},
			error : function(error) {
				console.log(error);
			}
		})		
	}
	
	_createFormRowHtml = function(name, text, type, val, useLabel) {
		var html = $('<div />').addClass('row'),
			label,
			el,
			checkboxText;
		
		if(type != 'checkbox') {
			label = $('<label />').attr('for', name).text(text + ':')
		} else {
			if(useLabel) {
				label = $('<label />').attr('for', name).text(text + ':')
			} else {
				checkboxText = $('<span />').addClass('checkbox-text').text(text);			
			}			
		}
		
		if(type == 'string') {
			el = $('<input />').attr({
					'type' : 'text',
					'name' : name,
					'id' : name					
				}).val(val);
		}	
		
		if(type == 'jq-datepicker') {
			el = $('<input />').attr({
					'type' : 'text',
					'name' : name,
					'id' : name,
					'class' : 'jq-datepicker'					
				}).val(val).datetimepicker();
		}
		
		
		if(type == 'dropdown') {
			el = $('<select />').attr({
					'name' : name,
					'id' : name,
					'class':'dropdown'			
			});
			for(var i = 0; i < val.length; i++) {
				var obj = val[i];
				for(var key in obj) {
					$('<option />').attr('value', obj[key]).text(key).appendTo(el);					
				}
			};
		}
		
		if(type == 'checkbox') {
			el = $('<input />').attr({
					'type' : 'checkbox',
					'name' : name,
					'id' : name,
					'class' : 'checkbox'
				});	

		}
		
		
		if(label) label.appendTo(html);
		if(checkboxText) checkboxText.appendTo(html);
		el.appendTo(html);
		
		return html;
	}
	
	
	/*Tabs */
	_handlerTabs = function() {
		var tabMenu, tabPages, $holder = $('.settings-content');	
		
		tabMenu = $('.tabs-menu a', $holder);
		tabPages = $('.tabs-pages', $holder)

		for(var i=0; i < tabMenu.length; i++) {
			var $tabItem = $(tabMenu[i]);
			$tabItem.bind('click',function(e){
				e.preventDefault();
				$('.tabs-menu .c-active', $holder).removeClass('c-active');
				$(this).addClass('c-active');
				_showTab($(this).attr('href'), tabPages);
			})
			
			if(i==0) {
				$tabItem.addClass('c-active');
				_showTab($tabItem.attr('href'), tabPages);
			}
			
		}	
		_handlers();
	},
	
	_handlers = function(){
	}
	
	_updateSettings = function(event, type){
		var wrapperTabs = $('.tabs-pages');
		var inputs = wrapperTabs.find('input');
		var selects = wrapperTabs.find('select');
		var objInput = {};
		var objSelect = {};
		  
		
		if(type=="save"){
		  console.log('save');
		  console.log(inputs);
		  console.log(selects);	
		}else if(type=="reset"){
	     
	    }
	},

	_showTab = function(tabName, tabPages) {
		var tabRealName = tabName.substring(1, tabName.length) + '-tab';		
		$('.active-tab', tabPages).removeClass('active-tab');
		$('.' + tabRealName, tabPages).addClass('active-tab');
	}
	/*End Tab*/	

	_afterRender = function() {
		$(function(){			
			_handlerTabs();			
           //Zero.Tools.CheckboxUpdate({elems:$('.checkbox')});
           //Zero.Tools.selectUpdate($('.dropdown'));			
		})
	};
	
	m.init = function() {		
		_getCalendars();		
		_afterRender();		
	}
	return m;
}(Zero));