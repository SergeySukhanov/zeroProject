var ZERO = ZERO || {};
// ZERO.App = new App();

//mock JS console if it's not available.
if ("undefined" == typeof window.console) {
    window.console = {
        "assert":function () {
        },
        "count":function () {
        },
        "clear":function () {
        },
        "debug":function () {
        },
        "dir":function () {
        },
        "dirxml":function () {
        },
        "info":function () {
        },
        "error":function () {
        },
        "getFirebugElement":function () {
        },
        "group":function () {
        },
        "groupEnd":function () {
        },
        "groupCollapsed":function () {
        },
        "log":function () {
        },
        "notifyFirebug":function () {
        },
        "profile":function () {
        },
        "profileEnd":function () {
        },
        "time":function () {
        },
        "timeEnd":function () {
        },
        "trace":function () {
        },
        "warn":function () {
        },
        "userObjects":[],
        "element":{},
        "firebug":"foo"
    };
}

/* Fix IE8 Object.keys */
if (!Object.keys) Object.keys = function (o) {
    if (o !== Object(o))
        throw new TypeError('Object.keys called on non-object');
    var ret = [], p;
    for (p in o) if (Object.prototype.hasOwnProperty.call(o, p)) ret.push(p);
    return ret;
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt, from) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}
if (!Array.prototype.equals) {
    Array.prototype.equals = function (toCompare) {
        return toCompare instanceof  Array && !(this < toCompare || toCompare < this);
    }
}
if (!Array.prototype.swapItems) {
    Array.prototype.swapItems = function (a, b) {
        this[a] = this.splice(b, 1, this[a])[0];
        return this;
    };
}

if (!Array.prototype.findBy) {
    Array.prototype.findBy = function (propertyName, propertyValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i][propertyName] && this[i][propertyName] == propertyValue) {
                return this[i];
            }
        }
        return null;
    };
}

Backbone.View.prototype._super = function (funcName) {
    return this.constructor.__super__[funcName].apply(this, _.rest(arguments));
}

if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

//if touch is supported it replaces all click events with touchstart
$.fn.extend({ _on:(function () {
    return $.fn.on;
})() });
$.fn.extend({
    on:(function () {
        var isTouchSupported = 'ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch);
        return function (types, selector, data, fn, one) {
            if (typeof types == 'string' && isTouchSupported && !(types.match(/touch/gi))) types = types.replace(/click/gi, 'touchstart');
            return this._on(types, selector, data, fn);
        };
    }())
});

$.extend({
    getUrlVars:function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar:function (name) {
        return $.getUrlVars()[name];
    }
});

//This handles the queues
(function ($) {

    var ajaxQueue = $({});

    $.ajaxQueue = function (ajaxOpts) {

        var oldComplete = ajaxOpts.complete;

        ajaxQueue.queue(function (next) {

            ajaxOpts.complete = function () {
                if (oldComplete) oldComplete.apply(this, arguments);

                next();
            };

            $.ajax(ajaxOpts);
        });
    };

    var inProgress = {};

    $.ajaxConcurrent = function (url, options) {
        var reqOptions = url, key;
        if (arguments.length === 2) {
            reqOptions = $.extend(true, options, { url:url });
        }
        key = JSON.stringify(reqOptions);
        if (key in inProgress) {
            for (i in {success:1, error:1, complete:1}) {
                inProgress[key][i](reqOptions[i]);
            }
        } else {
            inProgress[key] = $.ajax(reqOptions).always(function () {
                delete inProgress[key];
            });
        }
        return inProgress[key];
    };


})(jQuery);