import { defineStore } from 'pinia'
import router, { constantRoutes } from "@/router"
import {removeToken} from "@/utils/token";
import usePermissionStore from './permission'
import useTagViewStore from './tagView'
import useUserStore from './user'

const useAppStore = defineStore('app', {
  state: () => ({
    // 所有有权限会展示的菜单
    menu: []
  }),
  getters: {},
  actions: {
    SET_MENU(menu) {
      this.menu = menu
    },

    leave() {
      const permission = usePermissionStore()
      const tagView = useTagViewStore()
      const user = useUserStore()
      // 清空 store 上的状态
      this.SET_MENU([])
      permission.SET_ROUTES([])
      tagView.DEL_ALL_CACHED_VIEWS()
      tagView.DEL_ALL_VISITED_VIEWS()
      user.SET_TOKEN(undefined)
      user.SET_ROLES([])
      user.SET_ADMIN({})
      // 删除Cookie中的token
      removeToken()
      // 移除所有路由配置
      const old_routes = router.getRoutes()
      // 获取所有路由信息
      old_routes.forEach(item => {
        const name = item.name; //获取路由名词
        router.removeRoute(name); //移除路由
      })
      // 生成新的路由栈
      constantRoutes.forEach((route) => {
        router.addRoute(route);
      });
    }
  }
})

export default useAppStore
