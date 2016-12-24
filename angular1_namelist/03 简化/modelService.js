(function () {
    var module = angular.module('nameList.model', []);
    module.controller('modelController', function ($scope) {
        $scope.name = 'model Service'
    });
    module.factory('modelService', function () {
        // 应用程序的数据
        var data = [];

        function Guest(name, phone) {
            this.state = '邀请中';
            this.name = name;
            this.phone = phone;
        }

        Guest.prototype.accept = function () {
            this.state = '已接受'
        };

        Guest.prototype.refuse = function () {
            this.state = '已拒绝'
        };

        return {
            // 1. 获取到所有的数据
            getAll: function () {
                return data.slice(0);
            },
            invite: function (name, phone) {
                // 1. 判断数据合法性
                // 嘉宾的名字和电话都不能是空的
                if (!name || !phone) {
                    return {
                        code: "error",
                        message: "嘉宾的名字或者电话不能是空的"
                    };
                }


                var isOk = true; // 数据合法时isOK就是True
                // 嘉宾的电话不能重复
                data.forEach(function (value, index, array) {
                    // && 两个都为真时，才为真，否则是假
                    isOk = isOk && (value.phone != phone);
                });
                if (!isOk) {
                    return {
                        code: "error",
                        message: "嘉宾的电话不能重复"
                    }
                }

                if (isOk) {
                    // 1. 创建一个对象，并添加到数组中
                    var userinfo = new Guest(name, phone);
                    data.push(userinfo);
                    return {
                        code: "ok"
                    };
                }

            },
            remove: function (userinfo) {
                // TODO: 删除
                // 拿到userinfo对象在model数组里的索引
                var index = data.indexOf(userinfo);
                // 删除数组中的这个对象
                data.splice(index, 1);
            }
        }
    })
})();