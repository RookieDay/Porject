(function(window, undefined) {
    var arr = [],
        push = arr.push,
        slice = arr.slice,
        contact = arr.contact;
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
                    ana.push.apply(this, ana.parseHTML(selector));
                } else {
                    ana.push.apply(this, ana.select(selector));
                    this.selector = selector;
                }
                return this;
            }
            if (ana.isDOM(selector)) {
                this[0] = selector;
                this.length = 1;
                return this;
            }
            if (ana.isana(selector)) {
                return selector;
            }
            if (ana.isLikeArray(selector)) {
                ana.push.apply(this, selector);
                return this;
            }
            if (ana.isFunction(selector)) {
                var oldFn = window.onload;
                if (typeof oldFn === 'function') {
                    window.onload = function() {
                        oldFn();
                        selector();
                    };
                } else {
                    window.onload = selector;
                }
            }
        },
        each: function(callback) {
            ana.each(this, callback);
            return this;
        }
    };


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
            } else {
                return null;
            }
        } else if (first === '.') {
            arr.push.apply(arr, document.getElementsByClassName(selector.slice(1)));
        } else {
            arr.push.apply(arr, document.getElementsByTagName(selector.slice(1)));
        }
        return arr;
    }

    var parseHTML = function(html) {
        var div = document.createElement('div'),
            arr = [],
            i;
        div.innerHTML = html;
        for (i = 0; i < div.childNodes.length; i++) {
            arr.push(div.childNodes[i]);
        }
        return arr;
    }
    ana.extend({
        select: select,
        parseHTML: parseHTML
    })
    ana.extend({
        each: function(arr, fn) {
            var i, l = arr.length,
                isArray = ana.isLikeArray(arr);
            if (isArray) {
                for (i = 0; i < l; i++) {
                    if (fn.call(arr[i], i, arr[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in arr) {
                    if (fn.call(arr[i], i, arr[i]) === false) {
                        break;
                    }
                }
            }
            return arr;
        },
        trim: function(str) {
            return str.replace(/^\s+|\s$/g, '');
        },
        push: push
    })
    ana.extend({
        isFunction: function(obj) {
            return typeof obj === 'function';
        },
        isString: function(obj) {
            return typeof obj === 'string';
        },
        isLikeArray: function(obj) {
            return obj && obj.length && obj.length > 0;
        },
        isana: function(obj) {
            return 'selector' in obj;
        },
        isDOM: function(obj) {
            return !!obj.nodeType;
        }
    })
    ana.extend({
        firstChild: function(dom) {
            var node;
            ana.each(dom.childNodes, function(i, v) {
                if (this.nodeType === 1) {
                    node = this;
                    return false;
                }
            });
            return node;
        },
        nextSibling: function(dom) {
            var newDom = dom;
            while (newDom = newDom.nextSibling) {
                if (newDom.nodeType === 1) {
                    return newDom;
                }
            }
        },
        nextAll: function(obj) {
            var newDom = dom,
                arr = [];
            while (newDom = newDom.nextSibling) {
                if (newDom.nodeType === 1) {
                    arr.push(newDom);
                }
            }
            return arr;
        }
    })
    ana.extend({
        appendTo: function(selector) {
            var objs = ana(selector),
                i, j, len1 = objs.length,
                len2 = this.length,
                arr = [],
                node;
            // this + objs
            for (i = 0; i < len1; i++) {
                for (j = 0; j < len2; j++) {
                    node = i === len1 - 1 ?
                        this[j] :
                        this[j].cloneNode(true);
                    arr.push(node);
                    objs[i].appendChild(node);
                }
            }
            return ana(arr);
        },
        append: function(selector) {
            ana(selector).appendTo(this);
            return this;
        },
        prependTo: function(selector) {
            var objs = ana(selector),
                arr = [],
                len1 = this.length,
                len2 = objs.length,
                i, j;
            for (i = 0; i < len2; i++) {
                // this ++ objs
                for (j = 0; j < len1; j++) {
                    objs[i].insertBefore(i === len2 - 1 ?
                        this[j] :
                        this[j].cloneNode(true), ana.firstChild(objs[i]));
                }
            }
            return this;
        },
        prepend: function(selector) {
            ana(selector).prependTo(this);
            return this;
        },
        remove: function() {
            var i, len = this.length;
            for (i = 0; i < len; i++) {
                this.parentNode.removeChild(this[i]);
            }
            return this;
        },
        next: function() {
            var arr = [];
            ana.each(this, function(i, v) {
                arr.push(ana.nextSibling(v));
            })
            return ana(arr);
        },
        nextAll: function() {
            var arr = [];
            ana.each(this, function(i, v) {
                ana.push.apply(arr, ana.nextAll(v));
            })
            return ana(arr);
        }
    })
    ana.event = function(e) {
        this.event = e;
    }
    ana.Event.prototype = {
        constructor: ana.Event,
        stopPropagation: function() {
            this.event.stopPropagation();
            this.event.cancellBubble = true;
        }
    }
})(window);