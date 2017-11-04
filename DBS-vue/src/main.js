import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
import "../static/css/style.css";
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import AMap from 'vue-amap';

Vue.use(ElementUI);
Vue.use(AMap);

AMap.initAMapApiLoader({
    key: '95024c5e993ad7296ec2cdce6ee16d51',
    plugin: ['AMap.Geocoder', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    uiVersion: '1.0'
});

Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');