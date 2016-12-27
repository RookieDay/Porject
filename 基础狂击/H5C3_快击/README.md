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
