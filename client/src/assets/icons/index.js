// icons/index.js
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// 封装的svgIon组件

// register globally
Vue.component('svg-icon', SvgIcon)
// 统一批量引入
const req = require.context('./svg', false, /\.svg$/) // ./svg -> svg文件所在路径
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

