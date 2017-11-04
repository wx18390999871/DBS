<template>
<div>
    <modal 
        title="修改" 
        :show.sync="showAdd"
        @ok="addAccount"
        @cancel="cancel" 
        okText="确定"
        cancelText="取消"
        okClass="btn btn-default btn-primary"
        cancelClass="btn btn-default"
        >
        <div class="modal-body">
            <form class="form-horizontal" method="post" id="modify-form">
                <div class="form-group wd100">
                    <label for="inputSubject" class="col-sm-3 col-md-3 col-lg-3 control-label">广告语</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <input type="text" value="" class="form-control" id="inputSubject" name="rule_slogan" placeholder="请输入广告语">
                    </div>
                </div>
                <div class="form-group userMobile-group wd100">
                    <label for="inputUser" class="col-sm-3 col-md-3 col-lg-3 control-label">定价说明</label>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                        <textarea rows="4" value="" class="form-control" id="inputSubject" name="detail_image" placeholder="请输入定价说明"></textarea>
                    </div>
                </div>
                <div class="clear_both"></div>
            </form>
        </div>
    </modal>
    <div class="page-panel">
        <div class="page-panel-inner">
                <div class="container approval-monitor">
                    <!-- <div class="tableNav inc">
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
                    </div> -->
                    <!-- <div class="blank"></div>
                    <div class="form-hr"></div>
                    <div class="blank"></div> -->
                    <div id="user-table">
                        <table id="listtable" class="table table-oas table-striped">
                            <thead>
                                <tr data-cache="columnHeaders" class="column-headers">
                                    <th>用户编号</th>
                                    <th>用户名</th>
                                    <th>用户密码</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="loading">
                                    <tr>
                                        <td colspan="11">数据请求中...</td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr v-if="entries.length === 0">
                                        <td colspan="11">暂无数据</td>
                                    </tr>
                                    <tr v-for="entry in entries" :key="entry.id" v-else>
                                        <td>{{entry.user_id}}</td>
                                        <td>{{entry.user_login}}</td>
                                        <td>{{entry.user_name}}</td>    
                                    </tr>
                                </template>
                            </tbody>
                        </table>
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
                            <select class="page-size ui-size" v-model="selectedSize" @change="ChangeSize()">
                                <option v-for="item in pageSize" :value="item" :key="item.id">{{item}}</option>
                            </select>
                        </div>
                        <div class="pagination-jumper ui-pagination-jumper">跳至 <input type="text" class="page-number ui-page" v-model="pageNumber"> 页 <a @click="jumpPage" class="btn color-F7AC36 btn-primary ui-load">确定</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
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
            areaData: [],
            bikeTypeData: [],
            totalCount: 0,
            pageSize: [2, 10, 20, 40],
            selectedSize: 10,
            selectedBikeType: '',
            selectedBikeNo: '',
            selectedArea: '',
            pageNo: 1,
            pageNumber: 1,
            showAdd: false
        }),
        components: {
            Paginate: Paginate,
            modal: Modal
        },
        filters: {
            getPrice: function(value) {
                var val = (value / 100) + '.00';
                return val;
            }
        },
        computed: {
            getPageCount: function() {
                var pageCount = this.totalCount / this.selectedSize;
                pageCount = Math.ceil(pageCount);
                return pageCount;
            }
        },
        methods: {
            jumpLogin: jumpLogin,
            ChangeSize: function() {
                this.fetchData('page');
            },
            jumpPage: function() {
                this.pageNo = this.pageNumber;
                this.fetchData('page');
            },
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
                const url = API_PATH + '/web/account.action';
                self.loading = true;
                self.$axios.get(url, {
                    params: {
                        action: action,
                        data: parmas
                    }
                }).then(response => {
                    response = response.data;
                    self.loading = false;
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
                const url = API_PATH + '/web/account.action';
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
            cancel: function(event) {
                this.showAdd = false;
                this.showView = false;
                this.showModify = false;
            },
            addAccount: function() {

            },
            doModify: function(result) {
                this.showModify = true;
                this.ruleData = result;
            }
        },
        mounted: function() {
            this.getFormDatas();
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