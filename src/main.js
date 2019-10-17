// import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
// import 'bootstrap-select/dist/css/bootstrap-select.min.css'
import 'bootstrap-sass/assets/javascripts/bootstrap'

// ESUN customize css
import './style/icon-style.css'
import './style/form.css'
import './style/main.css'
import './style/index.css'
import './style/myStyle.css'
// Vue Components
import Vue from 'vue'
import VueRouter from 'vue-router'
import VuejsDialog from 'vuejs-dialog';

// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import store from './common/store'
import App from './pages/App.vue';
import FormBase from './pages/FormBase.vue'
import TableAction from './pages/TableAction.vue'
import CodeGen from './pages/CodeGen.vue'
import Vuelidate from 'vuelidate'

//blockUI
import './common/jquery.blockUI.js'

// Tell Vue to install the plugin.
const routes = [
  { path: '/codegen', component: CodeGen },
  { path: '/formbase', component: FormBase },
  { path: '/table', component: TableAction }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

//使用驗證
Vue.use(Vuelidate);

//確認視窗
Vue.use(VuejsDialog, {
    okText: '確定',
    cancelText: '取消'
  });

  Vue.config.productionTip = false;

//使用Router
Vue.use(VueRouter);  
new Vue({
    store,
    router,
    el:'#app',
    render:h=>h(App)
});


// $(function(){
//     var hello = () => 'Hello' 
//     console.log(hello())
// })
