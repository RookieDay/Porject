(function(){
    var movieDetail = angular.module('ml.movieDetail',['ml.model']);

    movieDetail.controller('MovieDetailController',function($scope,$routeParams,mlModel){
        // 要从路由的参数上拿到电影id
        var id = $routeParams.id;

        mlModel.getSubject(id,function(data){
            $scope.data = data;
            console.log($scope.data)
        })

    })

})();