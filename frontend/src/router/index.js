import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Register from '../components/auth/Register/Register.vue'
import Login from '../components/auth/Login/Login.vue'
import ProfileUser from '../components/users/detail/ProfileUser.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Communities from '../components/communities/Communities.vue'
import Community from '../components/communities/community/Community.vue'
import Users from '../components/users/Users.vue'
import AddUser from '../components/users/detail/add/AddUser.vue'
import Discussions from '../components/discussions/Discussions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/profile/:id',
    name: 'ProfileUser',
    component: ProfileUser,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/users/:id',
    name: 'detailUser',
    component: ProfileUser,
    meta: {
      requiresAuth: true,
      is_admin: true
    }

  },
  {
    path: '/communities',
    name: 'Communities',
    component: Communities,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },
  {
    path: '/addUser',
    name: 'AddUser',
    component: AddUser,
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },
  {
    path: '/community/:id',
    name: 'Community',
    component: Community,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/community/:id/discussions',
    name: 'Discussions',
    component: Discussions,
    meta: {
      requiresAuth: true
    }
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('token') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let role = localStorage.getItem('role')
          if(to.matched.some(record => record.meta.is_admin)) {
              if(role == 'admin'){
                  next()
              }
              else{
                  alert("No tienes permisos");
                  location.href = '/';
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('token') == null){
          next()
      }
      else{
          next({ name: ''})
      }
  }else {
      next()
  }
})

export default router
