$(function () {  
  // 1-页面一加载,发送ajax请求并渲染一级分类数据
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function (info) {  
      // console.log(info);
      $(".main_left ul").html(template("firstTpl",info));
      // 渲染第一个一级分类对应的二级分类
      var id = info.rows[0].id;
      renderSecond (id);
    }
  });

  // 2-封装一个渲染二级分类的函数
  function renderSecond(id) { 
  $.ajax({
    type:"get",
    url:"/category/querySecondCategory",
    data:{
      id:id
    },
    success:function (info) {  
      // console.log(info);
      $(".main_right ul").html(template("secondTpl",info));
    }
  });

  }

  // 3-点击一级分类,二级分类的内容跟着显示出来(委托事件)
  $(".main_left ul").on("click","li",function () { 
    $(this).addClass("now").siblings().removeClass("now"); 
    var id = $(this).data("id");
    // console.log(id);
    renderSecond(id);
    //500毫秒滚动到顶
    mui('.main_right .mui-scroll-wrapper').scroll().scrollTo(0,0,500);
  });


});