// 按钮
var btn = document.querySelector('.btn');
// 聊天内容框
var messages = document.querySelector('.messages');

// 自已说话的内容
var input = document.querySelector('textarea');

var items = '';

var xhr = new XMLHttpRequest;

btn.onclick = function() {
    items = createMessage('self', input.value);
    // 将自已说的话追加到内容框里
    messages.appendChild(items);

    // 发起请求
    xhr.open('get', 'chat.php');
    xhr.send(null);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // // 创建对方说话的DOM
            items = createMessage('other', xhr.responseText);

            console.log(items);
            // 将对方说的话追加到内容框里
            messages.appendChild(items);
        }
    }

    // 清空输入框
    input.value = '';
}

function createMessage(flag, text) {
    // 创建结点
    var item = document.createElement('div'),
        h5 = document.createElement('h5'),
        p = document.createElement('p');
    item.classList.add(flag);
    // 判断主体
    switch (flag) {
        case 'self':
            h5.innerText = '我说';
            break;
        case 'other':
            h5.innerText = '对方说';
            break;
    }

    // 插入文本
    p.innerText = text;

    // 追加节点
    item.appendChild(h5);
    item.appendChild(p);

    return item;
}