## 
- stackoverflow 答案
- 字符串匹配相等 / 回文 
```
解法1：
function strEqual1(str1,str2){
    return str1 === str2.split('').reverse().join('');
}
解法2：
function strEqual2(str1,str2){
    let len1 = str1.length,
        len2 = str2.length;

    if (typeof str1 !== 'string' || typeof str2 !== 'string') return false;
	if (str1 === str2) return true;
	if (len1 !== len2) return false;
    for(let i = 0, j = len2 - 1;i < len1 - 1; i++,j-- ){
        if(str1[i] !== str2[j]){
            return false;
        }
    }
    return true;
}
```
- 当你输入一个网址的时候，实际会发生什么?
[英文地址](http://igoro.com/archive/what-really-happens-when-you-navigate-to-a-url/)
[翻译地址](http://www.cnblogs.com/wenanry/archive/2010/02/25/1673368.html)
[stackoverflow](http://stackoverflow.com/questions/2092527/what-happens-when-you-type-in-a-url-in-browser)

- 一道简单面试题
```
function Foo() {
    getName = function () { 
    	console.log('1');
    };
    return this;
}
Foo.getName = function () {
	console.log('2');
};
Foo.prototype.getName = function () { 
	console.log('3');
};
var getName = function () { 
	console.log('4');
};
function getName() { 
	console.log(5);
}

Foo.getName();  
getName();	
Foo().getName(); 
getName();  
new Foo.getName(); 
new Foo().getName();   
new new Foo().getName();		
请问上述代码在浏览器环境下，输出结果是多少？
　　 揭晓一下最终答案:

2 4 1 1 2 3 3
```
