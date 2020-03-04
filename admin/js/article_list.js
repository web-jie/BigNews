$(function () {
  $.ajax({
    type: "get",
    url: BigNew.category_list,
    dataType: "json",
    success: function (response) {
      console.log(response);
      if (response.code == 200) {
        const htmlStr = template('category_list', response.data)
        $('#selCategory').html(htmlStr)
      }
    }
  });
  let key = '';
  let type = '';//文章类型
  let state = '';//文章状态
  let page = 1;//默认从第一页开始
  let perpage = 3;//默认每页5条消息
  // 创建筛选点击事件
  $('#btnSearch').click(function (e) {
    e.preventDefault();
    //当点击所有分类时的
    type = $('#selCategory').val();
    //当点击所有状态时
    state = $('#selStatus').val();
    console.log('两个下拉框的' + type, state);
    getAjaxs();

  })
  $('#btnSearch').click()
  function getAjaxs() {
    $.ajax({
      type: "get",
      url: BigNew.article_query,
      data: {
        key: key,
        type: type,
        state: state,
        page: page,
        perpage: perpage,
      },
      dataType: "json",
      success: function (response) {
        console.log(response)
        if (response.code == 200) {
          $('.table tbody').html(template('query_list', response));
          const total = response.data.totalPage;
          console.log(total);
          createPagination(total, page)
        }
      }
    });
  }
  function createPagination(totalPages, startPage) {
    // 创建一个分页并销毁
    $('#pagination').twbsPagination('destroy');
    //创建一个新的分页
    $('#pagination').twbsPagination({
      // 总页数
      totalPages: totalPages,
      // 当前显示第几页
      startPage: startPage,
      // 可见的页数上限
      visiblePages: 7,
      // 把默认的四个英文按钮修改成中文
      first: '首页',
      prev: '上一页',
      next: '下一页',
      last: '尾页',
      // 当页码点击时候触发的回调函数
      // 注意事项：分页器会自动帮我们触发一下 startPage 当前页
      onPageClick: function (event, currentPage) {
        console.log('currentPage', currentPage);
        // 把当前点击的页数，赋值给公共的 page 变量中，作为新的 ajax 请求参数
        page = currentPage;
        // 只有在 startPage(当前页) 和 currentPage(点击页) 不一样的时候再获取新数据
        if (startPage != currentPage) {
          // 再次发起 ajax 请求，根据点击的当前页获取到新的列表
          getAjaxs();
        }
      }
    })
  }
  //删除数据，需要借用事件委派。
  $(".table tbody").on('click','.delete',function(){
    console.log(this);
    const delId = $(this).attr('data-id');
    $.ajax({
      type: "post",
      url: BigNew.article_delete,
      data: {
        id: delId,
      },
      dataType: "json",
      success: function (response) {
        console.log(response);
        if(response.code == 204){
          if($('tbody tr').length == 1){
            page -= 1;
          }
          getAjaxs();
        }
      }
    });

  })


})