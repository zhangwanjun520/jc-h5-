import Vue from 'vue'
import VueRouter from 'vue-router'
// import Cookies from 'js-cookie'
import {_local} from '../api/storage'
Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
const routes = [

  {
    path: '/login',
    name: 'home',
    component: () => import('../pages/loginReg.vue')
  },
  {
    path: '/info',
    name: 'about',
    component: () => import('../pages/form.vue'),
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/see',
    name: 'about',
    component: () => import('../pages/see.vue'),
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/:id',
    name: 'about',
    component: () => import('../pages/edit.vue'),
    meta:{
      requireAuth:true
    }
  },

  {
    // 兜底路由，匹配不到的路由跳转到首页
    path: '*',
    redirect: '/info',
}
]

const router = new VueRouter({

  routes
})
router.beforeEach((to, from, next) => {
// console.log(to)

  if (to.matched.some(r => r.meta.requireAuth)) {  // 判断该路由是否需要登录权限
    if (_local.get('user')&&_local.get('user') != null ||_local.get('Token')&&_local.get('Token') != null ) {  // 通过vuex state获取当前的token是否存在

      next();
    }
    else {
      next({

        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })

    }
  }
  else {
    next();
  }
});
export default router
