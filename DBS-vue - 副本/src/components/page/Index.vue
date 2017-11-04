<template>
    <div>
        <ol class="breadcrumb" style="background-color: #fff;">
            <li class="active" style="margin-left: 25px;">首页</li>
        </ol>
        <div class="main">
                <div class="container">
                    <div>
                        <!-- 基础指标 -->
                        <div id="summary" class="panel-body-header">
                            <div class="panel-body-header-block pad10">
                                <a class="color-75D1B2 order">
                                    <h5 class="order-type">今日订单总数</h5>
                                    <h2 class="order-num">999</h2>
                                </a>
                            </div>
                            <div class="panel-body-header-block pad10">
                                <a class="color-79BBD1 order">
                                    <h5 class="order-type">今日订单总金额</h5>
                                    <h2 class="order-num">888</h2>
                                </a>
                            </div>
                            <div class="panel-body-header-block pad10">
                                <a class="color-DBA0B9 order">
                                    <h5 class="order-type">累计订单数</h5>
                                    <h2 class="order-num">777</h2>
                                </a>
                            </div>
                            <div class="panel-body-header-block pad10">
                                <a class="color-E8A48F order">
                                    <h5 class="order-type">累计订单总金额</h5>
                                    <h2 class="order-num">666</h2>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="blank"></div>
                    <div class="blank"></div>
                    <div class="row" style="margin-right: 0;">
                        <div class="col-md-6">
                            <div class="chart" style="height:300px;"></div>
                        </div>
                        <div class="col-md-6">
                            <div class="chart1" style="height:300px;"></div>
                        </div>
                    </div>
                    <div class="blank"></div>
                    <div class="blank"></div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="chart2" style="height:300px;"></div>
                        </div>
                        <div class="col-md-6">
                            <div class="chart3" style="height:300px;"></div>
                        </div>
                    </div>
                    
                </div>
            </div>
    </div>
</template>
<script>
    import $ from 'jquery';
    import echarts from 'echarts';

    // import vSchart from 'vue-schart';
    // import IEcharts from 'vue-echarts-v3/src/lite.vue';
  
    // import 'echarts/lib/chart/bar';
    // import 'echarts/lib/chart/line';
    // import 'echarts/lib/chart/pie';
    // import 'echarts/lib/component/legend';
    // import 'echarts/lib/component/tooltip';
    // import 'echarts/lib/component/title';
    export default {
        data: () => ({
            line: {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['日活趋势图'],
                    selectedMode: false,
                    bottom: 0
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    axisLabel: {
                        //X轴刻度配置
                        formatter: '0',
                        interval: 1000 //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            width: 0.5
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc',
                        }
                    },
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '',
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            type: 'dashed',
                            width: 0.5
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc', //左边线的颜色
                        }
                    },
                }],
                series: [{
                    name: '日活趋势图',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(3,165,194,0.20)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,132,207,0.00)'
                            }])
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#03A5C2',
                            lineStyle: {
                                color: '#03A5C2'
                            }
                        }
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                }]
            }
        }),
        methods: {
            setEcharts: function() {
                var option1 = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['日活趋势图'],
                        selectedMode: false,
                        bottom: 0
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        axisLabel: {
                            //X轴刻度配置
                            formatter: '0',
                            interval: 1000 //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                width: 0.5
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ccc',
                            }
                        },
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: '',
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                type: 'dashed',
                                width: 0.5
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ccc', //左边线的颜色
                            }
                        },
                    }],
                    series: [{
                        name: '日活趋势图',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(3,165,194,0.20)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,132,207,0.00)'
                                }])
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#03A5C2',
                                lineStyle: {
                                    color: '#03A5C2'
                                }
                            }
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    }]
                };
                var chart = echarts.init(
                    $('.chart')[0]
                ); 
                var chart1 = echarts.init(
                    $('.chart1')[0]
                );
                var chart2 = echarts.init(
                    $('.chart2')[0]
                );
                var chart3 = echarts.init(
                    $('.chart3')[0]
                );

                chart.setOption(option1, true);

                chart1.setOption(option1, true);

                chart2.setOption(option1, true);

                chart3.setOption(option1, true);
            }
        },
        mounted: function() {
            this.setEcharts();
        }   
    }
</script>

<style scoped>
    .color-75D1B2 {
		background-color: #75D1B2;
		color: #fff;
	}
	.color-79BBD1 {
		background-color: #79BBD1;
		color: #fff;
	}
	.color-DBA0B9 {
		background-color: #DBA0B9;
		color: #fff;
	}
	.color-E8A48F {
		background-color: #E8A48F;
		color: #fff;
	}
	#summary h2, #summary h5 {
		color: #fff;
        padding-bottom: 10px;
	}
	.pad10 {
		padding: 0 20px;
	}
	.row {
		margin: 0px;
	}
</style>

