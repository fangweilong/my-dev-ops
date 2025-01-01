import { createApp } from 'vue';
import App from './App.vue';
import './assets/global.less';
import components from './components/global';
import Router from './router/index';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.config.productionTip = false

// components
for (const i in components) {
  app.component(i, components[i])
}

//icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(Router).use(ElementPlus).mount('#app')
