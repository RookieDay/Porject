'use strict';
// 接口通用地址 后面会加参数
// get /topics 主题首页

// 接收 get 参数

// page Number 页数
// tab String 主题分类。目前有 ask share job good
// limit Number 每一页的主题数量
// mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
// 示例：/api/v1/topics

var HOST_URI = 'https://cnodejs.org/api/v1';

var GET_TOPICS = '/topics';
var GET_TOPIC_BY_ID = '/topic/';

// data 数据说明 最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：

// 对于 header['content-type'] 为 'application/json' 的数据，会对数据进行 JSON 序列化
// 对于 header['content-type'] 为 'application/x-www-form-urlencoded' 的数据，会将数据转换成 query string 
// （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）


function obj2uri(obj){
    return Object.keys(obj).map(function(k){
                return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
 
    }).join('&');
}


module.exports = {
    getTopics:function(obj){
                return HOST_URI + GET_TOPICS + '?' + obj2uri(obj);
 
    },
    getTopicById:function(id,obj){
                return HOST_URI + GET_TOPIC_BY_ID + id + '?' + obj2uri(obj);

    }
}
