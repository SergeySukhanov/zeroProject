var Router = Backbone.Router.extend({
    routes:{
        "":"index",
        "index.html":"index",
        "account.html":"account"
        // "login/forgotPassword.html":"forgotPassword",
        // "login/resetPasswordHandler.html":"restorePassword",
        // "login/emailSent.html":"emailSent",
        // "404.html":"notFound",
        // "error.html":"serverError"
    },

    index:function(){
        new Page({
            contentView:PageIndex,
            index:true
        });
    },
    account:function(){
    	new Page({
            contentView:PageAccount,
        });
    },
    
    // forgotPassword:function () {
        // new Page({contentView:PageForgotPassword});
    // },
//     
    // restorePassword:function () {
        // new Page({contentView:PageRestorePassword});
    // },
    
    // emailSent: function() {
        // new Page({contentView:PageEmailSent})
    // },

    notFound: function() {
        new Page({contentView:PageNotFound})
    },
// 
    // serverError: function() {
        // new Page({contentView:PageServerError})
    // },

//        TODO remove this overrided function after full move to backbone. This is stub
    // navigate:function (path, options) {
        // if (options && options.trigger) {
            // window.location = VN.App.get('rootContext') + path;
        // } else {
            // Backbone.Router.prototype.navigate.call(this, path, options);
        // }
    // }
});
