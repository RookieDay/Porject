 var loginA = document.getElementById("loginA");
 var closeMask = document.getElementById("closeMask");
 var mask = document.getElementById("mask");

 //2.绑定事件
 loginA.onclick = function() {
     //3.书写事件驱动程序
     //(1).显示或者关闭模态框
     mask.style.display = 'block';
 }

 //2.绑定事件
 closeMask.onclick = function() {
     //3.书写事件驱动程序
     //(1).显示或者关闭模态框
     mask.style.display = "none";
 }