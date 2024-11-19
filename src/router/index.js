import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { wrapFormatterRouter } from "@/utils/method";
import ROUTE_CONFIG from './router.config'

// 首先对 app路由 进行了格式化，格式化你想的结构  ---> 至于后面的权限相关，再下一步格式化
export const constantRoutes = ROUTE_CONFIG.constantRoutes;
export const appRoutes = wrapFormatterRouter(ROUTE_CONFIG.appRoutes); // 此处是需要权限相关展示的路由

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

export default router
