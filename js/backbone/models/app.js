var App = function () {

    if (!App.prototype._instance) {

        var AppModel = Backbone.Model.extend({
            defaults:{
                rootContext:document.location.protocol + '//' + document.location.host + '/',
                user:null,
                session:new Session()
            }
        });

        App.prototype._instance = new AppModel();
    }

    return App.prototype._instance;
};