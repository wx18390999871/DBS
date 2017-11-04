<template>
<div>
    <modal 
        title="添加" 
        :show.sync="showAdd"
        @ok="addBike"
        @cancel="cancel" 
        okText="确定"
        cancelText="取消"
        okClass="btn btn-default btn-primary"
        cancelClass="btn btn-default"
        force="true">
        <div class="modal-body">
            <form class="form-horizontal" method="post" id="add-form">
                <div class="form-group wd100">
                    <label for="inputSubject" class="col-sm-3 col-md-3col-lg-3 control-label">车辆编号</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <input type="text" class="form-control" id="inputSubject" name="bike_no" placeholder="请输入车辆编号">
                    </div>
                </div>
                <div class="form-group userMobile-group wd100">
                    <label for="inputUser" class="col-sm-3 col-md-3 col-lg-3 control-label">车辆型号</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <div class="userMobile">
                            <div class="add-user">
                                <select name="bike_type" class="form-control">
                                    <option value="">请选择</option>
                                    <option value="01">小牛电动车</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group wd100">
                    <label for="inputSubject" class="col-sm-3 col-md-3 col-lg-3 control-label">电量</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <input type="text" class="form-control" id="inputSubject" name="total_charge" placeholder="请输入车辆电量">
                    </div>
                </div>
                <div class="form-group wd100">
                    <label class="col-sm-3 col-md-3 col-lg-3 control-label">运行区域</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <select name="area_id" class="form-control">
                            <option value="">请选择</option>
                            <option value="311001">拱墅区</option>
                            <option value="311002">西湖区</option>
                            <option value="311003">余杭区</option>
                            <option value="311004">江干区</option>
                        </select>
                    </div>
                </div>
                <div class="clear_both"></div>
            </form>
        </div>
    </modal>
    <modal 
        title="修改" 
        :show.sync="showModify"
        @ok="modifyBike"
        @cancel="cancel" 
        okText="确定"
        cancelText="取消"
        okClass="btn btn-default btn-primary"
        cancelClass="btn btn-default"
        force="true">
        <div class="modal-body">
            <form class="form-horizontal" method="post" id="modify-form">
                <div class="form-group wd100">
                    <label for="inputSubject" class="col-sm-3 col-md-3 col-lg-3 control-label">车辆编号</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <input type="text" :value="bikeData.bike_no" class="form-control" id="inputSubject" name="bike_no" placeholder="请输入车辆编号">
                    </div>
                </div>
                <div class="form-group userMobile-group wd100">
                    <label for="inputUser" class="col-sm-3 col-md-3 col-lg-3 control-label">车辆型号</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <div class="userMobile">
                            <div class="add-user">
                                <select name="bike_type" class="form-control">
                                    <option value="">请选择</option>
                                    <option value="01" :selected="{true : (bikeData.bike_type == '01')}">小牛电动车</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group wd100">
                    <label for="inputSubject" class="col-sm-3 col-md-3 col-lg-3 control-label">电量</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <input type="text" :value="bikeData.total_charge" class="form-control" id="inputSubject" name="total_charge" placeholder="请输入车辆电量">
                    </div>
                </div>
                <div class="form-group wd100">
                    <label class="col-sm-3 col-md-3 col-lg-3 control-label">运行区域</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <select name="area_id" class="form-control">
                            <option value="">请选择</option>
                            <option value="311001" :selected="{true : (bikeData.area_id == '311001')}">拱墅区</option>
                            <option value="311002" :selected="{true : (bikeData.area_id == '311002')}">西湖区</option>
                            <option value="311003" :selected="{true : (bikeData.area_id == '311003')}">余杭区</option>
                            <option value="311004" :selected="{true : (bikeData.area_id == '311004')}">江干区</option>
                        </select>
                    </div>
                </div>
                <div class="clear_both"></div>
            </form>
        </div>
    </modal>
    <modal 
        title="查看" 
        :show.sync="showView"
        @ok="viewBike"
        @cancel="cancel" 
        okText="确定"
        cancelText="取消"
        okClass="btn btn-default btn-primary"
        cancelClass="btn btn-default"
        force="true">
        <div class="modal-body">
            <form class="form-horizontal" method="post" id="view-form">
                <div class="form-group wd100">
                    <label for="inputSubject" class="col-sm-3 col-md-3 col-lg-3 control-label">车辆编号</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <p class="pdt7">{{bikeData.bike_no}}</p>
                    </div>
                </div>
                <div class="form-group userMobile-group wd100">
                    <label for="inputUser" class="col-sm-3 col-md-3 col-lg-3 control-label">车辆型号</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <p class="pdt7">{{bikeTypeMap[bikeData.bike_type]}}</p>
                    </div>
                </div>
                <div class="form-group wd100">
                    <label for="inputSubject" class="col-sm-3 col-md-3 col-lg-3 control-label">电量</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <p class="pdt7">{{bikeData.total_charge}}</p>
                    </div>
                </div>
                <div class="form-group wd100">
                    <label class="col-sm-3 col-md-3 col-lg-3 control-label">维修次数</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <p class="pdt7">{{bikeData.repair_times}}</p>
                    </div>
                </div>
                <div class="form-group wd100">
                    <label class="col-sm-3 col-md-3 col-lg-3 control-label">运行区域</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <p class="pdt7">{{bikeData.putin_area}}</p>
                    </div>
                </div>
                <div class="clear_both"></div>
            </form>
        </div>
    </modal>
    <div class="page-panel">
        <div class="page-panel-inner">
                <div class="container approval-monitor">
                    <div class="tableNav inc">
                         <div class="useraccountForm">
                             <div class="searchUserForm">
                                <form class="form-inline" id="search-form" onsubmit="return false;">
                                     <div class="form-group wd10 pdr20">
                                        <select class="form-control" name="putin_area" id="area-datas" v-model="selectedArea">
                                            <option v-for="area in areaData" :value="area.id" :key="area.id">{{area.name}}</option>
                                        </select>
                                     </div>
                                     <div class="form-group wd15 pdr20">
                                        <select class="form-control" name="bike_type" style="width: 100%" id="type-datas" v-model="selectedBikeType">
                                            <option v-for="type in bikeTypeData" :value="type.id" :key="type.id">{{type.name}}</option>
                                        </select>
                                     </div>
                                     <div class="form-group wd30 pdr20">
                                        <input  style="width: 100%;" v-model="selectedBikeNo" class="form-control" name="bike_no" type="text"  placeholder="通过订单编号查询关联的电动车" />
                                     </div>
                                     <div class="form-group  wd10">
                                        <button style="width: 100%;" @click="doSearch" type="button" class="color-F7AC36 pull-right btn btn-primary btn-search">查询</button>
                                     </div> 
                                     <div class="clear_both"></div>
                                </form>
                             </div>
                         </div>
                    </div>
                    <div class="blank"></div>
                    <div class="form-hr"></div>
                    <div class="blank"></div>
                    <div id="user-table">
                        <table id="listtable" class="table table-oas table-striped">
                            <thead>
                                <tr data-cache="columnHeaders" class="column-headers">
                                    <th>车辆编号</th>
                                    <th>车辆型号</th>
                                    <th>车辆状态</th>
                                    <th>电量</th>
                                    <th>维修次数</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="loading">
                                    <tr>
                                        <td colspan="7">数据请求中...</td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr v-if="entries.length === 0">
                                        <td colspan="7">暂无数据</td>
                                    </tr>
                                    <tr v-for="entry in entries" :key="entry.id" v-else>
                                        <td>{{entry.bike_no}}</td>
                                        <td>{{bikeTypeMap[entry.bike_type]}}</td>
                                        <td>{{bikeStateMap[entry.bike_state]}}</td>
                                        <td v-if="(entry.total_charge <= 30)" class="dranger-charge">{{entry.total_charge}}%(需充电)</td>
                                        <td v-else>{{entry.total_charge}}%</td>
                                        <td>{{entry.repair_times}}</td>
                                        <td class="manage-action">
                                            <a href="#" class="btn-view" @click="viewVehicle(entry)">查看 |</a>
                                            <template v-if="entry.bike_state === 1 && entry.be_locked === 0">
                                                <a href="#" class="btn-lock" @click="doLock(entry)">锁车 |</a>
                                            </template>
                                            <a href="#" class="btn-modify" @click="doModify(entry)">修改</a>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                    <div class="buttons-action pull-left">
                        <button class="btn mgb10 btn-default color-F7AC36 btn-primary toggle-all" data-do="toggleAll" type="button" @click="selectAll" data-value="true">全选</button>
                        <button class="btn mgb10 btn-default color-F7AC36 btn-primary" @click="doAdd" type="button">添加</button>
                        <button class="btn mgb10 btn-default  btn-danger btn-delete" type="button">删除</button>
                    </div>
                    <div id="listpagination" class="list-pagination">
                        <paginate
                            :page-count="getPageCount"
                            :page-range="3"
                            :margin-pages="2"
                            :click-handler="clickCallback"
                            :prev-text="'<'"
                            :next-text="'>'"
                            :container-class="'pagination ui-pagination-nav'"
                            :page-class="'pagination-item ui-item'">
                        </paginate>
                        <div class="pagination-size-changer ui-pagination-sizechanger">
                            <select class="page-size ui-size" v-model="selectedSize">
                                <option v-for="item in pageSize" :value="item" :key="item.id">{{item}}</option>
                            </select>
                        </div>
                        <div class="pagination-jumper ui-pagination-jumper">跳至 <input type="text" class="page-number ui-page" value="1"> 页 <a class="btn color-F7AC36 btn-primary ui-load">确定</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import {areaDatas, bikeTypeDatas} from '../common/static_data.js';
    import jumpLogin from '../common/jumpLogin.js';
    import Paginate from 'vuejs-paginate';
    import Modal from '../common/Modal.vue';
    import $ from 'jquery';
    import FormData from '../common/FormData.js';
    export default {
        name: 'vehiclemanage',
        data: () => ({
            entries: [],
            loading: true,
            bikeStateMap: {
                0: '删除',
                1: '空闲',
                2: '使用中',
                3: '损坏'
            },
            bikeTypeMap: {
                '01': '小牛电动车'
            },
            areaData: [],
            bikeTypeData: [],
            totalCount: 0,
            pageSize: [2, 10, 20, 40],
            selectedSize: 10,
            selectedBikeType: '',
            selectedBikeNo: '',
            selectedArea: '',
            pageNo: 1,
            showAdd: false,
            showView: false,
            showModify: false,
            bikeData: {}
        }),
        components: {
            Paginate: Paginate,
            modal: Modal
        },
        computed: {
            getPageCount: function() {
                var pageCount = this.totalCount / this.selectedSize;
                pageCount = Math.ceil(pageCount);
                return pageCount;
            }
        },
        methods: {
            areaDatas: areaDatas,
            bikeTypeDatas: bikeTypeDatas,
            jumpLogin: jumpLogin,
            clickCallback: function(pageNum) {
                this.pageNo = pageNum;
                this.fetchData('page');
            },
            doSearch: function() {
                this.fetchData('page');
            },
            fetchData: function(action) {
                let parmas = {
                    pageStar: this.pageNo,
                    pageSize: this.selectedSize,
                    bike_type: this.selectedBikeType,
                    bike_no: this.selectedBikeNo,
                    putin_area: this.selectedArea
                }
                parmas = JSON.stringify(parmas);
                var self = this;
                const url = API_PATH + '/web/bike.action';
                this.loading = true;
                self.$axios.get(url, {
                    params: {
                        action: action,
                        data: parmas
                    }
                }).then(response => {
                    response = response.data;
                    this.loading = false;
                    if (response.errorCode === 0) {
                        self.entries = response.data.rows;
                        self.totalCount = response.data.totalCount;
                    } else if (response.errorCode === 1) {
                        jumpLogin();
                    } else if (response.errorCode === -1) {
                        alert('获取数据失败');
                    }
                });
            },
            getFormDatas: function() {
                this.fetchData('page');
            },
            bikeAction: function(action, datas) {
                var self = this;
                const url = API_PATH + '/web/bike.action';
                self.$axios.post(url, {
                    params: {
                        action: action,
                        data: datas
                    }
                }).then(function(response) {
                    response = response.data;
                    if (response.errorCode === 0) {
                        self.fetchData();
                    } else if (response.errorCode === 1) {
                        jumpLogin();
                    } else if (response.errorCode === -1) {
                        alert('操作失败');
                    }
                });
            },
            doAdd: function() {
                this.showAdd = true;
            },
            cancel: function(event) {
                this.showAdd = false;
                this.showView = false;
                this.showModify = false;
            },
            addBike: function() {
                var data = FormData('#add-form');
                data = JSON.stringify(data);
                this.bikeAction('add', data);
            },
            modifyBike: function() {
                var data = FormData('#modify-form');
                data = JSON.stringify(data);
                this.bikeAction('update', data);
            },
            viewVehicle: function(result) {
                this.showView = true;
                this.bikeData = result;
            },
            viewBike: function() {
                this.showView = false;
            },
            selectAll: function() {
               //  var data = [];
               //  if (this.allSelect) {
               //      data = this.entries.forEach(function(item) {
               //          item.$selected = false;
               //      }); 
               //      this.allSelect = false;
               // }else {
               //      data = this.entries.forEach(function(item) {
               //          item.$selected = true;
               //      });
               //      this.allSelect = true;
               // }
               // this.entries = [];
               // this.entries = data;
            },
            doLock: function(data) {
                var bike_no = data.bike_no;
                var data = {
                    'bike_no': bike_no
                };
                data = JSON.stringify(data);
                const url = API_PATH + '/web/bike.action';
                this.$axios.post(url, {
                    params: {
                        action: 'lock',
                        data: data
                    }
                }).then(function(response) {
                    response = response.data;
                    if (response.errorCode === 0) {
                        self.fetchData();
                    } else if (response.errorCode === 1) {
                        jumpLogin();
                    } else if (response.errorCode === -1) {
                        alert('操作失败');
                    }
                })
            },
            doModify: function(result) {
                this.showModify = true;
                this.bikeData = result;
            }
        },
        mounted: function() {
            this.getFormDatas();
            this.areaDatas();
            this.bikeTypeDatas();
        }
    }
</script>

<style>
    body {
        font-size: 13px;
        font-family: 'Microsoft YaHei';
    }
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
    }
    .pad10 {
        padding: 0 20px;
    }
    .mgb10 {
        margin-bottom: 10px;
    }
    .wd100 {
        width: 100%;
    }
    #listtable {
        border: 1px solid #E4E4E4;
    }
    #listtable .manage-action > a{
        color: #666;
    }
    #listtable thead {
        color: #E4E9F0;
    }
    #listtable .dranger-charge {
        color: red;
    }
    p.pdt7 {
        padding-top: 7px!important;
    }
    .pagination>.disabled>a:focus {
        outline: none;
    }
</style>