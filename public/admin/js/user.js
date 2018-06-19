$(function () { 

  var page = 1;
  var pageSize = 8;
  // 发送ajax请求 渲染用户管理界面
  render();
// 封装渲染函数
  function render() {  
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {  
        // console.log(info);
        var html = template("tpl",info);
        $("tbody").html(html);
        // 设置分页栏的样式
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage: page,
          totalPages: Math.ceil(info.total/info.size),
          onPageClicked:function (a,b,c,p) {
            page = p;
            render();
          }
        });

        
      }
  
    });
  }

  // 给操作栏的按钮设置点击事件(委托事件)
  $("tbody").on("click",".btn",function () {  
    $("#userModal").modal("show");
    // 获取参数
    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-danger")?0:1;
    // 发送ajax请求,获取更新后的数据重新渲染
    $(".btn_update").on("click",function () {  
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete :isDelete
        },
        success:function (info) {  
          if(info.success){
            // 请求成功,隐藏模态框,并重新渲染
            render();
            $("#userModal").modal("hide");

          }
        }
      })
    })
  });
  


 
});