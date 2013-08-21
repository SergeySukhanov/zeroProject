var BasicContent = Backbone.View.extend({
    template:null,
    configs:{},
    actions:{},
    partials:{},
    initialize:function () {
        this._initActions();
        this._initConfigs();
        this.render();
    },
    _initConfigs:function () {
    },
    _initActions:function () {
    },
    //template in this view is just html and don't need to compile by handlebars
    render:function () {
        var mainObj = this;
        TemplateManager.get({mainTemplate:this.template, partials:this.partials}, function (compile) {
            var html = compile(mainObj.configs);
            mainObj.$el.html(html);
            mainObj._postRender();
        });
    },

    _postRender:function () {
    }
});