   var container = document.getElementById("container");
   var boxes = container.children;

   //获取第一行有多少张 或者一共有多少列(页面宽度/盒子宽度)
   //页面宽度
   var pageWidth = window.innerWidth;
   //盒子宽度
   var boxWidth = boxes[0].offsetWidth;
   //计算
   var column = Math.floor(pageWidth / boxWidth);

   var arrHeight = []; //记录每一列的高度

   function waterFall() {
       for (var i = 0; i < boxes.length; i++) {
           if (i < column) {
               arrHeight[i] = boxes[i].offsetHeight;
           } else {
               var minHeight = getMin(arrHeight).value;
               var minHeightIndex = getMin(arrHeight).minIndex;
               boxes[i].style.position = 'absolute';
               boxes[i].style.top = minHeight + 'px';
               boxes[i].style.left = boxes[minHeightIndex].offsetLeft + "px";
               arrHeight[minHeightIndex] = minHeight + boxes[i].offsetHeight;
           }
       }
   }

   waterFall();

   function getMin(arr) {
       var min = {};
       min.minIndex = 0;
       min.value = arr[min.minIndex];
       for (var i = 0; i < arr.length; i++) {
           if (arr[i] < min.value) {
               min.value = arr[i];
               min.minIndex = i;
           }
       }
       return min;
   }