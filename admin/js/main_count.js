$(function(){
  //折线图
  function loadEchars(myData1,myData2){
    var myChart = echarts.init(document.getElementById('curve_show'));
    option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: '月新增文章数',
        },

        xAxis: {
            name: '日',
            type: 'category',
            boundaryGap: false,
            //存放数据x轴
            data: myData1
        },
        legend: {
            data: ['新增文章'],
            top: '40'
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            },
            right: 50
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        series: [
            {
                name: '新增文章',
                type: 'line',
                smooth: true,
                // symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: '#f80'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255,136,0,0.39)'
                    }, {
                        offset: .34,
                        color: 'rgba(255,180,0,0.25)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(255,222,0,0.00)'
                    }])
                },
                // y轴
                data: myData2
            }
        ],
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
  $.ajax({
    type: "get",
    url: BigNew.data_article,
    dataType: "json",
    success: function (response) {
      console.log(response);
      if(response.code == 200){
      const myData1 =   response.date.map(item=>{
          return item.date
        })
      const myData2 = response.date.map(item=>{
        return item.count
      })
      loadEchars(myData1,myData2)
      }
    }
  });



})