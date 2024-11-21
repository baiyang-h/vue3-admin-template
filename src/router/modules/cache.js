import Layout from '@/layout/index.vue'

export default {
    path: '/cache',
    name: '_Cache',
    redirect: '/cache/index',
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'Cache',
            meta: {
                title: '缓存菜单',
                icon: 'icon-huancunzhongxin'
            },
            component: () => import('@/views/cache/index.vue')
        }
    ]
}
