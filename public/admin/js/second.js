$(function () {  
  var page = 1;
  var pageSize = 5;
  // 封装函数
  function render() {  
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {  
        // console.log(info);
        $("tbody").html(template("tpl",info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function (a,b,c,p) { 
            page = p;
            render();
          }
        });
      }
    });
  }


  // 一：查询二级分类
  render();

  // 二：添加二级分类

  // 1-点击添加按钮,显示模态框,并发送ajax请求获取下拉框的内容
  $(".btn_add").on("click",function () {  
    $("#addModal").modal("show");
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      success:function (info) {  
        // console.log(info);
        $(".dropdown-menu").html(template("tpl2",info));
      }
    });
  });
 
// 2-让下拉框变为可选

  // (注册委托事件,操作id和文本)
  $(".dropdown-menu").on("click","a",function () { 
    // 将选中的文字设置给button 
    var txt = $(this).text();
    $(".dropdown-text").text(txt)
    // 将选中的选项对应的id设置给隐藏的name为categoryId的input框
    var id = $(this).data("id");
    $("[name='categoryId']").val(id);
    // 手动设置让隐藏部分的表单校验通过
    $("form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  });

  // 3-图片上传功能
  $("#fileupload").fileupload({
    dataType: 'json', //返回的结果的类型是json
    //e :事件对象
    //data: 上传后的结果
    done: function (e, data) {//图片上传后的回调函数

      //获取到地址后，需要干什么？？？？
      console.log(data.result.picAddr);
      //修改img_box下的img的src
      $(".img_box img").attr("src", data.result.picAddr);

      //给brandLogo赋值
      $("[name='brandLogo']").val(data.result.picAddr);

      //让brandLogo校验通过
      $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
  $("form").bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty: {
            message: '请输入一级分类的名称'
          }
        }
      },
      brandName:{
        validators: {
          notEmpty: {
            message: '请输入二级分类的名称'
          }
        }
      },
      brandLogo:{
        validators: {
          notEmpty: {
            message: '请输入二级分类的图片'
          }
        }
      }
    }
  });

  // 5-发送ajax请求数据,重新渲染页面
  $("form").on('success.form.bv', function (e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("form").serialize(),
      success:function (info) {  
        // console.log(info);
        page = 1;
        render();
        $("#addModal").modal("hide");
        $("form").data('bootstrapValidator').resetForm(true);
        $(".dropdown-text").text("请选择一级分类");
        $(".img_box img").attr("src","images/none.png");
      }
    });
  });

  



});