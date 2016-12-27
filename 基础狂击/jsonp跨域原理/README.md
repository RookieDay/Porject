## 同源
- 同源策略是浏览器的一种安全策略，所谓同源是指，域名，协议，端口完全相同。
## 跨域
- 不同源则跨域
    例如http://www.example.com/
        http://api.example.com/detail.html	        不同源	域名不同
        https//www.example.com/detail.html	        不同源	协议不同
        http://www.example.com:8080/detail.html	    不同源	端口不同
        http://api.example.com:8080/detail.html	    不同源	域名、端口不同
        https://api.example.com/detail.html	        不同源	协议、域名不同
        https://www.example.com:8080/detail.html	不同源	端口、协议不同
        http://www.example.com/detail/index.html	同源	只是目录不同
## 跨域方案
    1、顶级域名相同的可以通过domain.name来解决，即同时设置 domain.name = 顶级域名（如example.com）
    2、document.domain + iframe
    3、window.name + iframe
    4、location.hash + iframe
    5、window.postMessage()
    参考资料
    http://rickgray.me/2015/09/03/solutions-to-cross-domain-in-browser.html
## JSONP
    JSON with Padding
    1、原理剖析
        其本质是利用了<script src=""></script>标签具有可跨域的特性，由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来，此方法需要前后端配合完成。
        只能以GET方式请求
## jQuery中的JSONP
    jQuery 的$.ajax() 方法当中集成了JSONP的实现，可以非常方便的实现跨域数据的访问。
    dataType: 'jsonp' 设置dataType值为jsonp即开启跨域访问
    jsonp 可以指定服务端接收的参数的“key”值，默认为callback
    jsonpCallback 可以指定相应的回调函数，默认自动生成
