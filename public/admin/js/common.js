// 配置关闭进度环
NProgress.configure({
  showSpinner:false
});

// 所有ajax开始的时候,都会触发事件,闪过进度条
$(document).ajaxStart(function () {  
  // console.log("haha");
  NProgress.start();
});

$(document).ajaxStop(function () {  
  // NProgress.done();
  setTimeout(function () {  
    NProgress.done();
  },5000);
}); 

// 二级分类的显示与隐藏
$(".child").prev().on("click",function () {  
  $(this).next().slideToggle()
} );

// 侧边栏的显示与隐藏
$(".icon_menu").on("click",function () {  
  $(".lt_aside").toggleClass("now");
  $(".lt_main").toggleClass("now"); 
});

// 点击退出显示模态框
$(".icon_logout").on("click",function () {  
  $("#logoutModal").modal('show');
});
// 点击确认退出,发送ajax请求清除信息
$(".btn_logout").on("click",function () {  
  $.ajax({
    type:"get",
    url:"/employee/employeeLogout",
    success:function (info) {  
      if(info.success){
        location.href = "login.html";
      }
    }
  });
});
