var createCache = function() {
    var internalCache = {};
    var arr = [];
    return function(k, v) {
        if (v) {
            if (!internalCache[k]) {
                if (arr.length >= 3) {
                    delete internalCache[arr.shift()];
                }
                arr.push(k);
            }
            internalCache[k] = v;
        } else {
            return internalCache[k];
        }
    }
}