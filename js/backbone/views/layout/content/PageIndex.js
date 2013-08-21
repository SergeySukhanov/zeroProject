var PageIndex = Backbone.View.extend({
    template:'content/index',
    partials:[],
    configs:{},
    actions:{},
    initialize:function () {
        this._initConfigs();
        this.render();
    },
    _initConfigs:function () {
        
    },
       
    render:function () {
        var $main = this;
        TemplateManager.get({mainTemplate:this.template, partials:this.partials}, function (tmp) {
            var html = tmp($main.configs);
            $main.$el.html(html);
        });
    }
});