import request, { basePost, baseGet } from '@/utils/request'

// 登录，获取token
export const request_login = data => basePost('/user/login', data);

// 通过获取用户信息
export const request_getInfo = token => baseGet('/user/info', { token });
