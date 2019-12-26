$(document).ready(function() {

   // <!--basic line echarts init-->

   
  //  <!--Rainfall and Evaporation echarts init-->



  //  <!--Negative Bar echarts init-->


  //  <!--Basic Pie echarts init-->

    var dom1 = document.getElementById("basic_Pie_chart");
    var bpChart = echarts.init(dom1);

    var app = {};
    option = null;
    option = {
        color: ['#328dff','#3dba6f', '#fe413b','#fab63f', '#18b9d4' ],
        tooltip : {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['Direct','Mail','Affiliate','AD','Search']
        },
        calculable : true,
        series : [
            {
                name:'Source',
                type:'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'Direct'},
                    {value:310, name:'Mail'},
                    {value:234, name:'Affiliate'},
                    {value:135, name:'AD'},
                    {value:1548, name:'Search'}
                ]
            }
        ]
    };

    if (option && typeof option === "object") {
        bpChart.setOption(option, false);
    }

   

    /**
     * Resize chart on window resize
     * @return {void}
     */
    window.onresize = function() {
      //  chartOne.resize();
      //  myChart.resize();
        rainChart.resize();
       // nbChart.resize();
        bpChart.resize();
       // npChart.resize();
       // dnutChart.resize();
       // bsChart.resize();
    };


});
