void

function() {
    var mlJsonp = angular.module('ml.services.jsonp', []);
    mlJsonp.factory('mlJsonp', function($rootscope) {
        var count = 0;
        return function(url, callback) {
            var scriptElem = document.createElement('script');
            var callbackName = '_callback_' + count++;

            window[callbackName] = function cb(data) {
                callback(data);
                $rootscope.$apply();
                document.body.removeChild(scriptElem);
            }
            scriptElem.src = url.replace('JSONP_CALLBACK', callbackName);
            document.body.appendChild(scriptElem);
        }
    })
}();