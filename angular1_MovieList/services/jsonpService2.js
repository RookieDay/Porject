void function () {
    // jsonp请求的服务
    var mlJsonp = angular.module('ml.services.jsonp', []);
    mlJsonp.factory('mlJsonp', function ($rootScope) {

        var count = 0;

        return function (url,callback){
    //        1. 要有一个script标签
            var scriptElem = document.createElement('script');
    //        2. 要访问的url

            //每一次调用这个函数时，回调的函数名都是不一样的。
            //避免第一次访问的响应还会到达时，第二次响应以及发出，导致回调函数被覆盖掉了
            var callbackName = '__callback__' + count++;
    //        3. 创建回调函数，并给url添加&callback=[回调函数的名字]
            window[callbackName] = function (data){
                //        回调函数内部：
                //              1. 获取数据，并把数据传给上层callback
                callback(data);
                // 通知AngularJS，我们更新了数据，你去刷新一下视图
                $rootScope.$apply();
                //              2. 删除掉script标签
                document.body.removeChild(scriptElem);
            };

    //        4. script加src属性
            // 我们的url应该传入什么样的格式？
            // http://xx.xx.com/api?callback=JSONP_CALLBACK
            // 也就是说JSONP_CALLBACK这个字符串就相当于是函数名的占位符
            scriptElem.src = url.replace('JSONP_CALLBACK',callbackName);
    //        5. 把script标签插入到文档上
            document.body.appendChild(scriptElem);
        }
    })
}();