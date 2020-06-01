/* 班课 */
// const ClassContainer = () => import('../views/class/ClassContainer.vue')
// const ClassList = () => import('../views/class/ClassList.vue')
// const Class = () => import('../views/class/Class.vue')
// const ClassUser = () => import('../views/class/ClassUser.vue')
// const ScoreManage = () => import('../views/class/ScoreManage.vue')

/* 系统 */
const SystemContainer = () => import('../views/system/SystemContainer.vue')
const PermissionManage = () => import('../views/system/PermissionManage.vue')
const RoleManage = () => import('../views/system/RoleManage.vue')
const UserManage = () => import('../views/system/UserManage.vue')
const DictionaryManage = () => import('../views/system/DictionaryManage.vue')
const SchoolSetting = () => import('../views/system/SchoolSetting.vue')
const SystemParameterSetting = () => import('../views/system/SystemParameterSetting.vue')


/* 需要权限判断的路由 */
const dynamicRoutes = [
    // //一级菜单
    // {
    //     path: '/class',
    //     name: 'class',
    //     component:ClassContainer,
    //     meta: {
    //         name: '班课',
    //         icon:'',
    //         isMenu:'True',
    //         isPage:'False'
    //     },
    //     children: [
    //         //二级菜单
    //         {
    //             path: 'ClassList',
    //             component: ClassList,
    //             name: 'ClassList',
    //             meta: {
    //                 name: '班课列表',
    //                 icon:'',
    //                 isMenu:'True',
    //                 isPage:'True'
    //             },
    //             children: [
    //                 {
    //                     path: 'Class',
    //                     name: 'Class',
    //                     component: Class,
    //                     meta: {
    //                         name: '班课详情',
    //                         icon:'',
    //                         isMenu:'False',
    //                         isPage:'True'
    //                     },
    //                     children: [
    //                         {
    //                             path: 'ClassUser',
    //                             name: 'ClassUser',
    //                             component: ClassUser,
    //                             meta: {
    //                                 name: '班课成员',
    //                                 icon:'',
    //                                 isMenu:'False',
    //                                 isPage:'True'
    //                             }
    //                         }
                            
    //                     ]
    //                 }
                    
    //             ]
    //         },
    //         //二级菜单
    //         {
    //             path: 'ScoreManage',
    //             component: ScoreManage,
    //             name: 'ScoreManage',
    //             meta: {
    //                 name: '成绩管理',
    //                 icon:'',
    //                 isMenu:'True',
    //                 isPage:'True'
    //             }
                
    //         }
    //     ]
    // },
    //一级菜单
    {
        path: '/system',
        name: 'system',
        component:SystemContainer,
        meta: {
            name: '系统',
            icon:'',
            isMenu:'True',
            isPage:'False'
        },
        children: [
            //二级菜单
            {
                path: 'PermissionManage',
                component: PermissionManage,
                name: 'PermissionManage',
                meta: {
                    name: '权限管理',
                    icon:'',
                    isMenu:'True',
                    isPage:'True'
                }
            },
            //二级菜单
            {
                path: 'RoleManage',
                component: RoleManage,
                name: 'RoleManage',
                meta: {
                    name: '角色管理',
                    icon:'',
                    isMenu:'True',
                    isPage:'True'
                },
                children: [
                ]
            },
            //二级菜单
            {
                path: 'UserManage',
                component: UserManage,
                name: 'UserManage',
                meta: {
                    name: '用户管理',
                    icon:'',
                    isMenu:'True',
                    isPage:'True'
                },
                children: [
                ]
            },
            //二级菜单
            {
                path: 'DictionaryManage',
                component: DictionaryManage,
                name: 'DictionaryManage',
                meta: {
                    name: '字典管理',
                    icon:'',
                    isMenu:'True',
                    isPage:'True'
                },
                children: [
                ]
            },
            //二级菜单
            {
                path: 'SchoolSetting',
                component: SchoolSetting,
                name: 'SchoolSetting',
                meta: {
                    name: '校园管理',
                    icon:'',
                    isMenu:'True',
                    isPage:'True'
                },
                children: [
                ]
            },
            //二级菜单
            {
                path: 'SystemParameterSetting',
                component: SystemParameterSetting,
                name: 'SystemParameterSetting',
                meta: {
                    name: '系统参数设置',
                    icon:'',
                    isMenu:'True',
                    isPage:'True'
                },
                children: [
                ]
            }
        ]
    }
    
]

export default dynamicRoutes




