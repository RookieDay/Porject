var cElem = function(html) {
    // 1, 在内部创建一个 docfrag
    var docfrag = document.createDocumentFragment();
    // 2, 创建真正的 div, 然后设置其 innerHTMl 为出入的字符串
    // 然后在遍历该子元素, 将内容加入到 docfrag 中
    var div = document.createElement('div');
    div.innerHTML = html;
    // 4, 遍历div的子元素, 加入 docfrag
    // 在 DOM 元素中默认有一个特征, 即元素只允许有一个 父节点
    // 如果添加元素到另一个节点中, 该元素会自动的离开原来的父节点
    while (div.firstChild) {
        docfrag.appendChild(div.firstChild);
    }
    // 5, 获得其子元素返回
    return docfrag;
}


// 关于上面的问题，可以从这得到解答
// <!DOCTYPE html>
// <html>
// 	<head>
// 		<meta charset="UTF-8">
// 		<title></title>
// 		<script type="text/javascript">

// 			var id = function ( id ) {
// 				return document.getElementById( id );
// 			};


// 			onload = function () {
// 				var d1 = id( 'dv1' );
// 				var d2 = id( 'dv2' );
// 				var list = d1.getElementsByTagName("p");
// 				var len;
// //				for ( var i = 0, len = list.length; i < len; i++ ) {
// //					
// //					d2.appendChild( list[ 0 ] );
// //					
// //				}

// //				while ( list[ 0 ] ) {
// //					d2.appendChild( list[ 0 ] );
// //				}

// 				while ( d1.firstChild ) {
// 					d2.appendChild( d1.firstChild );
// 				}
// 			};

// 		</script>
// 	</head>
// 	<body>
// 		<div id="dv1">
// 			<p>p1</p>
// 			<p>p2</p>
// 			<p>p3</p>
// 			<p>p4</p>
// 		</div>
// 		<div id="dv2">

// 		</div>
// 	</body>
// </html>