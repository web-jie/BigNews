$(function () {
  function getListRender() {
    $.ajax({
      type: "get",
      url: BigNew.category_list,
      dataType: "json",
      success: function (response) {
        $('tbody').html(template('sprose', response.data))
      }
    });
  }
  //调用函数，把数据渲染到页面中
  getListRender();
  //创建新增按钮，弹出模态框
  $('.btn-success').click(function (e) {
    //  e.preventDefault()

    $('#myModal').modal('show');
    //触发此事件就改变第二个按钮的颜色
    $('.modal-footer button').eq(1).attr('class', 'btn btn-success')
  })
  //当触发显示模态框时触发这个
  $('#myModal').on('show.bs.modal', function (e) {
    // do something...
    // console.log(1111);

  })
  $('#myModal').on('hide.bs.modal', function (e) {
    // do something...
    // console.log(1111);

  })
  //当点击取消按钮时，清空内部内容
  $('.btn-default').click(function (e) {
    console.log(1111);
    //当此事件触发就清除内部内容
    $('form')[0].reset()
  })


  // 当点击新建把内容上传到数据库内
  $(".modal-footer button").eq(1).click(function (e) {
    // console.log(1111);
    if ($(this).text().trim() == '新增分类') {
      $.ajax({
        type: "post",
        url: BigNew.category_add,
        data: {
          name: $('.form-group input').eq(0).val().trim(),
          slug: $('.form-group input').eq(1).val().trim(),
        },
        dataType: "json",
        success: function (response) {
          if(response.code === 201){
            $('#myModal').modal('hide');
            getListRender();
          }
        }
      });
    }
  })
  //当点击编辑按钮显示模态框
  $("tbody").on('click','.btn-info',function(e){
    $('#myModal').modal();
    const id = $(this).attr('data-id');
    $('.modal-footer button').eq(1).text('编辑').attr('class','btn btn-info').attr('data-id',id)
    const name = $(this).parents('tr').children().eq(0).text().trim();
    const slug = $(this).parents('tr').children().eq(1).text().trim();
    $('#inputEmail3').val(name);
    $('#inputPassword3').val(slug);

  })
  //当点击编辑的按钮时就
  $('.modal-footer button').eq(1).click(function(e){
    // console.log(id);
    
    $.ajax({
      type: "post",
      url: BigNew.category_edit,
      data: {
        name: $('#inputEmail3').val().trim(),
        slug:$('#inputPassword3').val().trim(),
        id:$('.modal-footer button').eq(1).attr('data-id'),
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        if(response.code === 200){
          $('#myModal').modal('hide');
          getListRender();
        }
      }
    });
  })
  //创建删除事件
  $("tbody").on('click','.btn-danger',function(e){
    console.log(1111)
    console.log($(this).attr('data-id'));
    const id =  $(this).attr('data-id');
    $.ajax({
      type: "post",
      url: BigNew.category_delete,
      data: {
        id: id,
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        if(response.code === 204){
          $('#myModal').modal();
          $('.modal-body').html('删除成功');
          $('.modal-footer').html(`<button type="button" class="btn btn-primary">确定</button>`)
          $('.btn-primary').click(function(){
            $('#myModal').modal('hide');
          })
          getListRender();
        }
      }
    });
  })
})
