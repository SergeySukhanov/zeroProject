Zero.Team = (function(module){
	var m = {},
		moduleUrls = {
			team : initConfiguration.apiUrl + 'team',
			userSearch : initConfiguration.apiUrl + 'user'			
		},
		tokkens = module.getTokens();
		
		
	_getUserLine = function(obj, holder) {
		var item = $('<div />'),
			deleteLink = $('<button />').text('remove');
		
		if(obj.name) {
			item.text(obj.name + ' (' + obj.email + ')')	
		} else {
			item.text(obj.email)	
		}
			
		deleteLink.appendTo(item);					
		item.appendTo(holder);
		
		deleteLink.bind('click', function(e){
			_removeUser(obj, holder, item);
		});
	}
	
	_removeUser = function(obj, holder, htmlItem) {
		var arr = holder.data('members');		
		var index = arr.indexOf(obj);
		arr.splice(index,1)		
		$(htmlItem).remove();
	}
		
		
	_editGroup = function(obj, popup, e) {
		obj.name = $('#groupName', popup).val();
		obj.description = $('#groupDescription', popup).val();	
		obj.members = $('#participiantsHolder', popup).data('members');		
		m.updateGroupAction(obj, popup, e);
	};	
		
		
		
	_getCreateGroupHtml = function(obj) {
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

			
		participiantsHolder.data('members', new Array());	
			
		if(obj) {
			if(obj.name) name.val(obj.name);
			if(obj.description) description.val(obj.description);			
			if(obj.members) {
				participiantsHolder.data('members', obj.members);
				for(var i=0; i<obj.members.length; i++) {				
					_getUserLine(obj.members[i], participiantsHolder);					
				}
			}	
		}	
			
			
		name.appendTo(html);
		description.appendTo(html);
		subheader.appendTo(html);
		participiantsHolder.appendTo(html);
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
	};

	/*Group List*/
	_drawUserGroups = function(obj) {
		var holder = $('#teamList .teamList-holder');
		holder.html('');
		for(var i=0; i < obj.length; i++) {
			if(obj[i].active) {
				var item = _getGroupHtml(obj[i]);
				item.appendTo(holder);
			}	
		}
		
		_groupsTabsHandlers();
	};
	
	_getGroupHtml = function(obj) {
		var html = $('<div />').addClass('group-item'),
			title = $('<h2 />').text(obj.name),
			description = $('<div />').addClass('group-desc').text(obj.description),
			userId = initConfiguration.settingsData.userId,
			linksHolder = $('<div />').addClass('actions'),
			removeLink = $('<a />').attr({
					'href' : '#',
				}).text('delete'),
			editLink = $('<a />').attr({
					'href' : '#',
				}).text('edit');
			
			html.data('group-id', obj.id);	
			html.data('group-members', obj.members);
			title.appendTo(html);
			description.appendTo(html);
			
			
			//Edit
			if(userId === obj.owner) {
				removeLink.appendTo(linksHolder);
				
				removeLink.bind('click', function(e){				
					_showRemovePopup(obj.id, obj.name)
					e.preventDefault();
				})
				
				editLink.appendTo(linksHolder);
				editLink.bind('click', function(e){

				var popup = Zero.ModalController.getPopup('addGroupPopup'),				
					footer = $('<div />').addClass('groupPopupFooter'),
					addBt = $('<button />').text('Update');
					addBt.appendTo(footer);

					popup.setWidth(600);	
					popup.setHeader('Edit group');
					popup.setContent(_getCreateGroupHtml(obj));
					popup.setFooter(footer);
					popup.show();
					
					addBt.bind('click', function(e){
						_editGroup(obj, popup, e);
					})				
					
					
					e.preventDefault();
				})									
				linksHolder.appendTo(html)				
			}
			//Edit End
			
			

			
			
			html.bind('click', function(e){
				_setActiveGroup(html, obj);
				e.preventDefault();
			})
			
			return html;
	}
	
	_setActiveGroup = function(group, obj) {
		var parent = group.closest('.teamList-holder');
		$('.active-item ', parent).removeClass('active-item');
		group.addClass('active-item');
		
		_viewGroupTabs(group, obj);
		
	}
	
	_groupsTabsHandlers = function() {
		var holder = $('.team-info');
			
		$('ul li a', holder).bind('click', function(e){
			var name = $(this).attr('href').substring(1, $(this).attr('href').length);
			$('ul li a.active', holder).removeClass('active');
			$(this).addClass('active');
			$('.block-tab', holder).hide();			
			$('.' + name + '-block', holder).show();			
			e.preventDefault();			
		})	
			
		
		
	}
	
	_viewGroupTabs = function(group, obj) {
		var messages = obj.messages,
			members = obj.members,
			holder = $('.team-info'),
			membersblock = $('.team-members-block', holder),
			infoblock = $('.team-info-block', holder),
			messageblock = $('.team-messages-block', holder),
			memberList = $('<div />').addClass('memebers-list');
			
			membersblock.html('')
			
			if(members && members.length !=0) {
				memberList.html(_createMemberList(obj.members));
			} else {
				memberList.html('<p>No members in group');
			}
			if(messages && messages.length !=0) {
				
			} else {
				messageblock.html('<p>No messages in group');
			}			
			
			memberList.appendTo(membersblock);
			infoblock.html('<p>Deleting a group will remove all associated messages and upcoming associated events. Contacts will not be deleted.');	

			$('.block-tab', holder).hide();
			infoblock.show();
			
			$('ul li a.active', holder.parent()).removeClass('active');
			
			
			
			$('a.team-info', holder.parent()).addClass('active');
			
			holder.css('display', 'inline-block');
		
	}
	
	_createMemberList = function(arr) {
		var html = $('<ul />');
		for(var i=0; i < arr.length; i++) {
			var item = $('<li />'),
				name = $('<span />').addClass('person-name'),
				mail = $('<span />').addClass('person-mail');
				
			if(arr[i].name) {
				name.text(arr[i].name);
				name.appendTo(item)
			}				
			mail.text(arr[i].email)			
			mail.appendTo(item)
			item.appendTo(html)			
		}
		
		return html;
	
	}
	
	/*Remove popup*/
	_showRemovePopup = function(groupId, groupName) {
		var popup = Zero.ModalController.getPopup('removeGroupPopup'),
			content = $('<div />').html('<p>Do you realy want to delete Group "' + groupName + '" ?</p>'),
			actionsHolder = $('<div />').addClass('actionHolder'),
			btYes = $('<button />').text('Confirm'),
			btNo = $('<button />').text('No');
						
			btYes.appendTo(actionsHolder);
			btNo.appendTo(actionsHolder);
			actionsHolder.appendTo(content);
			
			
			btYes.bind('click', function(e){
				popup.hide();
				_deleteGroupAction(groupId, groupName);
				e.preventDefault();
			})
			
			btNo.bind('click', function(e){
				popup.hide();
				e.preventDefault();
			})

			popup.setWidth(600);	
			popup.setHeader('Delete group');
			popup.setContent(content);
			popup.show();
	
	
	

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
				_drawUserGroups(resp.result);	
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
				m.getUserGroups();
				
			},
			error : function(error) {
				console.log(error);
			}
		})			
	}
	
	_deleteGroupAction = function(groupId, groupName) {
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Access-Token", tokkens.accessToken);
			},				
			url: moduleUrls.team + '/' + groupId,
			type: 'DELETE',
			dataType: 'json',
			contentType: "application/json",			
			data : JSON.stringify({
				'id' : groupId,
				'name' : groupName
			}),
			success: function (resp) 	{		
				Zero.Tools.generateNoty('success', 'Group "' + groupName + '" was successfully deleted');	
				m.getUserGroups();
			},
			error : function(error) {
				console.log(error);
			}
		})	
	}
	
	m.updateGroupAction = function(groupObj, popup, e) {
	
		$.ajax({
			beforeSend: function (request) {
				request.setRequestHeader("Access-Token", tokkens.accessToken);
			},				
			url: moduleUrls.team + '/' + groupObj.id,
			type: 'PUT',
			dataType: 'json',
			contentType: "application/json",			
			data : JSON.stringify(groupObj),
			success: function (resp) {		
				popup.hide();
				Zero.Tools.generateNoty('success', 'Group "' + groupObj.name + '" was successfully updated');		
				m.getUserGroups();
			},
			error : function(error) {
				console.log(error);
			}
		})		
	}
	
	
	m.init = function() {
		m.getUserGroups();
	}
	
	return m
	
}(Zero));