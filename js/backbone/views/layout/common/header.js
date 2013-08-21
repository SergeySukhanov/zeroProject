var PageHeader = Backbone.View.extend({
    template:'basic/header',
    partials:[],
    configs:{},
    actions:{},
    initialize:function () {        
        this.render();
    },
    
    _postRender:function(){
    	
    },
    
    render:function () {
        var $main = this;
        TemplateManager.get({mainTemplate:this.template, partials:this.partials}, function (tmp) {
            var html = tmp($main.configs);
            $main.$el.html(html);
        });
    }
});