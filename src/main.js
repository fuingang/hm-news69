import Vue from 'vue'
import App from './App.vue'
import './styles/base.less'
import 'lib-flexible'
import router from './router/index'
import './styles/iconfont.css'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmButton from './components/HmButton.vue'
import HmPost from './components/HmPost.vue'
import {
  Field,
  CellGroup,
  Toast,
  Cell,
  Dialog,
  RadioGroup,
  Radio,
  Uploader,
  List,
  Tab,
  Tabs,
  PullRefresh,
} from 'vant'
import moment from 'moment'
Vue.filter('date', function(value, format = 'YYYY-MM-DD') {
  return moment(value).format(format)
})
Vue.use(Field)
Vue.use(CellGroup)
  .use(PullRefresh)
  .use(Tabs)
  .use(Tab)
  .use(Toast)
  .use(Cell)
  .use(Dialog)
  .use(RadioGroup)
  .use(Radio)
  .use(Uploader)
  .use(List)
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(res => {
  const { message, statusCode } = res.data
  if (statusCode === 401 && message === '用户验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
    this.$router.push('/login')
  }
  return res
})

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-post', HmPost)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
