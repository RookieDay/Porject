- ng-app 指定AngularJS框架运行在哪个标签的内部:ng-app属性
- ng-model AngularJS内部有一个“JavaScript对象，用于存储数据”，ng-model指定这个对象上的一个属性，和这个标签，进行绑定：用户有输入时，ng-model指定的那个属性，也随着用户输入进行更改。当那个属性内部的数据，因为其他原因有更改时，这个更改也会体现在这个标签上。
- {{}} 插值语法 将model上的属性和这个插值语法进行绑定，网页上不显示插值语法，而是现实对应的数据
- 1.模板、数据的双向绑定。
  2.模块化：AngularJS指定了模块里面只能有某几种“部件”。（[module].controller(…)其实就是Controller部件）
  3.指令：directive，就是文档上打的各种“标记”。（新的标签名、或者新的属性名。）
  4.依赖注入：
    a.jQuery提供功能时，怎么提供的？$.ajax() … 这样，就是“把功能挂到$对象上”
    b.AngularJS提供功能时，怎么提供的呢？AngularJS中有大量的回调函数，在我们书写回调函数是，把参数名按正确的方式书写，AngularJS会自动地提供对应的“服务对象”。这个就是依赖注入。

- AngularJS的常用标记大致分成这样几类：
数据绑定： 插值语法 {{}}
          标签内容绑定 ng-bind
          表单控件双向绑定 ng-model
事件绑定：
    1.点击事件：ng-click
    2.双击：ng-dblclick
    3.获得焦点：ng-focus
    4.失去焦点：ng-blur
    5.数据改变：ng-change    

加载处理:    
    1.ng-cloak
    2.ng-src
    3.ng-href

状态设置类：
    1.ng-class
    2.ng-style
    3.ng-readonly
    4.ng-disable
    5.ng-hide,ng-show    

程序结构类：
    1.ng-app
    2.ng-controller    

仿流程控制类
    1.ng-if
    2.ng-switch
    3.ng-repeat    

- AngularJS模块和控制器的理解
AngularJS模块：把AngularJS的各种“零部件”组织到一起去。
AngularJS的Controller：是AngularJS诸多零部件中的一种，功能是：提供$scope，$scope里有数据，也有方法（用于处理各种事件）。
我们一个AngularJS应用想要正常运行，它需要模板，也需要数据。
启动AngularJS程序时，需要指定一个模块，因为模块里面有各种数据之类的我们应用中用得到的东西。(ng-app)
AngularJS应用，需要数据，数据由Controller提供。Controller里面有一个作用域，Controller还有控制器的名字，然后我们用ng-controller指定这个Controller里面的$scope在哪个元素内有效。

锚点的演示：
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>04演示锚点</title>
</head>
<body>

<a href="#a">goto a</a>
<a href="#b">goto b</a>
<a href="#c">goto c</a>
<a href="#d">goto d</a>
<a href="#e">goto e</a>

<div id="a" style="height: 500px;">
    a
</div>


<div id="b" style="height: 500px;">
   b
</div>

<div id="c" style="height: 500px;">
  c
</div>

<div id="d" style="height: 500px;">
    d
</div>

<div id="e" style="height: 500px;">
  e
</div>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<script src="angular.js"></script>
<body>

<div ng-app="demo.main">
    <div ng-controller="mainController">

    </div>
    <script>
        var app = angular.module('demo.main',[]);
        app.controller("mainController",function($scope, $parse){
            $scope.name = 'main123';
            var fn = $parse('name');
            console.log($parse())
            console.log(fn($scope))
        })

    </script>
</div>
</body>
</html>

AngularJS框架内部的$parse服务，通过依赖注入拿到的$parse实际上是一个函数。用法很简单：
var parseFn = $parse('name')
var nameOnScope = parseFn($scope)


作用域：通知作用域数据发生了改变
使用$scope.$apply()来通知AngularJS数据发生了变化，去更新视图

作用域：监视数据变化
var unregisterWatch = $scope.$watch(
'data.name',
// Todo : 数据发生变化时做什么
function( newValue, oldValue, scope){
})
这样可以监视这个作用域上的数据的变化。

其本质是，监听这个作用域上执行这个表达式后，获得的值有没有发生变化。
小实验：用$location获取当前的网址，并利用$scope监视网址的变化。


用provider创建AngularJS服务，并在AngularJS模块中进行设置
app.provider('demoService', function () {
var demoStr = 'demo';
return {
setStr: function (val) {
demoStr = val;
},
$get: function () {
return demoStr;
}
}
});
app.config(function (demoServiceProvider) {
demoServiceProvider.setStr('hello world')
});