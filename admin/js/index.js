$(function () {
  $.ajax({
    type: "get",
    url: `${BigNew.user_info}`,
    headers: {
      Authorization: localStorage.getItem('key'),
    },
    dataType: "json",
    success: function (response) {
      console.log(response.data.userPic);
      $('.user_center_link img').attr({ src: response.data.userPic })
      $('.user_info img').attr({ src: response.data.userPic })
      $('.user_info span strong').html(response.data.nickname)
    }
  });
  //退出
  $('.logout').click(function (e) {
    // 删除本地存储的数据
    localStorage.removeItem('key');
    // 跳回登录页
    location.href = "./login.html";
  })
  // console.log(BigNew)
    //设置二级目录选中效果
    $('.level02 li').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
    })
  //创建点击事件左侧导航栏
  $('.level01').click(function () {
    // 排他思想
    $(this).addClass('active').siblings().removeClass('active');
    //判断点击相邻的属性为level02的属性时，返回true
    if ($(this).next().hasClass('level02')) {
      $(this).next().slideToggle();
      //使这个三角旋转
      $(this).find('b').toggleClass('rotate0');
      //当点击“文件管理”，默认选中第一个li
      $('.level02 li a').first().click();
    } else {
      $('.level02 li').removeClass('active')
    }

  })
  $('a[target="main_frame"]').click(function(e){
    e.preventDefault();
    console.log('被点击了');
    $('iframe').attr({
      name: 'user',
      src: 'user.html'
    })

  })
})