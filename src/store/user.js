import {defineStore} from "pinia";
import { getToken, setToken } from '@/utils/token'
import api from '@/api';

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),  // 先从 cookie 中查询
    roles: [],
    admin: {}
  }),
  getters: {},
  actions: {
    SET_TOKEN(token) {
      this.token = token
    },
    SET_ROLES(roles) {
      this.roles = roles
    },
    SET_ADMIN(admin) {
      this.admin = admin
    },

    // 登录 设置token
    async login(user) {
      try {
        // const r = await api.user.request_login(user);
        const r = {
          code: 0,
          data: 'admin-token',  // admin-token, other-token
          message: '获取token成功',
          success: true
        }
        if(r.success) {
          const token = r.data || '';
          this.SET_TOKEN(token)           // 存 store
          setToken(token);                // 存 cookie
        } else {
          return Promise.reject(r)
        }
      } catch (e) {
        return Promise.reject(e)
      }
    },
    // 设置用户信息
    async getInfo(token) {
      try {
        // const r = await api.user.request_getInfo(token);
        const r = {
          code: 20000,
          data: {
            roles: ['admin'],
            introduction: 'I am a super admin',
            name: 'Super Admin'
          },
          message: '获取用户信息成功',
          success: true
        }
        if(r.success) {
          this.SET_ROLES(r.data.roles)
          this.SET_ADMIN(r.data)
          return r.data.roles
        } else {
          return Promise.reject(r)
        }
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }
})

export default useUserStore
