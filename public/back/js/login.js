$(function () {
  var $form = $("form");

//  表单验证
  $form.bootstrapValidator({
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            min:3,
            max:9,
            message:'用户名长度必须在3到9之间'
          },
          callback:{
            message:"用户名错误"
          }
        }    
      },
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码长度必须在6到12之间'
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  }) ;

// 设置重置按钮功能
  $("[type='reset']").on("click",function () {  
    $form.data("bootstrapValidator").resetForm(true);
  });

// 阻止表单跳转,并发送ajax请求
  $form.on("success.form.bv",function (e) {  
  e.preventDefault();
  console.log("haha");
  $.ajax({
    type: "post",
    url: "/employee/employeeLogin",
    data: $("form").serialize(),
    dataType: "json",
    success: function (info) { 
      console.log(info);
      if(info.success){
        location.href = "index.html";
      }
      if(info.error===1000){
        $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
      }
      if(info.error===1001){
        $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
      }
    }
  }); 
  });





});