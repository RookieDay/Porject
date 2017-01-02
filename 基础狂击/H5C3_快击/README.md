### H5C3
***
## 语义标签
- 语义标签对于我们并不陌生，如<p>表示一个段落、<ul>表示一个无序列表<h1> ~ <h6>表示一系列标题等，在此基础上HTML5增加了大量更有意义的语义标签，更有利于搜索引擎或辅助设备来理解HTML页面内容。
  传统的做法我们或许通过增加类名如class="header"、class="footer"，使HTML页面具有语义性，但是不具有通用性。
  HTML5则是通过新增语义标签的形式来解决这个问题，例如<header></header>、<footer></footer>等，这样就可以使其具有通用性。
  此章节学习目的为了解增加语义标签的目的，以及各语义标签所表达的意义，在网页布局中能够合理使用标签。
- 常用新语义标签
    <nav> 表示导航
    <header> 表示页眉
    <footer> 表示页脚
    <section> 表示区块
    <article> 表示文章 如文章、评论、帖子、博客
    <aside> 表示侧边栏 如文章的侧栏
    <figure> 表示媒介内容分组 与 ul > li 做个比较
    <mark> 表示标记 (带用“UI”，不怎么用，可以重写样式)
    <progress> 表示进度 (带用“UI”，不怎么用，不可重写样式)
    <time> 表示日期
    <hgroup> 标题列表 (据说已废弃)
    <details>
    <bdi>
    <command>
    <summary>
    <rp>
    <rt>
    <ruby>
    本质上新语义标签与<div>、<span>没有区别，只是其具有表意性，使用时除了在HTML结构上需要注意外，其它和普通标签的使用无任何差别，
    可以理解成<div class="nav"> 相当于 <nav>。它只是一个标签！尽量避免全局使用header、footer、aside等语义标签。
- 兼容处理
  在不支持HTML5新标签的浏览器里，会将这些新的标签解析成行内元素(inline)对待，所以我们只需要将其转换成块元素(block)即可使用，
  但是在IE9版本以下，并不能正常解析这些新标签，但是却可以识别通过document.createElement('tagName')创建的自定义标签，
  于是我们的解决方案就是将HTML5的新标签全部通过document.createElement('tagName')来创建一遍，这样IE低版本也能
  正常解析HTML5新标签了，在实际开发中我们更多采用的是通过检测IE浏览器的版本来加载第三方的一个JS库来解决兼容问题。
  ```
  <!--[if lte IE 8]>
    <script src="./js/html5shiv.min.js"></script>
  <![endif]-->
  ```

## 自定义属性 
    在HTML5中我们可以自定义属性，其格式如下data-*=""，例如
    data-info="我是自定义属性"，通过Node.dataset['info'] 我们便可以获取到自定义的属性值。
    Node.dataset是以对象形式存在的
    当我们如下格式设置时，则需要以驼峰格式才能正确获取
    data-my-name="itcast"，获取Node.dataset['myName']

## 地理定位 
  navigator.getCurrentPosition(successCallback, errorCallback, options) 获取当前地理信息
  navigator.watchPosition(successCallback, errorCallback, options) 重复获取当前地理信息
  1、当成功获取地理信息后，会调用succssCallback，并返回一个包含位置信息的对象position。
    position.coords.latitude纬度
    position.coords.longitude经度
    position.coords.accuracy精度
    position.coords.altitude海拔高度
  2、当获取地理信息失败后，会调用errorCallback，并返回错误信息error
  3、可选参数 options 对象可以调整位置信息数据收集方式
    a) enableHighAccuracy 高精度模式
    b) timeout 超时设置，单位为ms
    c) maximumAge表示浏览器重新获取位置信息的时间间隔，单位为ms


## Web存储
  随着互联网的快速发展，基于网页的应用越来越普遍，同时也变的越来越复杂，为了满足各种各样的需求，会经常性在本地存储大量的数据，
  传统方式我们以document.cookie来进行存储的，但是由于其存储大小只有4k左右，并且解析也相当的复杂，给开发带来诸多不便，HTML5规范则提出解决方案。
- 特性
  1、设置、读取方便
  2、容量较大，sessionStorage约5M、localStorage约20M
  4、只能存储字符串，可以将对象JSON.stringify() 编码后存储
- window.sessionStorage
  1、生命周期为关闭浏览器窗口
  2、在同一个窗口下数据可以共享
- window.localStorage
  1、永久生效，除非手动删除
  2、可以多窗口共享
- 方法详解  window.localStorage.getItem('age');
  setItem(key, value) 设置存储内容
  getItem(key) 读取存储内容
  removeItem(key) 删除键值为key的存储内容
  clear() 清空所有存储内容
  key(n) 以索引值来获取存储内容
- 其它
  WebSQL、IndexDB
- 全屏
  HTML5规范允许用户自定义网页上任一元素全屏显示。
    requestFullScreen() 开启全屏显示
    cancleFullScreen() 关闭全屏显示
  不同浏览器需要添加前缀如：
    webkitRequestFullScreen、mozRequestFullScreen
    webkitCancelFullScreen、mozCancelFullScreen
  规范允许所有元素可以取全屏，但实际测试结果关闭全屏只能添加到document元素上
  document.documentElement.webkitRequestFullScreen();
  通过document.fullScreen检测当前是否处于全屏状态
  不同浏览器需要添加前缀
      document.webkitIsFullScreen、document.mozFullScreen
  全屏伪类
    :full-screen .box {}、:-webkit-full-screen {}、:moz-full-screen {}
- 网络状态
  我们可以通过window. navigator.onLine来检测，用户当前的网络状况，返回一个布尔值
  addEventListener 进行绑定online用户网络连接时被调用
  addEventListener 进行绑定.offline用户网络断开时被调用
  事件是给window绑订的


##	应用缓存
    HTML5中我们可以轻松的构建一个离线（无网络状态）应用，只需要创建一个cache manifest文件。
- 优势
  1、可配置需要缓存的资源
  2、网络无连接应用仍可用
  3、本地读取缓存资源，提升访问速度，增强用户体验
  4、减少请求，缓解服务器负担
- 缓存清单
  一个普通文本文件，其中列出了浏览器应缓存以供离线访问的资源，推荐使用.appcache为后缀名，添加MIME类型
  AddType text/cache-manifest .appcache
    例如我们创建了一个名为demo.appcache的文件，然后在需要应用缓存在页面的根元素(html)添加属性manifest="demo.appcache"，路径要保证正确。
- manifest文件格式
  1、顶行写CACHE MANIFEST
  2、CACHE: 换行 指定我们需要缓存的静态资源，如.css、image、js等
  3、NETWORK: 换行 指定需要在线访问的资源，可使用通配符
  4、FALLBACK: 换行 当被缓存的文件找不到时的备用资源
- 事件监听
-	其它
  1、CACHE: 可以省略，这种情况下将需要缓存的资源写在CACHE MANIFEST
  2、可以指定多个CACHE:  NETWORK:  FALLBACK:，无顺序限制
  3、#表示注释，只有当demo.appcache文件内容发生改变时或者手动清除缓存后，才会重新缓存。
  4、chrome 可以通过chrome://appcache-internals/工具和离线（offline）模式来调试管理应用缓存
## 文件读取
  通过FileReader对象我们可以读取本地存储的文件，可以使用 File 对象来指定所要读取的文件或数据。其中File对象可以是来自用户在一个 <input> 元素上选择文件后返回的FileList 对象，也可以来自由拖放操作生成的  DataTransfer
-	FileList对象
  由于HTML5中我们可以通过为表单元素添加multiple属性，因此我们通过<input>上传文件后得到的是一个FileList对象（伪数组形式）。
- FileReader对象
  HTML5新增内建对象，可以读取本地文件内容。
  var reader = new FileReader; 可以实例化一个对象
  实例方法
  1、readAsDataURL() 以DataURL形式读取文件
  事件监听
  onload 当文读取完成时调用
  属性
  result 文件读取结果
  参考资料
  https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader#toc
```
<body>
	<input type="file" class="file">
	<img src="" alt="" id="img">
	<script>
		var file = document.querySelector('.file');

		file.onchange = function () {
			// 通过this.files 可以获取File对象
			// 通过this.files[0] 可以获第一上传的文件，因为h5支持多文件上传
			console.log(this.files);

			// 实例化一个文件读取器
			var reader = new FileReader;
			// 读取刚刚上传上文件
			reader.readAsDataURL(this.files[0]);

			// 读取完成时
			reader.onload = function () {
				// console.log(1);
				console.log(reader.result);
				// 将读取结果放到图片标签里
				document.querySelector('img').src = reader.result;
			}		
		}
	</script>
</body>
```

##	多媒体
  方法：load()、play()、pause()
  属性：currentSrc、currentTime、duration
  事件：
  参考文档
  http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp

### C3
##	属性选择器
- 其特点是通过属性来选择元素，具体有以下5种形式：
    1、E[attr] 表示存在attr属性即可；
    2、E[attr=val] 表示属性值完全等于val；
    3、E[attr*=val] 表示的属性值里包含val字符并且在“任意”位置；
    4、E[attr^=val] 表示的属性值里包含val字符并且在“开始”位置；
    5、E[attr$=val] 表示的属性值里包含val字符并且在“结束”位置；
-	伪类选择器
  除了以前学过的:link、:active、:visited、:hover，CSS3又新增了其它的伪类选择器。
  1、以某元素相对于其父元素或兄弟元素的位置来获取无素的结构伪类。
    通过E来确定元素的父元素。
    E:first-child第一个子元素
    E:last-child最后一个子元素
    E:nth-child(n) 第n个子元素，计算方法是E元素的全部兄弟元素；
    E:nth-last-child(n) 同E:nth-child(n) 相似，只是倒着计算；
    n遵循线性变化，其取值0、1、2、3、4、... 但是当n<=0时，选取无效。
    n可是多种形式：nth-child(2n+0)、nth-child(2n+1)、nth-child(-1n+3)等；
    需要满足y=ax+b
    注：指E元素的父元素，并对应位置的子元素必须是E
    E:empty 选中没有任何子节点的E元素；（使用不是非常广泛）
  2、目标伪类
    E:target 结合锚点进行使用，处于当前锚点的元素会被选中；
-	伪元素选择器
    E::first-letter文本的第一个单词或字（如中文、日文、韩文等）；
    E::first-line 文本第一行；
    E::selection 可改变选中文本的样式；
    重点：E::before、E::after
    是一个行内元素，需要转换成块元素
    E:after、E:before 在旧版本里是伪元素，CSS3的规范里“:”用来表示伪类，“::”用来表示伪元素，
    但是在高版本浏览器下E:after、E:before会被自动识别为E::after、E::before，这样做的目的是用来做兼容处理。
    ":" 与 "::" 区别在于区分伪类和伪元素
    参考文档
    :before和::before的区别
    https://www.qianduan.net/before-and-before-the-difference-between/

## 颜色
- 新增了RGBA、HSLA模式，其中的A 表示透明度通道，即可以设置颜色值的透明度，相较opacity，它们不具有继承性，即不会影响子元素的透明度。
    Red、Green、Blue、Alpha即RGBA
    Hue、Saturation、Lightness、Alpha即HSLA
    R、G、B 取值范围0~255
    H 色调 取值范围0~360，0/360表示红色、120表示绿色、240表示蓝色
    S 饱和度 取值范围0%~100%
    L 亮度 取值范围0%~100%
    A 透明度 取值范围0~1
    关于透明度：
      1、opacity只能针对整个盒子设置透明度，子盒子及内容会继承父盒子的透明度；
      2 、transparent 不可调节透明度，始终完全透明
      RGBA、HSLA可应用于所有使用颜色的地方。
## 文本
  text-shadow，可分别设置偏移量、模糊度、颜色（可设透明度）。
    1、水平偏移量 正值向右 负值向左；
    2、垂直偏移量 正值向下 负值向上；
    3、模糊度是不能为负值；

##	盒模型
  CSS3中可以通过box-sizing 来指定盒模型，即可指定为content-box、border-box，这样我们计算盒子大小的方式就发生了改变。
  可以分成两种情况：
    1、box-sizing: border-box  计算方式为content = width – border - padding
    2、box-sizing: content-box  计算方式为content = width
    注：上面的标注的width指的是CSS属性里设置的width: length，content的值是会自动调整的。
    兼容性比较好

## 易忽略点：
- 伪类选择器 empty
```
<style>
  /*当我的span标签内容为空的情况则选中*/
  span:empty {
    display: none;
  }
</style>
<body>
	<ul class="empty">
		<li>商品分类</li>
		<li>我的订单</li>
    <!--当123 不存在的时候不显示-->
		<li>购物车<span>123</span></li>   
	</ul>
</body>
```
- 伪类选择器
```
		/*选中的是当前的锚点 显示为红色*/
		h2:target {
			color: red;
		}

```
- 伪类
```
		/*选中的类名不是special的元素*/
		li:not(.special) {
			background: red;
		}
```

- 伪元素选择器 ::before :: after
```
		/*通过::before ::after; 可以添加一个子节点，并且这个子节点的样式可以像普通元素一样去设置*/

		/*::before 和 ::after 是用来“动态”创建子节点的*/
		li::before,
		li::after {
			/*默认的情况下是一个行内元素，所以当需要设置宽高的情况必须先转成块元素*/
			display: block;
			
			/*可以为我们动态创建的子节点去添加一些内容*/
			/*content: '放点内容';*/
			
			/*content这个属性必须要写，没有内容就给空*/
			content: '';

			width: 100px;
			height: 100px;
			background: yellow;
			margin: 10px;
		}

		/*CSS2的版本伪元素的写法*/
		/*:before :after;*/
```

- 伪元素选择器
```
    /*选中第一个字母*/
		li::first-letter {
			color: red;
		}
    
    /*选中第一行*/
		p::first-line {
			color: red;
		}
    
    /*选中的是选区*/
		p::selection {
			 background: yellow;
			 color: #FFF;
		}
```


```
线性渐变
.linear:nth-child(2) {
			width: 1000px;
			height: 100px;
			margin: 100px auto;
			background-color: #FFF;
			background-image: linear-gradient(
				135deg,
				black 25%,
				transparent 25%,
				transparent 50%,
				black 50%,
				black 75%,
				transparent 75%
			);

			/*background-repeat: no-repeat;*/

			background-size: 100px 100px;
		
			animation: move 1s linear infinite;
			
		}
```
```
径向渐变
.radial {
			width: 300px;
			height: 300px;
			margin: 100px auto;
			/*background-image: radial-gradient(150px at center, yellow, green);*/
			/*中心点的位置是以盒子自身为参照*/
			/*background-image: radial-gradient(300px at left center, yellow, green);*/
			
			/*盒子左上角为圆心点，我们可通过坐标来设置中心位置*/
			background-image: radial-gradient(150px at 80px 80px, yellow, green);

			/*border-radius: 150px;*/
		}

```

/*设置元素背面是否可见*/
backface-visibility: hidden;





