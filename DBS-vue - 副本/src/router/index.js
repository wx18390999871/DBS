import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/index',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Index.vue'], resolve)
                },
                {
                    path: '/operatemanage',
                    component: resolve => require(['../components/page/OperateManage.vue'], resolve)
                },
                {
                    path: '/usermanage',
                    component: resolve => require(['../components/page/UserManage.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/vehiclemanage',
                    component: resolve => require(['../components/page/VehicleManage.vue'], resolve)
                },
                {
                    path: '/vehiclemonitor',
                    component: resolve => require(['../components/page/VehicleMonitor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/vehiclerepair',
                    component: resolve => require(['../components/page/VehicleRepair.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/datamanage',
                    component: resolve => require(['../components/page/DataManage.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/permissmanage',
                    component: resolve => require(['../components/page/PermissManage.vue'], resolve)     // Vue-Quill-Editor组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/changePassword',
            component: resolve => require(['../components/page/Change.vue'], resolve)
        }
    ]
})
