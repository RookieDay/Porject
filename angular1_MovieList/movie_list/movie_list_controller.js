(function () {
    var movieList = angular.module('ml.movieList', ['ml.model']);
    movieList.controller('MovieListController', function ($scope, $routeParams, mlModel) {
        // 获取AngularJS路径上的参数
        // 电影列表的门类
        var category = $routeParams.category;
        // 电影列表的页数
        var page = $routeParams.page;

        // 起始记录和当前页面有关、每页显示的列表项数目有关

        // 每页要显示的列表项的个数
        // 如果要增加这个程序的扩展性，我们可以把listCount可以放到service
        var listCount = 12;
        // 获取数据的开始项是哪一项
        // 比如说我们现在要拿第二页的数据，那么我们的开始项是？
        // 12~23, (page - 1) * listCount
        var start = (page - 1) * listCount;


        // 页面上要显示的列表数据
        var vm = $scope.vm = {};
        vm.data = [];
        vm.pager = {};

        // 正在加载的标记
        vm.loading = true;


        function buildPager(page, total, listCount, category) {
            this.curr = page; // 当前页
            this.max = Math.ceil(total / listCount);
            // 下一页
            this.next = page == this.max
                ? this.max
                : page - 0 + 1;
            // 上一页
            this.prev = page == 1
                ? 1
                : page - 1;
            this.category = category;
        }

        switch (category) {
            case "top250":
                mlModel.getTop250(start, listCount, function (data) {
                    vm.data = data.subjects;
                    vm.pager = new buildPager(page, data.total, listCount, category);
                    vm.loading = false;
                });
                break;
            case "in_theaters": // 正在热映
                mlModel.getInTheaters(start, listCount, function (data) {
                    vm.data = data.subjects;
                    vm.pager = new buildPager(page, data.total, listCount, category);
                    vm.loading = false;
                });
                break;
            case "coming_soon": // 即将上映
                mlModel.getComingSoon(start, listCount, function (data) {
                    vm.data = data.subjects;
                    vm.pager = new buildPager(page, data.total, listCount, category);
                    vm.loading = false;
                });
                break;
        }
    })
})();