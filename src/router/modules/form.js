import Layout from '@/layout/index.vue'

export default {
    path: '/form',
    name: '_Form',
    redirect: '/form/index',
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'Form',
            meta: {
                title: 'Form',
                icon: 'icon-biaodan'
            },
            component: () => import('@/views/form/index.vue')
        }
    ]
}
