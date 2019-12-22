import Vue from 'vue'
import App from './App'


import uniSection from '@/components/uni-section/uni-section.vue'
Vue.component('uniSection',uniSection)
import uniList from '@/components/uni-list/uni-list.vue'
Vue.component('uniList',uniList)
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
Vue.component('uniListItem',uniListItem)


//下面两个是必须的组件
import uniIcons from '@/components/uni-icons/uni-icons.vue'
Vue.component('uniIcons',uniIcons)
import hxNavbar from "@/components/hx-navbar/hx-navbar.vue"
Vue.component('hx-navbar',hxNavbar)
//end


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
