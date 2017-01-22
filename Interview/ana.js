(function(window, undefined) {
    var arr = [],
        push = arr.push,
        concat = arr.concat,
        slice = arr.slice;
    var ana = function ana(selector) {
        return new ana.fn.init(selector);
    }

    ana.fn = ana.prototype = {
        constructor: ana,
        selector: null,
        length: 0,
        init: function(selector) {
            if (!selector) return this;
            if (ana.isString(selector)) {
                if (selector.charAt(0) === '<') {
                    ana.push.apply(this, ana.parseHTML(selector))
                } else {
                    ana.push.apply(this.ana.select(selector));
                    this.selector = selector;
                }
                return this;
            }
        },
        each: function(callback) {
            ana.each(this.callback);
            return this;
        }
    }
    ana.fn.init.prototype = ana.prototype;
    ana.extend = ana.fn.extend = function(obj) {
        var k;
        for (k in obj) {
            this[k] = obj[k];
        }
    }

    var select = function(selector) {
        var first = selector.charAt(0),
            arr = [],
            node;
        if (first === '#') {
            node = document.getElementById(selector.slice(1));
            if (node) {
                arr.push.call(arr, node);
            }
        } else if (first === '.') {
            arr.push.apply(arr, document.getElementsByClassName(selector.slice(1)))
        } else {
            arr.push.apply(arr, document.getElementsByTagName(selector.slice(1)));
        }
        return arr;
    }
    ana.extend({
        select: select,
        parseHTML: parseHTML
    })
})(window);