$(function(){
  $.ajax({
    type: "get",
    url: "http://localhost:8080/api/v1/admin/user/info",
    headers: {
      Authorization: localStorage.getItem('key'),
    },
    dataType: "json",
    success: function (response) {
      console.log(response.data.userPic);
      $('.user_center_link img').attr({src: response.data.userPic})
      $('.user_info img').attr({src:response.data.userPic})
      $('.user_info span strong').html(response.data.nickname)
    }
  });
//退出
$('.logout').click(function(e){
  // 删除本地存储的数据
  localStorage.removeItem('key');
  // 跳回登录页
  location.href = "./login.html";
})


})