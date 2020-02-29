$(function(){
  $.ajax({
    type: "get",
    url: BigNew.user_detail,
    dataType: "json",
    headers: {Authorization: localStorage.getItem('key')},
    success: function (response) {
      console.log(response);
      for (let key in response.data){
        $('input.'+key).val(response.data[key])
      }
      $('.user_pic').attr({src: response.data.userPic})
    }
  });
//文件浏览
$('#exampleInputFile').change(function(){
  const file = this.files[0];
  
  let url = URL.createObjectURL(file);
  console.log(url);
  $('.user_pic').attr('src',url)
})

//上传数据
$('.btn-success').click(function(e){
  e.preventDefault()
  let fd = new FormData(this.form);
  $.ajax({
    type: "post",
    url: BigNew.user_edit,
    data: fd,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (response) {
      console.log(response)
     if(response.code === 200){
      let imgSrc = $('img.user_pic').attr('src');
      let nickname = $('.nickname').val().trim();
      window.parent.$('.user_info img, .user_center_link img').attr('src',imgSrc)
      window.parent.$('.user_info span strong')
     }
    }
  });
})
})