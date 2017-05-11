// jqAjax
$('.submit').on('click', function() {
    var _this = $(this);
    if (_this.hasClass('disabled')) return;
    //ajax获取表单数据
    var formData = $('ajaxFrom').serialize;
    $.ajax({
        type: 'post',
        url: 'register.php',
        data: formData,
        beforeSend: function() {
            if ($('.pass').val() == '') {
                $('tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('not exist');
                return false;
            }
            _this.addClass('disabled');
            _this.val('Submit...');
        },
        success: function(data) {

        },
        error: function() {

        },
        complete: function() {

        }
    })
})

//封装自己的ajax
var $ = {
    params: function(params) {
        var data = '';
        for (key in params) {
            data += key + '=' + params[key] + '&';
        }
        return data.slice(0, -1);
    },
    ajax: function(options) {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest;
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var type = options.type || 'get',
            url = options.url || location.pathname,
            data = this.params(options.data),
            callback = options.success;
        if (type == 'get') {
            url = url + '?' + data;
            data = null;
        }
        xhr.open(type, url);
        //post设置请求头
        if (type == 'post') {
            xhr.setRequestHeader('Content-Type',
                'application/x-www-form-urlencoded');
        }
        xhr.send(data);
        xhr.onreadstatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var contentType = xhr.getResponseHeader('Content-Type');
                var data = xhr.responseText;
                //解析json
                if (contentType.indexOf('json') != -1) {
                    data = JSON.parse(data);
                }
                callback(data);
            } else {
                options.error('failed');
            }
        }
    }
}

// HTTP协议状态码表示的意思主要分为五类 ,大体是 :  
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
// 1×× 　　保留   
// 2×× 　　表示请求成功地接收   
// 3×× 　　为完成请求客户需进一步细化请求   
// 4×× 　　客户错误   
// 5×× 　　服务器错误

//----------------------------------------------------------------------------
// 302 重定向和网址劫持（URL hijacking）
// 从网址A做一个302重定向到网址B时，主机服务器的隐含意思是网址A随时有可能改主意，重新显示本身的内容
// 或转向其他的地方。大部分的搜索引擎在大部分情况下，当收到302重定向时，一般只要去抓取目标网址就可以了，
// 也就是说网址B。如果搜索引擎在遇到302转向时，百分之百的都抓取目标网址B的话，就不用担心网址URL劫持了。
// 问题就在于，有的时候搜索引擎，尤其是Google，并不能总是抓取目标网址。比如说，有的时候A网址很短，
// 但是它做了一个302重定向到B网址，而B网址是一个很长的乱七八糟的URL网址，甚至还有可能包含一些问号之类的参数。
// 很自然的，A网址更加用户友好，而B网址既难看，又不能用户友好。这时Google很有可能会仍然显示网址A。
// 由于搜索引擎排名算法只是程序而不是人，在遇到302重定向的时候，并不能像人一样的去准确判定哪一个网址更适当，
// 这就造成了网址URL劫持的可能性。也就是说，一个不道德的人在他自己的网址A做一个302重定向到你的网址B，
// 出于某种原因，Google搜索结果所显示的仍然是网址A，但是所用的网页内容却是你的网址B上的内容，这种情况就
// 叫做网址URL劫持。你辛辛苦苦所写的内容就这样被别人偷走了。302重定向所造成的网址URL 劫持现象，
// 已经存在一段时间了。不过到目前为止，似乎也没有什么更好的解决方法。在谷歌曾进行的Big Daddy数据中心
// 转换中，302重定向问题也是要被解决的目标之一。从一些搜索结果来看，网址劫持现象有所改善，但是并没有完全解决。 
//----------------------------------------------------------------------------
//304 
// 当浏览器第一次加载资源的时候，返回一般为200，意思是成功获取资源，并会在浏览器的缓存中记录下max-age，
// 第二次访问的时候：如果只是用浏览器打开，那么浏览器会去判断这个资源在缓存里有没有，如果有的话，
// 会去判断max-age，看看过期没有，如果没有过期，则直接读缓存，根本不会和服务器进行交互，换句话说，
// 断网都能打开，就和本地跑一样！如果已经过期了，那就去服务器请求，等待服务器响应，这是很费时间的，
// 服务器如果发现资源没有改变过，那么就会返回304，告诉浏览器，我没变过，你去读缓存吧，于是浏览器也
// 不用从服务器拉数据了，然而，等待服务器响应也是一个很要命的问题，在网速发达的今天，等一个响应，
// 有时比下载还慢。如果是用浏览器刷新的，那么浏览器不会去判断max-age了，直接去服务器拿，如果服务
// 器判断资源没变过，则还是会返回304，和上面是一样的，所以刷新一下，其实很可怕，等于把所有的资源都
// 要去服务器请求一边，问问服务器我过期了没有。


// GET后退按钮 / 刷新无害， POST数据会被重新提交（ 浏览器应该告知用户数据会被重新提交）。
// GET书签可收藏， POST为书签不可收藏。
// GET能被缓存， POST不能缓存。
// GET编码类型application / x - www - form - url， POST编码类型encodedapplication / x - www - form - urlencoded 或 multipart / form - data。 为二进制数据使用多重编码。
// GET历史参数保留在浏览器历史中。 POST参数不会保存在浏览器历史中。
// GET对数据长度有限制， 当发送数据时， GET 方法向 URL 添加数据； URL 的长度是受限制的（ URL 的最大长度是 2048 个字符）。 POST无限制。
// GET只允许 ASCII 字符。 POST没有限制。 也允许二进制数据。
// 与 POST 相比， GET 的安全性较差， 因为所发送的数据是 URL 的一部分。 在发送密码或其他敏感信息时绝不要使用 GET！ POST 比 GET 更安全， 因为参数不会被保存在浏览器历史或 web 服务器日志中。
// GET的数据在 URL 中对所有人都是可见的。 POST的数据不会显示在 URL 中。



//-----------------------------------------------------------------------
/*浏览器缓存机制 http://www.cnblogs.com/skynet/archive/2012/11/28/2792503.html

Expires策略:
浏览器缓存机制，其实主要就是HTTP协议定义的缓存机制（如： Expires； Cache-control等）。
但是也有非HTTP协议定义的缓存机制，如使用HTML Meta 标签，Web开发者可以在HTML页面的
<head>节点中加入<meta>标签，代码如下：
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
上述代码的作用是告诉浏览器当前页面不被缓存，每次访问都需要去服务器拉取。使用上很简单，但只有部
分浏览器可以支持，而且所有缓存代理服务器都不支持，因为代理不解析HTML内容本身。

Expires是Web服务器响应消息头字段，在响应http请求时告诉浏览器在过期时间前浏览器可以直接从
浏览器缓存取数据，而无需再次请求。

Web服务器告诉浏览器在2012-11-28 03:30:01这个时间点之前，可以使用缓存文件。发送请求的时间是2012-11-28 03:25:01，
即缓存5分钟。

不过Expires 是HTTP 1.0的东西，现在默认浏览器均默认使用HTTP 1.1，所以它的作用基本忽略。


Cache-control策略
Cache-Control与Expires的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存取数据还是重新
发请求到服务器取数据。只不过Cache-Control的选择更多，设置更细致，如果同时设置的话，其优先级高于Expires。

http协议头Cache-Control    ：
值可以是public、private、no-cache、no- store、no-transform、must-revalidate、proxy-revalidate、max-age
各个消息中的指令含义如下：
    Public指示响应可被任何缓存区缓存。
    Private指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。
    no-cache指示请求或响应消息不能缓存
    no-store用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。
    max-age指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应。
    min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应。
    max-stale指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。
还是上面那个请求，web服务器返回的Cache-Control头的值为max-age=300，即5分钟（和上面的Expires时间一致，这个不是必须的）。
*/