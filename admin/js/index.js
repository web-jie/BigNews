$(function(){
  $.ajax({
    type: "get",
    url: `${BigNew.user_info}`,
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
// console.log(BigNew)

//创建点击事件左侧导航栏
$('.level01').click(function(){
  // 排他思想
  $(this).addClass('active').siblings().removeClass('active');
  //判断点击相邻的属性为level02的属性时，返回true
  if($(this).next().hasClass('level02')){
    $(this).next().slideToggle();
    $(this).find('b').toggleClass('rotate0');
    $('.level02 li').first()[0].click();
}else{
  $('.level02>li').removeClass('active')
}
//设置二级目录选中效果
$('.level02 li').click(function(){
  $(this).addClass('active').siblings().removeClass('active');
})
})
})