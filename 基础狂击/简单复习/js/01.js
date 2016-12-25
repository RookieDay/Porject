   function $(id) {
       return document.getElementById(id);
   }

   var inpQQ = $("inp1");
   var inpMobile = $("inp2");
   var inpEmail = $("inp3");
   var inpTel = $("inp4");
   var inpName = $("inp5");

   var regQQ = /^[1-9]\d{4,10}$/;
   var regMobile = /^(13[0-9]|14[57]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
   var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
   var regTel = /^0\d{2,3}-\d{7,8}$/;
   var regName = /^[\u4e00-\u9fa5]{2,}$/;


   check(inpName, regName);
   check(inpQQ, regQQ);
   check(inpMobile, regMobile);
   check(inpEmail, regEmail);
   check(inpTel, regTel);

   function check(inp, regEx) {
       inp.onblur = function() {
           if (regEx.test(this.value)) {
               this.nextSibling.innerHTML = "输入正确";
               this.nextSibling.className = "right";
           } else {
               this.nextSibling.innerHTML = "输入错误";
               this.nextSibling.className = "wrong";
           }
       }
   }