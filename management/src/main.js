import Vue from 'vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import echarts from 'echarts'
import App from './App.vue';

Vue.use(ElementUI);

// Vue.prototype.$echarts = echarts;
// Vue.use(echarts);
Vue.config.productionTip = false;


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')