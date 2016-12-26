var $ = {
    params: function(params) {
        var data = '';
        for (key in params) {
            data += key + '=' + params[key] + '&';
        }
        return data.slice(0, -1);
    },
    ajax: function(options) {
        var xhr = new XMLHttpRequest,
            // 默认为get方式
            type = options.type || 'get',
            // 默认请求路径
            url = options.url || location.pathname,
            // 格式化数据key1=value1&key2=value2
            data = this.params(options.data),
            callback = options.success;
        // get 方式将参数拼接到URL上并将data设置成null
        if (type == 'get') {
            url = url + '?' + data;
            data = null;
        }
        // 1.通过open方法发起请求行
        // 当post形式必须要写请求头Content-Type，并且只能是application/x-www-form-urlencoded
        // 当以get形式情况下可以不写Content-Type
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.open(type, url);
        if (type == 'post') {
            // 设置了一个请求头
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        // 发送请求主体
        // POST数据放到请求主体中，但是不是必须要填写的
        xhr.send(data);
        // 监听响应状态并处理
        xhr.onreadystatechange = function() {
            // 监听完成的状态及服务器响应状态
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 获取响应类型
                var contentType = xhr.getResponseHeader('Content-Type');
                var data = xhr.responseText;
                // 解析JSON
                if (contentType.indexOf('json') != -1) {
                    data = JSON.parse(data);
                }
                callback(data);
            } else {
                options.error("falied");
            }
        }
    }
}