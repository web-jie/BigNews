$(function () {
  console.log(window.location.search.split('=')[1]);
  const bianId = window.location.search.split('=')[1];
  if (bianId == undefined) {
    alert('没有数据，返回主页')
    location.href = './index.html'
  }
  $.ajax({
    type: "get",
    url: BigNew.category_list,
    dataType: "json",
    success: function (response) {
      console.log(response)
      $('.category').html(template('options', response))
    }
  });

  $.ajax({
    type: "get",
    url: BigNew.article_search,
    data: {
      id: bianId,
    },
    dataType: "json",
    success: function (response) {
      console.log(response);
      if (response.code == 200) {
        console.log(1111);

        const title = response.data.title;
        const cover = response.data.cover;
        const date = response.data.date;
        const content = response.data.content;

        $(".col-sm-10 #inputTitle").val(title);
        $('.article_cover').attr({ src: cover });
        // 点击显示日期选择器
        jeDate("#myDate", {
          // 是否初始化当前时间
          // isinitVal: true,
          // 日期的格式
          format: 'YYYY-MM-DD'
        });
        fuText()
        // 设置富文本内容的代码
        // tinymce.activeEditor.setContent()
        // 获取富文本内容，需要接收返回值
        // tinymce.activeEditor.getContent()
      }
    }
  });
  function fuText(){
    tinymce.init({
      selector: '#mytextarea',
      language: 'zh_CN',
      directionality: 'ltr',
      browser_spellcheck: true,
      contextmenu: false,
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste imagetools wordcount",
        "code"
      ],
      toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",

    });
  }

})