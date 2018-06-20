$(function () {  
  var page = 1;
  var pageSize = 3;
  var imgs = [];

  // 封装成渲染函数
  function render() { 
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
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

// 一:加载数据,渲染结构
  render();

// 二:添加分类功能

  // 1-点击添加商品按钮,显示模态框,加载下拉框里的二级分类
  $(".btn_add").on("click",function () {  
    $("#addModal").modal("show");
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize: 100
      },
      success:function (info) {  
        console.log(info);
        $(".dropdown-menu").html(template("tpl2",info))
      }
    });
  });

  // 2-让下拉框里的内容可被选中,委托事件
  $(".dropdown-menu").on("click","li",function () { 
    // #将文本设置给button里的文本 
    var txt = $(this).text();
    $(".dropdown-text").text(txt);
    // ##将id设置给隐藏的input的文本,以便后面的获取
    var id = $(this).data("id");
    $("[name='brandId']").val(id);
    // ###手动设置让表单校验通过
    $("form").data("bootstrapValidator").updateStatus("brandId","VALID");
  });

  //3-上传图片
  $("#fileupload").fileupload({
    done:function (e,data) {
    // console.log(data.result);

      //  if(imgs.length >= 3){
      //   return;
      // } 此处判断需要等于号

    // 3-1将图片名字和地址放进图片数组里
      imgs.push(data.result);
    // 3-3上传的图片数量大于三
      if(imgs.length >3){
        return;
      } 

    // 3-2由于需要传多张,所以动态生成img标签,将获取的地址设置给img的src
      $(".img_box").append('<img src="'+data.result.picAddr+'" width="100" alt="">');
    
    
    // 3-4 当上传的图片数量超过三的时候,手动设置让表单校验成功
      if(imgs.length === 3){
        $("form").data("bootstrapValidator").updateStatus("tips","VALID");
      }


    }
  });

  // 4-表单校验
  $("form").bootstrapValidator({
    excluded: [],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品的库存"
          },
          regexp:{
            regexp:/^[1-9]\d{0,4}$/,
            message: '请输入正确的库存（1-99999）'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品的尺码"
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message: '请输入正确的尺码范围（xx-xx）'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品的原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品的现价'
          }
        }
      },
      tips: {
        validators: {
          notEmpty: {
            message: '请上传三张图片'
          }
        }
      },
    }
  });

  // 5-表单校验
  $("form").on("success.form.bv",function (e) {  
    e.preventDefault();
    // 拼串
    var parem = $("form").serialize();
    parem += "&picName1="+imgs[0].picName+"&picAddr1="+imgs[0].picAddr;
    parem += "&picName2="+imgs[1].picName+"&picAddr2="+imgs[1].picAddr;
    parem += "&picName3="+imgs[2].picName+"&picAddr3="+imgs[2].picAddr;

    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:parem,
      success:function (info) {  
        page = 1;
        render();
        $("#addModal").modal("hide");
        $("form").data("bootstrapValidator").resetForm(true);
        $(".dropdown-text").text("请选择二级分类");
        $(".img_box").remove("img");
      }
    });


  });





})