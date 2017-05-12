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
/*浏览器缓存机制 
http://www.cnblogs.com/skynet/archive/2012/11/28/2792503.html
http://blog.csdn.net/longxibendi/article/details/41630389

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

Last-Modified/If-Modified-Since
Last-Modified/If-Modified-Since要配合Cache-Control使用
  i.Last-Modified：标示这个响应资源的最后修改时间。web服务器在响应请求时，告诉浏览器资源的最后修改时间。
  ii.If-Modified-Since：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Last-Modified声明，
     则再次向web服务器请求时带上头 If-Modified-Since，表示请求时间。web服务器收到请求后发现有头
    If-Modified-Since 则与被请求资源的最后修改时间进行比对。若最后修改时间较新，说明资源又被改动过，
    则响应整片资源内容（写在响应消息包体内），HTTP 200；若最后修改时间较旧，说明资源无新修改，则响应
    HTTP 304 (无需包体，节省浏览)，告知浏览器继续使用所保存的cache。

Etag/If-None-Match
Etag/If-None-Match也要配合Cache-Control使用。
  i.Etag：web服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器觉得）。Apache中，ETag的值，
    默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到的。
  ii.If-None-Match：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Etage声明，则再次向web
     服务器请求时带上头If-None-Match （Etag的值）。web服务器收到请求后发现有头If-None-Match 则与被请求资源的
     相应校验串进行比对，决定返回200或304。

既生Last-Modified何生Etag？
你可能会觉得使用Last-Modified已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要Etag（实体标识）呢？
HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题：
i  Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的修改时间
ii  如果某些文件会被定期生成，当有时内容并没有任何变化，但Last-Modified却改变了，导致文件没法使用缓存
iii  有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形


Etag是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符，能够更加准确的控制缓存。Last-Modified与
ETag是可以一起使用的，服务器会优先验证ETag，一致的情况下，才会继续比对Last-Modified，最后才决定是否返回304。


用户行为与缓存
浏览器缓存行为还有用户的行为有关！！

用户操作        Expires/Cache-Control       Last-Modified/Etag
地址栏回车        有效                          有效
页面链接跳转      有效                          有效
新开窗口          有效                          有效
前进、后退        有效                          有效
F5刷新            无效                          有效
Ctrl+F5刷新       无效                          无效


参考2： http://www.cnblogs.com/ziyunfei/archive/2012/11/16/2772729.htm
刚刚开始使用Fiddler的用户经常会对Fiddler的网络会话(Web Sessions)列表中的HTTP/304响应感到困惑:

如果客户端发送的是一个条件验证(Conditional Validation)请求,则web服务器可能会返回HTTP/304响应,这就表明了客户端中
所请求资源的缓存仍然是有效的,也就是说该资源从上次缓存到现在并没有被修改过.条件请求可以在确保客户端的资源是最新的
同时避免因每次都请求完整资源给服务器带来的性能问题.

# 辨别条件请求
当客户端缓存了目标资源但不确定该缓存资源是否是最新版本的时候,就会发送一个条件请求.在Fiddler中,你可以在
Headers Inspector查找相关请求头,这样就可以辨别出一个请求是否是条件请求.

在进行条件请求时,客户端会提供给服务器一个If-Modified-Since请求头,其值为服务器上次返回的Last-Modified响应头中的日期
值,还会提供一个If-None-Match请求头,值为服务器上次返回的ETag响应头的值:

服务器会读取到这两个请求头中的值,判断出客户端缓存的资源是否是最新的,如果是的话,服务器就会返回HTTP/304 Not Modified响应,但没有响应体.客户端收到304响应后,就会从缓存中读取对应的资源.

另一种情况是,如果服务器认为客户端缓存的资源已经过期了,那么服务器就会返回HTTP/200 OK响应,响应体就是该资源当前最新的内
容.客户端收到200响应后,就会用新的响应体覆盖掉旧的缓存资源.

只有在客户端缓存了对应资源且该资源的响应头中包含了Last-Modified或ETag的情况下,才可能发送条件请求.如果这两个头都不存在
,则必须无条件(unconditionally)请求该资源,服务器也就必须返回完整的资源数据.

#为什么要使用条件请求
当用户访问一个网页时,条件请求可以加速网页的打开时间(因为可以省去传输整个响应体的时间),但仍然会有网络延迟,因为浏览器还
是得为每个资源生成一条条件请求,并且等到服务器返回HTTP/304响应,才能读取缓存来显示网页.更理想的情况是,服务器在响应上指定
Cache-Control或Expires指令,这样客户端就能知道该资源的可用时间为多长,也就能跳过条件请求的步骤,直接使用缓存中的资源了.
可是,即使服务器提供了这些信息,在下列情况下仍然需要使用条件请求:

在超过服务器指定的过期时间之后
如果用户执行了刷新操作的话
在上节给出的图片中,请求头中包含了一个Pragma: no-cache.这是由于用户使用F5刷新了网页.如果用户按下了CTRL-F5 (有时称之为“强刷-hard refresh”),
你会发现浏览器省略了If-Modified-Since和If-None-Match请求头,也就是无条件的请求页面中的每个资源.

#避免条件请求
通常来说,缓存是个好东西.如果你想提高自己网站的访问速度,缓存是必须要考虑的.可是在调试的时候,有时候需要阻止缓存,这样才能确保你所访问到的资
源是最新的.

你也许会有个疑问:“如果不改变网站内容,我怎么才能让Fiddler不返回304而返回一个包含响应体的HTTP/200响应呢?”

你可以在Fiddler中的网络会话(Web Sessions)列表中选择一条响应为HTTP/304的会话,然后按下U键.Fiddler将会无条件重发(Unconditionally reissue)
这个请求.然后使用命compare命令对比一下两个请求有什么不同,对比结果如下,从中可以得知,Fiddler是通过省略条件请求头来实现无缓存请求的:


如果你想全局阻止HTTP/304响应,可以这么做:首先清除浏览器的缓存,可以使用Fiddler工具栏上的Clear Cache按钮(仅能清除Internet Explorer缓存),
或者在浏览器上按CTRL+SHIFT+DELETE(所有浏览器都支持).在清除浏览器的缓存之后,回到Fiddler中,在菜单中选择Rules > Performance > Disable Caching选项,然后Fiddler就会:删除所有请求中的条件请求相同的请求头以及所有响应中的缓存时间相关的响应头.此外,还会在每个请求中添加Pragma: no-cache请求头,在每个响应中添加Cache-Control: no-cache响应头,阻止浏览器缓存这些资源.
*/
