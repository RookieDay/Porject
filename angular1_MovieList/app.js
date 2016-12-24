(function () {
    var app = angular.module('ml.main', ['ngRoute', 'ml.model', 'ml.movieList', 'ml.movieDetail']);
    // 配置路由
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/list/:category/:page', {
                templateUrl: "./movie_list/movie_list_tmpl.html",
                controller: "MovieListController"
            })
            .when('/detail/:id', {
                templateUrl: "./movie_detail/movie_detail_tmpl.html",
                controller: "MovieDetailController"
            })
            .otherwise({
                redirectTo: '/list/top250/1'
            })
    })

})();