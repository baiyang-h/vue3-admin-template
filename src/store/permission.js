import {defineStore} from "pinia";
import router, { constantRoutes, appRoutes } from '@/router'
import { filterAsyncRoutes, wrapFormatterMenu, flatRoutes } from '@/utils/method'
import useAppStore from './app'

const usePermissionStore = defineStore('permission', {
  state: () => ({
    // 所有有访问权限的路由
    routes: [],
    // 有权限的应用路由
    appRoutes: [],
    // 拉平有权限的应用路由
    flatAppRoutes: []
  }),
  getters: {},
  actions: {
    SET_ROUTES(appRoutes) {
      // 权限路由
      this.appRoutes = appRoutes;
      // 权限路由+默认显示的路由
      this.routes = constantRoutes.concat(appRoutes);
      // 拉平有权限appRoutes
      this.flatAppRoutes = flatRoutes(appRoutes)
    },

    generateRoutes(roles) {
      let accessedRoutes;
      // 此处可进行权限判断，得到想要的路由。 超级管理员可以得到所有权限，其他登录人员相关有权限的部分可进入
      if(roles.includes('admin')) {
        accessedRoutes = appRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(appRoutes, roles)
      }
      this.SET_ROUTES(accessedRoutes)
      const app = useAppStore()
      app.SET_MENU(wrapFormatterMenu(accessedRoutes, roles))
      //  vur-router api， 4.x版本 去掉了addRoutes 这个api，改用 router.addRoute 了
      /**
       * TODO 因为调用该函数是在当我进入 router.beforeEach 前的时候， 此时 router 其实还没 addRoute 相应的路由。在开发的过程中遇到一个问题
       * 在 addRoute() 之后第一次访问被添加的路由会白屏，这是因为刚刚 addRoutes() 就立刻访问被添加的路由，然而此时 addRoute() 没有执行结束，
       * 因而找不到刚刚被添加的路由导致白屏。因此需要从新访问一次路由才行。
       * 此时就要使用next({...to, replace: true}) 来确保 addRoute() 时动态添加的路由已经被完全加载上去。
       * replace: true 只是一个设置信息，告诉Vue本次操作后，不能通过浏览器后退按钮，返回前一个路由。确保用户在 addRoute() 还没完成的时候，不可以点击浏览器回退按钮。
       */
      accessedRoutes.forEach(route => {
        router.addRoute(route)
      })
      console.log(accessedRoutes, router, router.getRoutes())
    }
  }
})

export default usePermissionStore
