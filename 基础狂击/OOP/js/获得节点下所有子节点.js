var find = function(node) {
    var arr = [];
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType === 1) {
            arr.push(node.childNodes[i]);
            arr = arr.concat(find(node.childNodes[i]));
        }
    }
    return arr;
}

onload = function() {
    var nodes = find(document.body);
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].style.border = "3px solid black";
    }
}