function template(id, data) {
    var tpl = document.getElementById(id);
    // 字符串
    tpl = tpl.innerHTML;
    // 替换特殊标记内容
    var reg = /<%=\s*([^%>]+\S)\s*%>/;
    var match;

    // 匹配
    while (match = reg.exec(tpl)) {
        // 替换
        // match[0] <%= items %>
        // match[1] items
        // data [{}, {}, {}]
        tpl = tpl.replace(match[0], data[match[1]]);
    }
    return tpl;
}

var data = {
    name: 'baidu',
    age: 10,
    items: [{ a: 1 }, { b: 2 }, { c: 3 }]
}

var html = template('tpl', data);
document.querySelector('.result').innerHTML = html;