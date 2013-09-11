
function Equalizer(options){
	var view = this,
	    _currentId,
	    _currentEl,
	    config = {
	    	el:$('.'+options.el)
	    },
	    
	    _render = function(id, el){
	    	_currentId = id;
	    	_currentEl = el;
	    	_createSlider();
	    },
	    
	    _createSlider = function(){
	    	var mainLayout = $('<div/>');
	    	var leftArrow = $('<>')
	    },
	    
	    _handlers = function(){
	    	
	    };
	    
	    view.init = function(elems){
	    	$('.'+elems).each(function(index, elem){
	    		_render(index, elem);
	    	})
	    }
	    
	    view.init(options.el);
}
