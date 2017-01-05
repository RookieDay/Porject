var s = "abcdefgefgefghijefglmn";
var i = -1,
    arr = [];

// stringObject.indexOf(searchvalue, fromindex)
// 参数                 描述
// searchvalue         必需。 规定需检索的字符串值。
// fromindex           可选的整数参数。 规定在字符串中开始检索的位置。 
//                     它的合法取值是 0 到 stringObject.length - 1。 如省略该参数， 则将从字符串的首字符开始检索。
do {
    i = s.indexOf('e', i + 1);
    if (i != -1) {
        arr.push(i);
    }
} while (i != -1)


// 正则的解法
var s = "abcdefgefgefghijefglmn";
var r = new RegExp("e", "g");
var arr = [];
var m;
// 在 exec 的方法中有一个规定, 如果同一个正则表达式对象 如果开启了全局模式
// 每调用一次 exec 方法就会查找下一个字符串, 直到最后找不到 返回 null
while ((m = r.exec(s)) != null) {
    arr.push(m.index);
}