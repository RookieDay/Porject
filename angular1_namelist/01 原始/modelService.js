angular.module("ic.model", [])
    .factory('icModel', function () {
        var id = 1;
        var data = [new Guest("张三","18612123232")];

        function Guest(name, phone) {
            this.name = name;
            this.phone = phone;
            this.id = id++;
            this.state = "邀请中";
        }

        Guest.prototype.accept = function () {
            console.log(this.name + '接受邀请')
            this.state = '已接受'
        };


        Guest.prototype.refuse = function () {
            this.state = '已拒绝'
        };

        return {
            getNameList: function () {
                return data.slice(0)
            },
            invite: function (name, phoneNumber) {
                data.push(new Guest(name, phoneNumber));
                return id;
            },
            remove: function (item) {
                var index = data.indexOf(item);
                data.splice(index, 1);
            }
        }
    });