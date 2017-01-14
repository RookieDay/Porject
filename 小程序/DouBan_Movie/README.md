## 
- app.json配置全局
  app.js 引入全局的函数 变量等 监听小程序初始化
- splash 刚开始的时候 首页导航
- board 分为两部分 头部导航以及下面的三大块 
  + 点击最上面轮播图 跳转到对于的详情页面  slide
  + 点击导航的文字 传进对应这一块的 type 和 title 去获取对应的页面的list
     ```
     <!--/list/list?type=in_theaters&title=正在上映的电影-北京-->
     ```
  + 点击轮播图片里面的文字 跳到对应的item 详细列表 
    ```
    获取单个的详细列表
    <!--../item/item?id=21324900-->
    ```
 - search 部分 进行电影的搜索    拿到输入框里面的内容 配置进行拿数据
  ```
  https://api.douban.com/v2/movie/search?start=0&count=20&q=情圣&city=北京
  ```