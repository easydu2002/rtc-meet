import { theUserStore } from './../store/user';
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from '~/layouts/Home.vue'
import ChatPage from '~/pages/home/chat/Index.vue'
import MeetPage from '~/pages/home/meet/Index.vue'

const routes: Readonly<RouteRecordRaw[]> = [
  
  {
    path: '/',
    name: 'Home',
    redirect: '/chat',
    component: Home,
    children: [
      {
        path: 'chat',
        component: ChatPage
      },
      {
        path: 'meet',
        component: MeetPage
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('~/pages/login/Login.vue')
  }

]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from) => {

  if(!theUserStore.isAuthenticated && to.name !== 'Login') {
    return { name: 'Login' }
  }
})

export default router