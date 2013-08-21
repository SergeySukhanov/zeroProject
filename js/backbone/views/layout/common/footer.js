var PageFooter = Backbone.View.extend({
    template:'basic/footer',
    partials:{},
    configs:{},
    actions:{},
    initParams:null,
    initialize:function () {
        this.render();
    },
    _postRender:function () {
     
    },

    render:function () {
        var $main = this;
        TemplateManager.get({mainTemplate:this.template, partials:this.partials}, function (tmp) {
            var html = tmp(this.initParams);
            $main.$el.html(html);
        });
    }
})
