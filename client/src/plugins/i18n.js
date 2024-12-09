import VueI18n from 'vue-i18n'
import Vue from "vue";

import enLocale from './languages/en'
import zhLocale from './languages/zh'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZHLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

ElementLocale.i18n((key, value) => i18n.t(key, value))
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'en',
    messages: {
		'en': {
			...enLocale,
			...elementEnLocale
		},
		'zh': {
			...zhLocale,
			...elementZHLocale
		}
	}
})


export default i18n
