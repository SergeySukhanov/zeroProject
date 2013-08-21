$(document).ready(function(){
	TemplateManager.setContext(initConfiguration.rootContext+initConfiguration.rootFolder);
	var router = new Router();
	
    var found = Backbone.history.start({hashChange:false, pushState:true, root:initConfiguration.rootFolder});
       if(!found) {
           router.notFound();
       }
});
