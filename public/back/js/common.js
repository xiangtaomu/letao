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