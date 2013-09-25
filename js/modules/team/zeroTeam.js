Zero.Team = (function(module){
	var m = {},
		moduleUrls = {
			team : initConfiguration.apiUrl + 'team',
			userSearch : initConfiguration.apiUrl + 'user'			
		},
		tokkens = module.getTokens();
		
		
	_getCreateGroupHtml = function(e) {
		var html = $('<div />').addClass('create-group-holder'),			
			name = $('<input />').attr({
				'type' : 'text',
				'value' : '',
				'id' : 'groupName',
				'placeholder' : 'Group name'				
			}),
			description = $('<input />').attr({
				'type' : 'text',
				'value' : '',
				'id' : 'groupDescription',
				'placeholder' : 'description (optional)'
			}),
			subheader = $('<div />').addClass('title').text('Group Participiants'),
			participiantsHolder = $('<div />').attr('id', 'participiantsHolder'),
			searchInput = $('<input />').attr({
				'name' : 'searchCriteria',
				'id' : 'searchCriteria',
				'placeholder' : 'type user name or email'
			})
			addButton = $('<button />').addClass('add-button').text('add participiants');

		name.appendTo(html);
		description.appendTo(html);
		subheader.appendTo(html);
		participiantsHolder.appendTo(html);
		participiantsHolder.data('members', new Array());
		searchInput.appendTo(html);
		addButton.appendTo(html);
		
        searchInput.autocomplete({
            serviceUrl: moduleUrls.userSearch,
            params: {
				'token' :  tokkens.accessToken
            },
            paramName: 'search',
            minChars: 3,
            position: 'absolute',
            dataType: 'json',
            type: 'GET',
            autoSelectFirst: false,
            transformResult: function(response) {
                return {
                    suggestions: $.map(response.result, function(dataItem) {
                        return { value: dataItem.name +' ('+ dataItem.email + ')', data: dataItem };
                    })
                };
            },
            onSelect: function (suggestion) {
				var item = $('<div />').text(suggestion.data.name + ' (' + suggestion.data.email + ')');
				var arr = participiantsHolder.data('members');				
				item.appendTo(participiantsHolder);
				arr.push(suggestion.data);
                searchInput.val('');
            }
        });		
		
		
		addButton.bind('click', function(e){
			var val = $('#searchCriteria').val();
			
			if(val.length <= 0) return;
			
			var item = {
				'email' : $('#searchCriteria').val()
			}, 
			arr = participiantsHolder.data('members'),
			view = $('<div />').text($('#searchCriteria').val());
			view.appendTo(participiantsHolder);	
			arr.push(item);			
			$('#searchCriteria').val('');
		})
			
		return html;	
	};	
	
	
	
	
	
	
	m.addGroupPopup = function() {
	
		var popup = Zero.ModalController.getPopup('addGroupPopup'),				
			footer = $('<div />').addClass('groupPopupFooter'),
			addBt = $('<button />').text('Done');
			addBt.appendTo(footer);

			popup.setWidth(600);	
			popup.setHeader('Create a new group');
			popup.setContent(_getCreateGroupHtml());
			popup.setFooter(footer);
			popup.show();
			
			addBt.bind('click', function(e){
				_addGroup(popup, e);
			})
	};
	
	
	_addGroup = function(popup, e) {
		var obj = {};
		obj.name = $('#groupName', popup).val();
		obj.description = $('#groupDescription', popup).val();	
		obj.members = $('#participiantsHolder', popup).data('members');		
		m.addGroupAction(obj, popup, e);
	}
	
	
	m.getUserGroups = function() {
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Access-Token", tokkens.accessToken);
			},				
			url: moduleUrls.team,
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			success: function (resp) {		
				console.warn(resp);
			},
			error : function(error) {
				console.log(error);
			}
		})			
	};
	
	m.addGroupAction = function(groupObj, popup, e) {
		//groupObj - group json
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Access-Token", tokkens.accessToken);
			},				
			url: moduleUrls.team,
			type: 'POST',
			dataType: 'json',
			contentType: "application/json",			
			data : JSON.stringify(groupObj),
			success: function (resp) {		
				if(popup && popup.hide) {
					popup.hide(e);
				}			
				Zero.Tools.generateNoty('success', 'Group "' + groupObj.name + '" successfully created');
				
			},
			error : function(error) {
				console.log(error);
			}
		})			
	}
	
	m.deleteGroupAction = function(groupId) {
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Access-Token", tokkens.accessToken);
			},				
			url: moduleUrls.team + '/' + groupId,
			type: 'DELETE',
			dataType: 'json',
			contentType: "application/json",			
			data : {
				id : groupId
			},
			success: function (resp) {		
			
			
			},
			error : function(error) {
				console.log(error);
			}
		})	
	}
	
	m.updateGroupAction = function(groupObj, groupId) {
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Access-Token", tokkens.accessToken);
			},				
			url: moduleUrls.team + '/' + groupId,
			type: 'PUT',
			dataType: 'json',
			contentType: "application/json",			
			data : JSON.stringify(groupObj),
			success: function (resp) {		
			
			
			},
			error : function(error) {
				console.log(error);
			}
		})		
	}
	
	
	
	
	return m
	
}(Zero));