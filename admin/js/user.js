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
$('#exampleInputFile').on('change', function(){
  const file = this.files[0];
  const url = URL.createObjectURL(file);
  $('.user_pic').attr({src: url})
})
//上传数据
$('#form').on('submit',function(e){
  e.preventDefault();  //preventDefault
  console.log(this);
  $.ajax({
    type: "post",
    url: BigNew.user_edit,
    data: new FormData(this),
    contentType: false,
    processData: false,
    dataType: "json",
    headers:{
      Authorization: localStorage.getItem('key')
    },
    success: function (response) {
      // console.log(response);
      if(response.code === 200){
        $('.modal').modal();
        $('.modal-body p').html('修改成功');
        // 在此页面重新加载此页面
        window.parent.location.reload()
      }
      
    }
  });
  
})

})