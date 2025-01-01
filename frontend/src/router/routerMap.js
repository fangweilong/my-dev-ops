/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
  {
    path: '/',
    name: 'Layout',
    redirect: { name: 'LayoutIndex' },
    route:"",
    children: [
      {
        path: '/layout',
        name: 'LayoutIndex',
        component: () => import('@/views/layout/Index.vue')
      },
    ]
  },
  {
    path: '/remote',
    name: 'Remote',
    redirect: { name: 'ManageList' },
    children: [
      {
        path: '/list',
        name: 'ManageList',
        component: () => import('@/views/remote/List.vue')
      },
      {
        path: '/saveOrUpdate',
        name: 'saveOrUpdate',
        component: () => import('@/views/remote/RemoteSaveOrUpdate.vue')
      },
    ]
  },
]

export default constantRouterMap
