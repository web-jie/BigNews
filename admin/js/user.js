$(function(){
  $('#exampleInputFile').change(function(){
    const file = this.files[0];
    const url = URL.createObjectURL(file);
    $('.user_pic').attr('src', url);
  })
})