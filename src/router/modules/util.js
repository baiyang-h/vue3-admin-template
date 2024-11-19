import Layout from '@/layout/index.vue'

export default {
    path: '/util',
    name: '_Util',
    redirect: '/util/index',
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'Util',
            meta: {
                title: '工具类',
                icon: 'icon-gongju'
            },
            component: () => import('@/views/util/index.vue')
        }
    ]
}
