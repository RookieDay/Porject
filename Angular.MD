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


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>04AngularJS表达式</title>
    <script src="../angular.js"></script>
</head>
<body ng-app="demo.main">

<div ng-controller="nameController">
{{num}}
</div>

<script>
    var app = angular.module('demo.main', []);
    app.controller('nameController', function ($scope, $parse) {
        $scope.num = 1;

         // 1. 调用$parse获得一个函数
        var parseFn = $parse('num');
         // 2. 把作用域传给那个函数，然后获取表达式的值
        var value = parseFn($scope)

    })

    function demoFn(){
        var a = 1;
        var b = 2;
        console.log(a);
    }

</script>
</body>
</html>


$scope.$apply();
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>07作用域上的数据变更未被AngularJS框架知晓</title>
    <script src="../angular.js"></script>
</head>
<body ng-app="demo.main">
<div ng-controller="outerController">
    {{num}}
</div>
<script src="jquery.js"></script>
<script>
    var app = angular.module('demo.main', []);
    app.controller('outerController', function ($scope, $window) {
        $scope.num = 0;

//        setTimeout(function () {
//            $scope.num = 10;
//            // 通知AngularJS应用我们的数据变更，然后更新视图
//            $scope.$apply();
//        },1000)

//        $timeout(function(){
//            $scope.num = 10;
//        },1000)

//        $interval(function(){
//            $scope.num ++
//        },100)

//        console.log($window);
//
//        $window.setTimeout(function(){
//            $scope.num = 10;
//        },100)

        $.get('data.json', function (data) {
            console.log(data);
            $scope.num = data.num;
            $scope.$apply();
        })
    });

</script>
</body>
</html>


$scope.$watch();
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>07作用域上的数据变更未被AngularJS框架知晓</title>
    <script src="../angular.js"></script>
</head>
<body ng-app="demo.main">
<div ng-controller="outerController">
    {{num}}
    <input type="text" ng-model="num">
</div>
<script src="jquery.js"></script>
<script>
    var app = angular.module('demo.main', []);
    app.controller('outerController', function ($scope, $window) {
        $scope.num = 0;
        console.log($scope);
        var releaseFn = $scope.$watch('num', function (newValue, oldValue, scope) {
            console.log(newValue, oldValue, scope);
        });
        // 释放自己注册的watcher
//        releaseFn();
    });

</script>
</body>
</html>




$scope.$location();
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>复习</title>
    <script src="../angular.js"></script>
</head>
<body ng-app="demo.main">
<div ng-controller="outerController">
    <a href="#/a">goto a</a>
    <a href="#/b">goto b</a>
    <a href="#/c">goto c</a>

    {{name}}
</div>
<script>
    var app = angular.module('demo.main', []);
    app.controller('outerController', function ($scope, $location) {
        console.log($location);
        // 用$location.path()能够拿到当前的路径，我们把$location放到$scope上，以便监听
        $scope.location = $location;
        $scope.name = 'index';
        // 监听AngularJS表达式“location.path()”
        $scope.$watch('location.path()', function (newValue, oldValue, scope) {
            console.log(newValue, oldValue);
            $scope.name = newValue;
        })

    });
</script>
</body>
</html>


指令：ng-repeat
item: 数组里面的每一个元素（每一个ng-repeat生成$scope中,item都不同）item来自于"item in array"的写法，实际上item可以随便自定义它的名字。
$index:这个元素在数组里的索引
$first: 这个元素是不是数组里的第一个元素
$last:这个元素是不是数组里最后一个元素
$middle:……是不是中间的元素
$even:索引值是不是偶数
$odd:索引值是不是奇数

<trng-repeat="itemininfoes"ng-class="{'bg-blue':$even}">
绑定的数组，语法是item in array
<trng-repeat="(key,item)ininfoes"ng-class="{'bg-blue':$even}">
绑定对象，语法是(key , value) in object

如果你的repeat所绑定的数组经常发生变化，最好也加一个track by $index

自定义服务:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>11ng-repeat</title>
    <script src="../angular.js"></script>
    <style>
        .bg-blue {
            background-color: lightblue;
        }
    </style>
</head>
<body>
<div ng-app="demo.main">
    <div ng-controller="mainController">

    </div>
</div>

<script>
    var app = angular.module('demo.main', []);
    // 用factory创建一个自定义服务：
    // 1 自定义服务的名字
    // 2 回调函数，它的返回值，就是自定义服务的内容
    app.factory('modelService',function(){
        var arr = [
            {name: "张三", phone: "18612345678", state: "邀请中"},
            {name: "李四", phone: "18612345678", state: "已接受"}
        ];
        return  {
            nameList: arr,
            invite:function(userinfo){
                arr.push(userinfo)
            }
        }
    });
    app.controller('mainController', function ($scope,modelService) {
        console.log(modelService);
        modelService.invite({})
    })
</script>
</body>
</html>
```

过滤器：
```
<!DOCTYPE html>
<html lang = "en">
<head>
    <meta charset="UTF-8">
    <title>filter</title>
    <scritpt src="./angular.js"></script>
    <style>
        .bg-blue{
            background-color:pink;
        }
    </style>
</head>
<body ng-app="app">
    <div ng-cotrollor="mainController">
        <div ng-repeat="item in array | filter:{state:'on'}">
            {{item.name}}, {{item.statte}}
        </div>
     </div>
     <script>
        var app = angular.module('app",[]);
        app.controller('mainController',function($scope){
                 $scope.array =  [
           {name: "张三", phone: "18612345678", state: "邀请中"},
           {name: "李四", phone: "18612345678", state: "已接受"}
       ];
        }) 
    </script>
</body>
</html>
```

```
// 我们应用中的model
var model = [
    { name: "张三", phone: "18612345678", state: "邀请中" },
    { name: "李四", phone: "18612342178", state: "已接受" }
];

var app = angular.module('nameList.main',[]);
app.controller('mainController',function($scope,$location){
    $scope.nameList = model;
    $scope.invite = function(){
        var name = $scope.name;
        var phone = $scope.phone;

        var userInfo = {name:name,phone:phone,state:"邀请中"};
        var isOk = true;
        if(!name || !phone){
            isOk = false;
        }
        model.forEach(function(value,index,array){
            isOk = isOk &&(!(value.phone == phone));
        });
        if(isOk){
            model.push(userInfo);
        } else {
            alert('not good');
        }
        $scope.name = "";
        $scope.phone = "";
    }
    $scope.remove = function(userInfo){
        var index = model.indexOf(userInfo);
        model.splice(index,1);
    }
    $scope.accept = function(userInfo){
        userInfo.state = "已接受";
    }
    $scope.refuse = function(userInfo){
        userInfo.state = "已拒绝";
    }
    $scope.location = $location;
    $scope.$watch('location.path()',function(newValue,oldValue){
        switch(newValue){
            case '/all':
                $scope.nameList = model;
                break;
              case '/invite':
                    $scope.nameList = model.filter(function(value) {
                        return value.state == '邀请中'
                    });
                    break;
                case '/accept':
                    $scope.nameList = model.filter(function(value) {
                        return value.state == '已接受'
                    });
                    break;
                case '/refuse':
                    $scope.nameList = model.filter(function(value) {
                        return value.state == '已拒绝'
                    });
                    break;   }
    })
})
```



Angular创建服务的三种方式：
在模块上指定服务名和服务对象（可以是对象、函数、数值等等任意JavaScript变量），在AngularJS框架中其它用得到回调函数的地方，可以使用依赖注入的方式获得这个服务对象。用法：
module.factory('demoService',function(){
    //
    return {
        name:'demo',
        fn:function(){...}
    }
})
module.controller('demoController',function($scope,demoService){})

service和factory唯一的区别就是，service的回调函数不返回一个对象，而是把自身当做一个构造函数使用，创建出来的对象作为服务对象。
module.service(
    'demoService',
    function(){
        this.name = "demo",
        this.xxx = xxx;
    }
)


使用provider时，其回调函数返回的对象中，$get就是我们的服务对象。至于其他字段，我们可以在module.config里访问。如下：
module.config(function(demoServiceProvider){
        demoServiceProvider.setName = "demoPlus";
})

module.provider('demoService',function(){
    var name = "demo";
    return {
        $get:function(){
            return name;
        },
        setName:function(newName){
            name =newName;
        }
    }
})


AngularJS自定义指令
directives.directive('demoHello',function(){
    // 返回一个对象，这个对象用于描述我们的指令
    return {
        restrict:'EA',// 设置这个指令可以接受元素、和属性的标记,如果没有指定restrict属性，默认是“EA”
        template:"<div>this is demo directive</div>"
    }
})

使用指令
<h3>用标签打标记：</h3> 当restrict的字符串里面有E的时候，可以用标签名来打标记
<demo-hello></demo-hello>  template 复制到标签里面

<h3>用属性打标记：</h3>
<div demo-hello></div> 当restrict的字符串中有A的时候，可以用属性名来打标记  ， 标签内容替换



templateUrl: 模板的路径（对应的是template传入模板的字符串）
transclude：内嵌功能。原来的标签的内容，放入到模板中指定的标签之内。
replace：替换，用模板中的元素，替换指令所指定的那个元素。


transclude:
```
<!DOCTYPE html>
<html lang="en" ng-app="demo.main">
<head>
    <meta charset="UTF-8">
    <title>AngularJS指令：内嵌</title>
    <script src="angular.js"></script>
</head>
<body>

<div demo-hello="">
    <div>world</div>
</div>

<div demo-hello="">
    <div>AngularJs</div>
</div>

<script>
    var app = angular.module('demo.main',['demo.directives']);
    var directives = angular.module('demo.directives',[]);

    directives.directive('demoHello',function(){
        return {
            restrict:"EA", // 指令生效的方式：E代表作为元素名，A代表作为属性名，可以重复
            //原来的标签的内容，放入到模板中指定的标签之内。
            template:"<div><h1>hello,</h1> <div ng-transclude style='padding-left: 50px;font-size: 40px'></div> </div>",
            transclude:true
        }
    });
</script>

</body>
</html>
```
