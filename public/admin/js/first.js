$(function () { 
  // 查询一级分类列表 
  var page = 1;
  var pageSize = 3;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data:{
        page : page,
        pageSize : pageSize
      },
      success: function (info) {   
      // console.log(info);
        $("tbody").html(template("tpl",info));
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

// 添加一级分类功能
// 1-点击添加按钮,显示模态框
  $(".btn_add").on("click",function () {  
    $("#addModal").modal("show");
  });

  // 2-校验表单
  $("form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators: {
          notEmpty: {
            message: '一级分类名称不能为空'
          }
        }
      }
    }
  });

// 2-发送ajax请求数据,重新渲染页面
  $("form").on('success.form.bv', function (e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("form").serialize(),
      success:function (info) {  
        // console.log(info);
        page = 1;
        render();
        $("#addModal").modal("hide");
        $("form").data('bootstrapValidator').resetForm(true);
      }
    });
  });


});