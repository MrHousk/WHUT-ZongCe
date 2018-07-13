import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import index from '@/views/index'
import home from '@/views/home'
import login from '@/views/login'

import getAvatar from '@/utils/request'
import {
    MessageBox,
} from 'element-ui'

//账号管理相关
const account = () =>
    import ( /* webpackChunkName: "account" */ '@/views/account/index')
const profile = () =>
    import ( /* webpackChunkName: "profile" */ '@/views/account/profile')
const accountManage = () =>
    import ( /* webpackChunkName: "accountManage" */ '@/views/account/account-manage')

Vue.use(Router)

const routes = [{
    path: '/',
    redirect: {
        name: 'login'
    }
}, {
    path: '/login',
    name: 'login',
    component: login
}, {
    path: '/index',
    name: 'index',
    component: index,
    children: [{
        path: '/home',
        name: 'home',
        component: home
    }, {
        path: '/account/:id',
        component: account,
        meta: {
            requireAuth: true
        },
        children: [{
            path: 'profile',
            name: 'profile',
            component: profile,
        }, {
            path: 'account-manage',
            component: accountManage,
            meta: {
                onlyAdmin: true
            }
        }]
    }, ]
}, {
    path: '*',
    redirect: {
        name: 'login'
    }
}]

const router = new Router({
    routes: routes
})

if (window.localStorage.getItem('account')) {
    store.commit('loginIn', {
        account: window.localStorage.getItem('account'),
        password: window.localStorage.getItem('password'),
        name: window.localStorage.getItem('name')
    });
}

router.beforeEach((to, from, next) => {
    getAvatar();
    if (!store.getters.account) {
        if (to.path == '/login') {
            next();
        } else {
            MessageBox.confirm('请先登录', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                next({
                    path: '/login',
                });
            })
        }
    } else {
        if (to.path == '/login') {
            next('/home');
        } else {
            next();
        }
    }
})


export default router