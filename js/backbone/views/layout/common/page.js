var Page = Backbone.View.extend({
    template:'basic/main',
    header:null,
    footer:null,
    configs:{
        localization:null,
        isIndex:null
    },
    contentView:null,
    initialize:function () {
        this.$el = $('body');
        this.contentView = this.options.contentView;
        this.render();
    },
    render:function () {
        var self = this;
        TemplateManager.get({mainTemplate:this.template, partials:this.partials}, function (tmp) {
            var html = tmp(self.configs);
            self.$el.html(html);
            
            self.header = new PageHeader({
                el:'#header',
                routeParams:self.options.routeParams
            });
            
            self.content = new self.contentView({
                el:'#content',
                routeParams:self.options.routeParams
            });
            
            self.footer = new PageFooter({
                el:'#footer',
                routeParams:self.options.routeParams
            });
        });
    }
});
