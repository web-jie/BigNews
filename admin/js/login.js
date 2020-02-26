$(function(){
  //给按钮创建点击事件
  $('.input_sub').click(function(e){
    e.preventDefault();
    const username = $('.input_txt').val().trim();
    const pwd = $('.input_pass').val().trim();


    if(username === ''|| pwd === ''){
      $('.modal').modal();
      $('.modal-body p').html("输入不能为空！");
      return;
    }else{
      $.ajax({
        type: "post",
        url: "http://localhost:8080/api/v1/admin/user/login",
        data: {
          username: username,
          password: pwd,
        },
        dataType: "json",
        success: function (response) {
          console.log(response);
          if(response.code === 200){
            localStorage.setItem('key',response.token);
            location.href = './index.html';
          }else{
            $('.modal').modal()
            $('.modal-body p').html(response.msg);
          }
        }
      });
    }
  })
})