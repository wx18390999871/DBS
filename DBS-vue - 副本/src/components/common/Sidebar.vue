<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.id">
                        <template slot="title"><i class="iconfont mgr10" :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.id">
                        <i class="iconfont mgr10" :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'icon-index',
                        index: 'index',
                        title: '首页'
                    },
                    {
                        icon: 'icon-manage',
                        index: 'operatemanage',
                        title: '运营管理'
                    },
                    {
                        icon: 'icon-dingwei',
                        index: 'vehiclemonitor',
                        title: '车辆监控'
                    },
                    {
                        icon: 'icon-manage',
                        index: 'vehiclemanage',
                        title: '车辆管理'
                    },
                    {
                        icon: 'icon-repair',
                        index: 'vehiclerepair',
                        title: '车辆维修'
                    },
                    {
                        icon: 'icon-setting1',
                        index: '3',
                        title: '系统管理',
                        subs: [
                            {
                                index: 'datamanage',
                                title: '数据管理'
                            },
                            {
                                index: 'usermanage',
                                title: '用户管理'
                            },
                            {
                                index: 'permissmanage',
                                title: '权限管理'
                            }
                        ]
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    /* .sidebar{
        display: block;
        position: absolute;
        width: 160px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    } */
    .sidebar > ul {
        height:100%;
    }
    .mgr10 {
        margin-right: 10px;
    }
</style>
