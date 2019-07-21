import Vue from 'vue'
import Router from 'vue-router'

import SimpleLiveIndex from "views/index.vue"

Vue.use(Router)

export default new Router({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [{
            path: '/',
            redirect: '/index'
        }, {
            path: '/index',
            component: SimpleLiveIndex
        }, {
            path: '/about',
            component: () => import("views/about.vue")
        }, {
            path: '/life/:type',
            component: () => import('views/life.vue')
        }, {
            path: '/life/:type/:id',
            component: () => import('views/life-detail.vue')
        }, {
            path: '/study/accumulate',
            component: () => import('views/study-accumulate.vue')
        }, {
            path: '/study/simpleProject',
            component: () => import('views/study-simpleProject.vue')
        }, {
            path: '/study/:type/:id',
            component: () => import('views/study-detail.vue')
        },
        // 后台
        {
            path: '/admin/login',
            component: () => import('views/admin/login.vue')
        },
        {
            path: '/admin/index',
            component: () => import('views/admin/index.vue')
        },
        {
            path: '/admin/article',
            component: () => import('views/admin/articles-management.vue')
        }
    ]
})