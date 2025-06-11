import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegistrationLayout from '@/layouts/RegistrationLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { setupRouterGuards } from './guard'
import SettingLayout from '@/layouts/SettingLayout.vue'

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

const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/main',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'main',
        component: () => import('@/views/MainView.vue'),
        meta: {
          title: 'Животные в приюте'
        }
      },
    ]
  }
]


const organizationRoutes: RouteRecordRaw[] = [
  {
    path: '/organization',
    component: SettingLayout,
    children: [
      {
        path: 'animals/:id',
        name: 'animal',
        component: () => import('@/views/animals/user/AnimalView.vue'),
        meta: {
          title: 'Информация о животном'
        },
      },
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
        name: 'orgSettings',
        component: () => import('@/views/settings/OrganizationView.vue'),
        meta: {
          title: 'Управление аккаунтом'
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

    ]
  },
]

const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: SettingLayout,
    children: [
      {
        path: 'animals/:id',
        name: 'userAnimal',
        component: () => import('@/views/animals/user/AnimalView.vue'),
        meta: {
          title: 'Информация о животном'
        },
      },
      {
        path: 'requests',
        name: 'userRequests',
        component: () => import('@/views/animals/user/RequestsView.vue'),
        meta: {
          title: 'Мои заявки'
        },
      },
      {
        path: 'setting',
        name: 'userSettings',
        component: () => import('@/views/settings/UserView.vue'),
        meta: {
          title: 'Управление аккаунтом'
        }
      },
     ]
  },
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    ...loginRoutes,
    ...registerRoutes,
    ...mainRoutes,
    ...organizationRoutes,
    ...userRoutes,
  ],
})

setupRouterGuards(router)

export default router
