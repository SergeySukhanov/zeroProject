function ConstructorForm(){
    var view = this,

        config = {

        };


    view.simpleTextField = function(options){
        var settings = {
            data:options.data,
            blurHandler:options.blur,
            focusHandler:options.focus,
            keyHandler:options.key
        };

        var wrapperField = $('<div/>').addClass('row').addClass(settings.data.fieldType).attr('fieldType', settings.data.fieldType);

        if(settings.data.label != null){
            var label = $('<label/>').attr({
                'for':settings.data.id
            })
                .text(settings.data.label);
        }

        var input = $('<input/>').attr({
            'id':settings.data.id,
            'type':settings.data.type,
            'placeholder':settings.data.placeholder
        });

        var error = $('<div/>').addClass('error').attr('id', settings.data.error);
        var errorLabel = $('<span/>').addClass('error-label');
        var errorMessage = $('<span/>').addClass('error-message');
        error.append(errorLabel);
        error.append(errorMessage);

        wrapperField.append(label);
        wrapperField.append(input);
        wrapperField.append(error);


        input.on('focus', function(event){
            settings.focusHandler(event);
        })
            .on('blur', function(event){
                settings.blurHandler(event);
            })
            .on('keyup', function(event){
                settings.keyHandler(event);
            });

        return wrapperField;
    };

    view.multiFieldText = function(options){
        var settings = {
            data:options.data,
            blurHandler:options.blur,
            focusHandler:options.focus,
            keyHandler:options.key
        };

        var wrapperField = $('<div/>').addClass('multi-row').addClass(settings.data.fieldType).attr('fieldType', settings.data.fieldType);
        var dataList = settings.data.listItem;

        for(var i=0; i<dataList.length; i++){
            var field =  view.simpleTextField({
                data:dataList[i],
                blur:settings.blurHandler,
                focus:settings.focusHandler,
                key:settings.keyHandler
            });

            wrapperField.append(field);
        }

        return wrapperField;

    };

    view.simpleRadioField = function(options){
        var settings = {
            data:options.data,
            changeHandler:options.change
        };

        var wrapperField = $('<div/>').addClass('row').addClass(settings.data.fieldType).attr('fieldType', settings.data.fieldType);

        if(settings.data.label != null){
            var label = $('<label/>').attr({
                'for':settings.data.id
            })
                .text(settings.data.label);
        }

        var input = $('<input/>').attr({
            'id':settings.data.id,
            'type':settings.data.type,
            'name':settings.data.name,
            'value':settings.data.value
        });

        var error = $('<div/>').addClass('error').attr('id', settings.data.error);
        var errorLabel = $('<span/>').addClass('error-label');
        var errorMessage = $('<span/>').addClass('error-message');
        error.append(errorLabel);
        error.append(errorMessage);

        wrapperField.append(input);
        wrapperField.append(label);
        wrapperField.append(error);

        input.on('change', function(event){
            settings.changeHandler(event);
        });

        return wrapperField;
    }

    view.multiFieldRadio = function(options){
        var settings = {
            data:options.data,
            changeHandler:options.change
        };

        var wrapperField = $('<div/>').addClass('multi-row').addClass(settings.data.fieldType).attr('fieldType', settings.data.fieldType);
        var dataList = settings.data.listItem;

        for(var i=0; i<dataList.length; i++){
            var field =  view.simpleRadioField({
                data:dataList[i],
                change:settings.changeHandler
            });

            wrapperField.append(field);
        }

        return wrapperField;

    };

    view.simpleButtonField = function(options){
        var settings = {
            data:options.data,
            clickHandler:options.click
        }

        var wrapperField = $('<div/>').addClass('row').addClass(settings.data.fieldType).attr('fieldType', settings.data.fieldType);

        var input = $('<input/>').attr({
            'id':settings.data.id,
            'type':settings.data.type,
            'value':settings.data.value
        });

        wrapperField.append(input);

        input.on('click', function(event){
            settings.clickHandler(event);
        });

        return wrapperField;
    };

    view.multiFieldButton = function(options){
        var settings = {
            data:options.data,
            clickHandler:options.click
        };

        var wrapperField = $('<div/>').addClass('multi-row').addClass(settings.data.fieldType).attr('fieldType', settings.data.fieldType);
        var dataList = settings.data.listItem;

        for(var i=0; i<dataList.length; i++){
            var field =  view.simpleButtonField({
                data:dataList[i],
                change:settings.clickHandler
            });

            wrapperField.append(field);
        }

        return wrapperField;

    };
}
