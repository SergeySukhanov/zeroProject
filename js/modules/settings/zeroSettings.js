Zero.Settings = (function(module){
	var m = {};
	var calendarValues = [];
    var tokkens = module.getTokens();
	var settings = {}
	
	_createTabs = function() {
	
		var holder = $('.settings-content'),	
			buttonHolder = $('<div />').addClass('button-holder'),
			btSave = $('<button />').addClass('bt-save').text('Save');


			
		_createPersonalTab();
		_createTimeTab();
		// _createImportTab();

		// _createUnitTab();

		_createCalendarTab();
        _loadSettings();
			
	    Zero.Tools.CheckboxUpdate({elems:$('.checkbox')});
	    Zero.Tools.selectUpdate($('.dropdown'));

        Zero.GoogleAccount.init($('.tabs-pages .account-tab'));

		btSave.appendTo(buttonHolder);
		buttonHolder.appendTo(holder);
		
		btSave.bind('click', function(event){
			_updateSettings(event, "save");
		});
	}
	
	_createPersonalTab = function() {
        var genderValues = [
            {'Male' : 'male'},
            {'Female' : 'female'}
        ];

        var holder = $('.tabs-pages .personal-tab'),
			// fName = _createFormRowHtml('name', 'Name', 'string'),

			fUserName = _createFormRowHtml('username', 'Username', 'string'),
			fEmail = _createFormRowHtml('mail', 'E-mail', 'string'),
			fHeight = _createFormRowHtml('height', 'Height', 'string'),
			fWeight = _createFormRowHtml('weight', 'Weight', 'string'),
			fBirthday = _createFormRowHtml('birthday', 'Birthday', 'jq-datepicker'),
            fGender = _createFormRowHtml('gender', 'Gender', 'dropdown', genderValues);

			
		// fName.appendTo(holder);

		fUserName.appendTo(holder);
		fEmail.appendTo(holder);
		fHeight.appendTo(holder);
		fWeight.appendTo(holder);
		fBirthday.appendTo(holder);
        fGender.appendTo(holder);
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
				{'Sunday' : "SUNDAY"},
				{'Monday' : "MONDAY"}
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
	
	
	_getCalendarsSettings = function() {
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
	},

    _renderSettings = function(data){
        settings = data.result;

        if (settings.username){
            $('#username').val(settings.username);
        }

        if(settings.email){
            $('#mail').val(settings.email);
        }

        if(settings.height){
            $('#height').val(settings.height);
        }

        if(settings.weight){
            $('#weight').val(settings.weight);
        }

        if (settings.firstDayOfWeek)
        {
            $('#weekStarts').val(settings.firstDayOfWeek).change();
        }

        if (settings.birthDate)
        {
            var date = new Date(settings.birthDate*1000);
            var month = date.getMonth() + 1;
            $('#birthday').val(month + "/" + date.getDate() + "/" + date.getFullYear());
        }

        if (settings.gender){
            $('#gender').val(settings.gender).change();
        }

        if (settings.visibleCalendarIds && settings.visibleCalendarIds.length == 3)
        {
            $('#primaryCalendar').val(settings.visibleCalendarIds[0]).change();
            $('#secondaryCalendar').val(settings.visibleCalendarIds[1]).change();
            $('#thirdCalendar').val(settings.visibleCalendarIds[2]).change();
        }

        if(settings.timeZoneOffsets && settings.timeZoneOffsets.primary){
            $('#primary').val(settings.timeZoneOffsets.primary).change();
        }

        Zero.Tools.selectUpdate($('.dropdown'));
    },

    _updateSettings = function(event, type){
         if(type=="save"){
            _saveSettings();
        } else if(type=="reset"){
           //console.log('reset');
        }
    },

     _loadSettings = function() {
         $.ajax({
             beforeSend: function (request) {
                 request.setRequestHeader("Access-Token", tokkens.accessToken);
             },
             url: initConfiguration.urlSettings,
             type: 'GET',
             dataType: 'json',
             contentType: "application/json",
             success: function (data) {
                 _renderSettings(data);
             },
             error : function(error) {
                 console.log(error);
             }
         })
     },

     _saveSettings = function() {
         settings.username = $('#username').val();
         //settings.email = $('#mail').val();
         settings.gender = $('#gender').val();
         settings.height = $('#height').val();
         settings.weight = $('#weight').val();
         try{
             var date = new Date($('#birthday').val()).getTime()/1000;
             settings.birthDate = date;
         }catch(ex){
             console.log(ex);
         }
         settings.firstDayOfWeek = $('#weekStarts').val();
         settings.visibleCalendarIds = [$('#primaryCalendar').val(), $('#secondaryCalendar').val(), $('#thirdCalendar').val()];
         var timezone1 = $('#primary').val();
         settings.timeZoneOffsets = { "primary":timezone1 }
         _putSettings(settings);
     }

     _putSettings = function(settings) {
         $.ajax({
             beforeSend: function (request) {
                 request.setRequestHeader("Access-Token", tokkens.accessToken);
             },
             url: initConfiguration.urlSettings + "/" + settings.userId,
             type: 'PUT',
             dataType: 'json',
             contentType: "application/json",
             data : JSON.stringify(settings),
             success: function (resp) {
                 if(resp && resp.code == '1') {
                     var btClose = $('<button />').text('Ok');
                     var popup = Zero.ModalController.getPopup('settingsSaved');
                     btClose.bind('click', function(e){
                         popup.hide();
                     })
                     popup.setHeader('Settings saved');
                     popup.setContent(btClose);
                     popup.show();
                 }
             },
             error : function(error) {
                 console.log(error);
             }
         })
     };
	
	m.init = function() {
		_getCalendarsSettings();		
		_afterRender();
	}
	return m;
}(Zero));