import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegistrationLayout from '@/layouts/RegistrationLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { setupRouterGuards } from './guard'

const loginRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '',
        component: LoginView,
      },
    ],
  }
]

const registerRoutes: RouteRecordRaw[] = [
  {
    path: '/register',
    component: RegistrationLayout,
    children: [
      {
        path: '',
        name: 'register',
        component: () => import('@/views/auth/registration/RegistrationView.vue')
      },
    ]
  },
]


const organizationRoutes: RouteRecordRaw[] = [
  {
    path: '/organization',
    component: MainLayout,
    children: [
      {
        path: 'animals',
        name: 'orgAnimals',
        component: () => import('@/views/animals/organization/AnimalView.vue'),
        meta: {
          title: 'Животные в приюте'
        }
      },
      {
        path: 'setting',
        name: 'orgSetting',
        component: () => import('@/views/settings/OrganizationView.vue'),
        meta: {
          title: 'Управление аккаунтом'
        }
      },
      {
        path: 'add',
        name: 'addAnimal',
        component: () => import('@/views/animals/organization/AddAnimalView.vue'),
        meta: {
          title: 'Добавить животное'
        }
      },
      {
        path: 'edit/:id',
        name: 'editAnimal',
        component: () => import('@/views/animals/organization/EditAnimalView.vue'),
        meta: {
          title: 'Редактрировать животное'
        }
      },
      {
        path: 'orders',
        name: 'orgOrders',
        component: () => import('@/views/animals/organization/OrdersView.vue'),
        meta: {
          title: 'Заявки на усыновление'
        }
      },
    ]
  },
]

const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: MainLayout,
    // name: 'usrSettings',
    children: [
      {
        path: 'animals',
        name: 'userAnimals',
        component: () => import('@/views/animals/user/OrdersView.vue'),
        meta: {
          title: 'Животные в приюте'
        },
        children: [
          {

            path: ':id',
            name: 'userAnimal',
            component: () => import('@/views/animals/user/AnimalView.vue'),
            // meta: {
              //   title: 'Животные в приюте'
              // },
            }
        ]

      },
      {
        path: 'setting',
        name: 'userSettings',
        component: () => import('@/views/settings/UserView.vue'),
        meta: {
          title: 'Управление аккаунтом'
        }
      },
      // {
      //   path: 'setting',
      //   name: 'userSettings',
      //   component: () => import('@/views/settings/UserView.vue'),
      //   meta: {
      //     title: 'Управление аккаунтом'
      //   }
      // },
    ]
  },
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(''),

  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    ...loginRoutes,
    ...registerRoutes,
    ...organizationRoutes,
    ...userRoutes,

  ],
})

setupRouterGuards(router)

export default router
