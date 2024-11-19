import Layout from '@/layout/index.vue'

export default {
    path: '/table',
    name: '_Table',
    redirect: '/table/index',
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'Table',
            meta: {
                title: 'Table',
                icon: 'icon-biaoge_o'
            },
            component: () => import('@/views/table/index.vue')
        },
    ]
}
