<template>
    <div class="container approval-monitor vehicle-monitor-content">
        <div class="tableNav inc monitor-nav">
            <div class="useraccountForm">
                <div class="searchUserForm">
                    <form class="form-inline" id="search-form" onsubmit="return false;" data-do="select-area">
                        <div class="form-group wd10 pdr20">
                            <select class="form-control" name="putin_area" id="area-datas" v-model="selectedArea" @change="changeMap">
                                <option v-for="area in areaData" :value="area.id" :key="area.id" :data-latitude="area.latitude" :data-longitude="area.longitude" :selected="{true: (area.name == '江干区')}">{{area.name}}</option>
                            </select>
                        </div>
                        <div class="form-group wd15 pdr20">
                            <select class="form-control" name="bike_type" style="width: 100%" id="type-datas" v-model="selectedBikeType">
                                <option v-for="type in bikeTypeData" :value="type.id" :key="type.id">{{type.name}}</option>
                            </select>
                        </div>
                        <div class="form-group wd30 pdr20">
                        <input  style="width: 100%;" class="form-control" v-model="selectedBikeNo" name="bike_no" type="text"  placeholder="通过订单编号查询关联的电动车" />
                        </div>
                        <div class="form-group wd10">
                        <button style="width: 100%;" type="button" @click="doSearch" class="color-F7AC36 pull-right btn btn-primary btn-search">查询</button>
                        </div> 
                        <div class="clear_both"></div>
                    </form>
                </div>
            </div>
        </div>
        <div class="form-hr"></div>
        <div class="blank"></div>
        <div id="map-content">
            <div id="outer-box" style="position: relative; height: 100%">
                <div id="container" class="map-container">
                </div>
                <div id="panel" style="display: none;">
                    <div id="intro">
                        <h3>render(data)</h3>
                    </div>
                    <ul id="my-list"></ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {areaDatas, bikeTypeDatas} from '../common/static_data.js';
    import { AMapManager } from 'vue-amap';
    import { lazyAMapApiLoaderInstance } from 'vue-amap';
    import jumpLogin from '../common/jumpLogin.js';
    import FormData from '../common/FormData.js';
    import $ from 'jquery';
    import _ from 'lodash';
    import bike_icon from '../../../static/img/bike1.png';
    import bike_selected from '../../../static/img/bike-selected.png';
    export default {
        name: 'vehiclemonitor',
        data: () => ({
            bike_icon: bike_icon,
            bike_selected: bike_selected,
            areaData: [],
            bikeTypeData: [],
            bikeTypeData: [],
            selectedBikeType: '01',
            selectedBikeNo: '',
            selectedArea: '315002',
            selectedDatas: {}
        }),
        methods: {
            areaDatas: areaDatas,
            bikeTypeDatas: bikeTypeDatas,
            jumpLogin: jumpLogin,
            getDatas: function() {
                var self = this;
                const url = API_PATH + '/web/bike.action';
                var lant = this.map.getBounds().getSouthWest();
                var lent = this.map.getBounds().getNorthEast();
                var data = FormData('#search-form');
                data.pageStar = 1;
                data.pageSize = 10;
                data.src_latitude = lant.lat;
                data.src_longitude = lant.lng;
                data.dest_latitude = lent.lat;
                data.dest_longitude = lent.lng;
                data = JSON.stringify(data);
                this.$axios.get(url, {
                    params: {
                        action: 'mapbound',
                        data: data
                    }
                }).then(response => {
                    response = response.data;
                    if(response.errorCode === 0) {
                        response = response.data;
                        _.each(response, function(item) {
                            item.position = [item.current_longitude, item.current_latitude];
                            item.id = item.bike_no;
                        });
                        var srcImg = self.bike_icon;
                        if (response.length != 0) {
                            self.markerList.render(response);
                        }
                    } else if(response.errorCode === 1) {
                        jumpLogin();
                    } else if(response.errorCode === -1) {

                    }
                });
            },
            doSearch: function() {
                this.getDatas();
            },
            changeMap: function() {
                var latitude = $('[name="putin_area"] option:selected').attr('data-latitude'); //纬度
                var longitude = $('[name="putin_area"] option:selected').attr('data-longitude'); //经度
                this.map.setCenter([longitude, latitude]);
                this.map.setZoom(16);
            }
        },
        components: {
            AMapManager: AMapManager
        },
        mounted: function() {
            var self = this;
            lazyAMapApiLoaderInstance.load().then(() => {
                // your code ...
                this.map = new AMap.Map('container', {
                    center: [120.254555, 30.311626],
                    zoom: 15
                });
                AMap.plugin('AMap.Geocoder',function(){
                    var geocoder = new AMap.Geocoder({
                        city: "010"//城市，默认：“全国”
                    });
                    self.geocoder = geocoder;
                });
                AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker'], function(MarkerList, SimpleMarker) {

                    var markerList = new MarkerList({
                        //关联的map对象
                        map: self.map,

                        icon: self.bike_icon,
                        //列表的dom容器的id
                        listContainer: 'my-list',

                        //选中状态（通过点击列表或者marker）时在Marker和列表节点上添加的class，可以借此编写css控制选中时的展示效果
                        selectedClassNames: 'bike-selected',

                        //返回数据项的Id
                        getDataId: function(dataItem, index) {
                            //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
                            return dataItem.id;
                        },
                        //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.79, 39.90]
                        getPosition: function(dataItem) {
                            return dataItem.position;
                        },
                        //返回数据项对应的Marker
                        getMarker: function(dataItem, context, recycledMarker) {

                            //marker的标注内容
                            var content = dataItem.markerLabel;

                            var label = {
                                offset: new AMap.Pixel(16, 18), //修改label相对于marker的位置
                                content: content
                            };

                            //存在可回收利用的marker
                            if (recycledMarker) {
                                //直接更新内容返回
                                // recycledMarker.setIconLabel(context.id);
                                var iconStyle = self.bike_icon;
                                recycledMarker.setIconStyle(iconStyle);
                                return recycledMarker;
                            }

                            return new SimpleMarker({
                                containerClassNames: 'my-marker',
                                iconStyle: self.bike_icon,
                            });
                        },
                        //返回数据项对应的infoWindow
                        getInfoWindow: function(dataItem, context, recycledInfoWindow) {

                            var bikeStateMap = {
                                0: '删除',
                                1: '空闲',
                                2: '使用中',
                                3: '损坏'
                            }
                            var bikeTypeMap = {
                                '01': '小牛电动车'
                            };  

                            // AMap.plugin('AMap.Geocoder',function(){
                            //         var geocoder = new AMap.Geocoder({
                            //             city: "010"//城市，默认：“全国”
                            //         });
                            //         geocoder.getAddress(dataItem.position ,function(status,result) {
                            //               if(status=='complete'){
                            //                  dataItems.address = result.regeocode.formattedAddress;
                            //               }else{

                            //               }
                            //          });
                            // });
                            
                            var bike_no = '.' + dataItem.bike_no;

                            self.geocoder.getAddress(dataItem.position ,function(status,result) {
                                if(status=='complete'){
                                    var address = result.regeocode.formattedAddress;
                                    $(bike_no).text(address);
                                }else{

                                }
                            });
                            if (bikeStateMap[dataItem.bike_state] != undefined) {
                                dataItem.bike_state = bikeStateMap[dataItem.bike_state];
                            }
                            
                            if (bikeTypeMap[dataItem.bike_type] != undefined) {
                                dataItem.bike_state = bikeTypeMap[dataItem.bike_type];
                            }

                            // var tpl = '<p value="<%- dataItem.number %>">编号：<%- dataItem.bike_no %><p>\
                            //        <p>型号：<%- dataItem.bike_type %><p>\
                            //        <p>状态：<%- dataItem.bike_state %><p>\
                            //        <p>位置：<%- dataItem.place %><p>\
                            //        <p>电量：<%- dataItem.total_charge %><p>\
                            //        <button class="btn btn-default btn-modify" >修改</button>\
                            //        <% if(dataItem.bike_state == 1 && dataItem.be_locked == 0) {%><button class="btn btn-default btn-lock" data-bike-no="<%- dataItem.bike_no %>" data-bike-state="<%- dataItem.bike_state %>" data-be-locked="<%- dataItem.be_locked %>">锁车</button><%}%>\
                            //        <button class="btn btn-default btn-delete" data-bike-no="<%- dataItem.bike_no %>">删除</button>';
                            //        
                            var tpl = '<p>编号：<%- dataItem.bike_no %><p>\
                                <p>型号：<%- dataItem.bike_type %><p>\
                                <p>状态：<%- dataItem.bike_state %><p>\
                                <p>位置：<span class="<%- dataItem.bike_no %>"><%- dataItem.address %><span><p>\
                                <p>电量：<span <% if(dataItem.total_charge <= 30) {%> style="color: red;"<% }%>><%- dataItem.total_charge %>%</span><p>';      
                            

                            //MarkerList.utils.template支持underscore语法的模板
                            var content = MarkerList.utils.template(tpl, {
                                dataItem: dataItem,
                                dataIndex: context.index
                            });


                            if (recycledInfoWindow) {
                                //存在可回收利用的infoWindow, 直接更新内容返回
                                recycledInfoWindow.setContent(content);
                                return recycledInfoWindow;
                            }

                            //返回一个新的InfoWindow
                            return new AMap.InfoWindow({
                                offset: new AMap.Pixel(0, -23),
                                content: content
                            });

                        },
                        //返回数据项对应的列表节点
                        getListElement: function(dataItem, context, recycledListElement) {

                            var tpl = '<p>编号：<%- dataItem.number %><p>';

                            var content = MarkerList.utils.template(tpl, {
                                dataItem: dataItem,
                                dataIndex: context.index
                            });

                            if (recycledListElement) {
                                //存在可回收利用的listElement, 直接更新内容返回
                                recycledListElement.innerHTML = content;
                                return recycledListElement;
                            }

                            //返回一段html，MarkerList将利用此html构建一个新的dom节点
                            return '<li>' + content + '</li>';
                        }

                    });

                    //构建一个数据项数组，数据项本身没有格式要求，但需要支持getDataId和getPosition

                    self.markerList = markerList;
                    self.getDatas();

                    //监听选中改变
                    markerList.on('selectedChanged', function(event, info) {
                        self.selectedDatas = info.selected;
                        //重复选中，取消当前选中
                        if (info.selected) {
                            if (info.selected.marker) {
                                var src = self.bike_selected;
                                $(info.selected.marker.G.content).find('img').attr('src', src);
                            }
                            if (info.unSelected) {
                                var src = self.bike_icon;
                                $(info.unSelected.marker.G.content).find('img').attr('src', src);
                            }
                        }

                        // console.log(event, info);
                    });

                    //监听Marker和ListElement上的点击
                    markerList.on('markerClick listElementClick', function(event, record) {

                        console.log(event, record);
                    });
                });
                setInterval(self.getDatas, 1000*60);
                self.map.on('zoomend', function() {
                    self.getDatas();
                });
            });
            this.areaDatas();
            this.bikeTypeDatas();
        }
    }
</script>

<style>
    @import 'http://cache.amap.com/lbs/static/main1119.css';
    #app {
        height: 100%;
    }
    .wrapper {
        height: 100%;
    }
    .amap-copyright {
        display: none!important;
    }
    .vehicle-monitor-content {
        padding-left: 40px;
        padding-right: 20px;
    }
    .amap-info-content p {
        margin: 0 0 10px;
    }
</style>


