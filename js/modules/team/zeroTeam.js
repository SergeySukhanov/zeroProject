Zero.Team = (function(module){
	var m = {},
		moduleUrls = {
			team : initConfiguration.apiUrl + 'team',
			userSearch : initConfiguration.apiUrl + 'user'			
		},
		tokkens = module.getTokens(),
		_activePopup = null,
		_activeGroup = null;
		
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
		
		var addGroupButtonHolder = $('<div />'),
			addGroupButton;
		
		if(obj) {
			addGroupButton = $('<button />').addClass('edit-group-button').text('Edit Group');		
			addGroupButton.bind('click', function(e){
				_editGroup(obj, html, e)
			})				
		} else {
			addGroupButton = $('<button />').addClass('add-group-button').text('Add Group');		
			addGroupButton.bind('click', function(e){
				_addGroup(html, e)
			})		
		}
		
		addGroupButton.appendTo(addGroupButtonHolder);
		addGroupButtonHolder.appendTo(html);
		
		
		return html;	
	};	

	_addGroup = function(popup, e) {
		var obj = {};
		obj.name = $('#groupName', popup).val();
		obj.description = $('#groupDescription', popup).val();	
		obj.members = $('#participiantsHolder', popup).data('members');		
		m.addGroupAction(obj, popup, e);
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
			
			html.bind('click', function(e){
				if(html.hasClass('active-item')){
					return;
				} else {
					_setActiveGroup(html, obj);								
				}
				e.preventDefault();
			})
			
			return html;
	}
	
	_setActiveGroup = function(group, obj) {
		var parent = group.closest('.group-list');
		$('.active-item ', parent).removeClass('active-item');
		group.addClass('active-item');
		_viewGroupTabs(group, obj);		
	}
	
	_groupsTabsHandlers = function(holder) {	
		$('ul li a', holder).bind('click', function(e){
			var name = $(this).attr('href').substring(1, $(this).attr('href').length);
			$('ul li a.active', holder).removeClass('active');
			$(this).addClass('active');
			$('.block-tab', holder).hide();			
			$('.' + name + '-block', holder).show();		

			if(name == 'team-messages') {
				_chatInit(_activeGroup);
			}
			
			
			e.preventDefault();			
		})	
	}
	
	_viewGroupTabs = function(group, obj) {
		var messages = obj.messages,
			members = obj.members,
			holder = $('.group-window'),
			membersblock = $('.team-members-block', holder),
			infoblock = $('.team-info-block', holder),
			messageblock = $('.team-messages-block', holder),
			memberList = $('<div />').addClass('memebers-list'),
			messageChat = $('<div />').attr('id', 'chat_' + obj.id).addClass('chat-window');
			messageInput = $('<input/>').attr({
					'type' : 'text',
					'class' : 'chat_message'
				})
				
			messageSend = $('<button />').addClass('send_to_chat').text('Send'),
			messageHolder = $('<div />').attr('id', 'chatHolder_' + obj.id).addClass('chatLog');
			_activeGroup = obj;
			

			
			
			membersblock.html('')
			
			if(members && members.length !=0) {
				memberList.html(_createMemberList(obj.members, obj.owner));
			} else {
				memberList.html('<p>No members in group');
			}
			if(messages && messages.length !=0) {
				
			} else {
				//messageblock.html('<p>No messages in group</p>');
			}			
			
			messageChat.appendTo(messageHolder);
			messageInput.appendTo(messageHolder);
			messageSend.appendTo(messageHolder);
			
			messageHolder.appendTo(messageblock);
			
			memberList.appendTo(membersblock);
			infoblock.html('<p>Deleting a group will remove all associated messages and upcoming associated events. Contacts will not be deleted.');	

			
			if(obj.owner == initConfiguration.settingsData.userId) {
				var deleteBt = $('<button />').addClass('remove-button').text('Delete group');
				var editBt = $('<button />').addClass('edit-button').text('Edit group')
				
				editBt.appendTo(infoblock);				
				deleteBt.appendTo(infoblock);
				
				deleteBt.bind('click', function(e){
					_removeGroup(obj, $(this));
					e.preventDefault();
				});
				
				editBt.bind('click',function(e) {
					_activePopup.hide()
					m.showGroupPopup(obj, 'edit');					
					e.preventDefault();
				})
				
				
			}
						
			$('.block-tab', holder).hide();
			
			infoblock.show();
			
			$('ul li a.active', holder.parent()).removeClass('active');
			$('a.team-info', holder.parent()).addClass('active');
			
			holder.css('display', 'inline-block');
		
	}
	
	_createMemberList = function(arr, owner) {
		var html = $('<ul />');
		for(var i=0; i < arr.length; i++) {
			var item = $('<li />'),
				name = $('<span />').addClass('person-name'),
				mail = $('<span />').addClass('person-mail');
				
			if(arr[i].name) {
				name.text(arr[i].name + ' (');
				name.appendTo(item)
				mail.text(arr[i].email + ')')			
			} else {
				mail.text(arr[i].email)			
			}				
			
			mail.appendTo(item)
			
			/*
			if(owner == initConfiguration.settingsData.userId && initConfiguration.settingsData.userId != arr[i].userId) {
				var a = $('<a />').attr({
						'href' : '#',
						'class' : 'remove-member-icon'
					}).text('remove');
				a.appendTo(item);	
				
				a.bind('click', function(e) {
				
				})
			}
			*/
			
			item.appendTo(html)			
		}
		
		return html;
	
	}
	
	/*Remove popup*/
	
	_removeGroup = function(obj, bt) {
		var info = $('<div />').addClass('remove-info').html('<p>Do you realy want to delete Group "' + obj.name + '" ?</p>'),
			btYes = $('<button />').text('Confirm'),
			btNo = $('<button />').text('No');
			
		btYes.appendTo(info);
		btNo.appendTo(info);
		info.insertAfter(bt);

		btYes.bind('click', function(e){
			_deleteGroupAction(obj.id, obj.name);
			e.preventDefault();
		})		
		
		btNo.bind('click', function(e){
			info.remove();
			e.preventDefault();
		})		
	} 
	
	_deleteActiveGroup = function() {
		var holder = $('#groupPopup');
		$('.group-list .active-item', holder).remove();
		$('.group-window').hide();		
	}

	
	m.getUserGroups = function(callback) {
		$.ajax({
			url: moduleUrls.team,
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			success: function (resp) {	
				if(callback) {
					callback.apply(resp.result);
				} else {
					//_drawUserGroups(resp.result);	
				}
				
			},
			error : function(error) {
				console.log(error);
			}
		})			
	};
	
	m.addGroupAction = function(groupObj, popup, e) {
		//groupObj - group json
		$.ajax({
			url: moduleUrls.team,
			type: 'POST',
			dataType: 'json',
			contentType: "application/json",			
			data : JSON.stringify(groupObj),
			success: function (resp) {		
				Zero.Tools.generateNoty('success', 'Group "' + groupObj.name + '" successfully created');
				_activePopup.hide();				
			},
			error : function(error) {
				console.log(error);
			}
		})			
	}
	
	_deleteGroupAction = function(groupId, groupName) {
		$.ajax({
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
				_deleteActiveGroup();
				//m.getUserGroups();
			},
			error : function(error) {
				console.log(error);
			}
		})	
	}
	
	m.updateGroupAction = function(groupObj, popup, e) {
	
		$.ajax({
			url: moduleUrls.team + '/' + groupObj.id,
			type: 'PUT',
			dataType: 'json',
			contentType: "application/json",			
			data : JSON.stringify(groupObj),
			success: function (resp) {		
				_activePopup.hide();
				Zero.Tools.generateNoty('success', 'Group "' + groupObj.name + '" was successfully updated');		
				//m.getUserGroups();
			},
			error : function(error) {
				console.log(error);
			}
		})		
	}
	
	m.getUserOwnerGroups = function(callback) {
		$.ajax({
			url: moduleUrls.team,
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			success: function (resp) {	
				var obj = [];
				if(resp && resp.result) {
					for(var i=0; i<resp.result.length; i++) {
						if(resp.result[i].owner == initConfiguration.settingsData.userId) {
							obj.push(resp.result[i])	
						}
					}
				}			
				callback.apply(obj);	
			},
			error : function(error) {
				console.log(error);
			}
		})	
	}
	
	
	m.init = function() {
		m.getUserGroups();
	}
	
	_groupHolder = null;
	
	
	_drawPopupListGroup = function(obj) {
		_drawPopupGroupListWrapper(this);
	}
	
	_drawPopupGroupListWrapper = function(objList) {
		for(var i=0; i< objList.length; i++) {
			var item = _getGroupHtml(objList[i]);
			item.appendTo(_groupHolder);
		}		
	}
	
	_getUserGroupsWrapper = function() {
		var html = $('<div />').addClass('group-holder'),
			groupList = $('<div />').addClass('group-list'),
			groupInfo = $('<div />').addClass('group-window'),
			groupNav = $('<ul />').addClass('team-nav'),
			groupNavHtml = '<li><a href="#team-messages" class="team-messages">Messages</a></li>'  
						+ '<li><a href="#team-members" class="team-members">Members</a></li>' 
						+ '<li><a href="#team-info" class="team-info">Info</a></li>';
			groupTabs = $('<div />').addClass('group-tabs');			
			tabsHtml = '<div class="team-messages-block block-tab"></div>'
					 + '<div class="team-members-block block-tab"></div>'
					 + '<div class="team-info-block block-tab"></div>'	
						
			
			groupNav.html(groupNavHtml);
			groupNav.appendTo(groupInfo);
			
			groupTabs.html(tabsHtml);
			groupTabs.appendTo(groupInfo);
			
			
			
		_groupHolder = groupList;
		m.getUserGroups(_drawPopupListGroup);
		groupList.appendTo(html);
		groupInfo.appendTo(html);
		
		return html;
	}
	
	m.showGroupPopup = function(groupObj, mode) {
		var addTab = _getCreateGroupHtml(groupObj),
			listTab = _getUserGroupsWrapper(),
			popup = Zero.ModalController.getPopup('groupPopup'),
			toolbar = $('<div />').addClass('group-menu'),
			addItem = $('<a />').attr({
					'href' : '#',
					'class' : 'add-icon'
				}).text('Add Group'),
			listItem = $('<a />').attr({
					'href' : '#',
					'class' : 'list-icon'
				}).text('List Group'),
			popupContent = $('<div />').addClass('popup-tabs-holder');

			addTab.appendTo(popupContent);
			listTab.appendTo(popupContent);
			
			addItem.appendTo(toolbar);	
			listItem.appendTo(toolbar);	
			
			
			if(mode == 'add') {
				listTab.hide();
				addItem.addClass('active');
				popup.setHeader('New group');
			}
			if(mode == 'edit') {
				listTab.hide();
				popup.setHeader('Edit group');
				addItem.addClass('active');
			}			
			
			listItem.bind('click', function(e){
				addItem.removeClass('active');
				$(this).addClass('active');
				listTab.show();
				addTab.hide();
				popup.setHeader('Groups List');
				e.preventDefault();
			})
			addItem.bind('click', function(e){
				listItem.removeClass('active');
				$(this).addClass('active');			
				listTab.hide();
				addTab.show();
				popup.setHeader('New Group');
				e.preventDefault();
			})			
			
			
			_groupsTabsHandlers(listTab);
			
			
			popup.setWidth(800);				
			popup.setToolbar(toolbar);
			popup.setContent(popupContent);
			popup.show();
			
			_activePopup = popup;
			
	
	
	}
	
	/*Chat section*/
	_chatInit = function(group) {
		var activeLog = $('#chat_' + group.id);
		var log = {
			print: function(s) {
				activeLog.append('<div>'+s+'</div>').get(0).scrollTop += 100;
			}		
		}	
		var sendBt = $('.send_to_chat', activeLog.parent());
		
		$('.chatLog').hide();
		activeLog.parent().show();
		
		

		
		var chat = {
			
			onSuccess: function(data) {
				if(data && data.textMessageNotification) {
					var message = data.textMessageNotification;
					log.print(message.userName + ': ' + message.text);	
				}						
			},			
			
			onCompleteRead: function(xhr) {							
				if (xhr.status == 200) {
					chat.Read();
				} else {
					setTimeout(chat.Read, 5000);
				}
			},			
			
			Connect: function() {
				chat.Read(true);					
			},			
			
			Send: function() {
				var data = $.trim($('.chat_message', activeLog.parent()).val());
				var obj = {'textMessageRequest' : {'teamId' : group.id , 'text' : data}}
				
				
				
				if (!data) {
					return;
				}
				$.ajax({
					url : initConfiguration.chatUrl,
					type: 'post', 
					dataType: 'json', 					
						data: JSON.stringify(obj),							
						success: function() {
							log.print('I wrote: ' + data);
						},
						complete: function() {
							
						}
					});
					
				$('.chat_message', activeLog.parent()).val('');
			},			
			
			Read : function(firstTime) {
				var sendData = {
					'longPooling' : ''
				}
				chat.read = $.ajax({	
					url : initConfiguration.chatUrl,
					type: 'post', 
					dataType: 'json', 
					timeout : 600000,				
					data: JSON.stringify(sendData),
					success: chat.onSuccess,
					complete: chat.onCompleteRead
				});
				
				if(firstTime) {
					var sendData = {
						'identificationMessageRequest' : {'token' : tokkens.accessToken}
					}
					$.ajax({	
						url : initConfiguration.chatUrl,
						type: 'post', 
						dataType: 'json', 
						data: JSON.stringify(sendData),
						success: function(){
						
						},
						complete: function(){
						
						}
					});											
				}				
			}
		}
		
		sendBt.bind('click', function() {
			chat.Send();
		})				
		
		chat.Connect();
		
		
	}
	
	return m
	
}(Zero));