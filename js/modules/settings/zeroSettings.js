Zero.Settings = (function(module){
	var m = {};
	
	_createTabs = function() {
	
		var holder = $('.settings-content'),	
			buttonHolder = $('<div />').addClass('button-holder'),
			btSave = $('<button />').addClass('bt-save').text('Save'),
			btRevert = $('<button />').addClass('bt-revert').text('Revert');

		_createPersonalTab();
		_createTimeTab();
		_createImportTab();
		_createUnitTab();
			
		btRevert.appendTo(buttonHolder);
		btSave.appendTo(buttonHolder);
		buttonHolder.appendTo(holder);
	
	}
	
	_createPersonalTab = function() {
		var holder = $('.tabs-pages .personal-tab'),
			fName = _createFormRowHtml('name', 'Name', 'string'),
			fUserName = _createFormRowHtml('username', 'Username', 'string'),
			fEmail = _createFormRowHtml('mail', 'E-mail', 'string'),
			fHeight = _createFormRowHtml('height', 'Height', 'string'),
			fWeight = _createFormRowHtml('weight', 'Weight', 'string'),
			fBirthday = _createFormRowHtml('birthday', 'Birthday', 'jq-datepicker');
			
		fName.appendTo(holder);
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
		fSecondary.appendTo(holder);	
		fTravel.appendTo(holder);
			
	};
	
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
					$('<option />').attr('id', obj[key]).text(key).appendTo(el);					
				}
			}
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
		})
	};

	
	m.init = function() {	
		_createTabs();
		//_createPersonalTab();
		_afterRender();		
	}
	return m;
}(Zero));