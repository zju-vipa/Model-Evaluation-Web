import Vue from 'vue'
import VueRouter from 'vue-router'
import Evaluation from "../views/Evaluation";
import Optimization from "../views/Optimization";
import Market from "../views/Market";
import EvaluationDetail from "../views/Evaluation/EvaluationDetail";
import EvaluationResult from "../views/Evaluation/EvaluationResult";
import Creator from "../views/Evaluation/Creator";
import User from "../views/User";
import Login from "../views/Login";
import Register from "../views/Register";
import Model from "@/components/User/Model";
import Dataset from "@/components/User/Dataset";
import Account from "@/components/User/Account";
import UserOptimization from "@/components/User/Optimization" ;

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Evaluation',
        component: Evaluation,
        meta: {
            isAuthenticated: true
        }
    },
    {
        path: '/evaluation',
        redirect: '/evaluation/creator/more',
    },
    {
        path: '/evaluation/creator/:aspect',
        name: 'Creator',
        component: Creator,
        meta: {
            isAuthenticated: true
        }
    },
    {
        path: '/home/detail/:prop',
        name: 'Detail',
        component: EvaluationDetail,
        meta: {
            isAuthenticated: true
        }
    },
    {
        path: '/evaluation/result/:id',
        name: 'EvaluationResult',
        component: EvaluationResult,
        meta: {
            isAuthenticated: true
        }
    },
    {
        path: '/optimization',
        name: 'Optimization',
        component: Optimization
    },
    {
        path: '/market',
        name: 'Market',
        component: Market
    },

    {
        path: '/user',
        name: 'User',
        component: User,
        meta: {
            isAuthenticated: true
        },
        redirect: '/user/model',
        children: [
            {
                path: 'model',
                component: Model,

            },
            {
                path: 'dataset',
                component: Dataset,
            },
            {
                path: 'opt',
                component: UserOptimization,
            },
            {
                path: 'account',
                component: Account,
            }
        ]
    },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: Login
    // },
    // {
    //     path: '/register',
    //     name: 'Register',
    //     component: Register
    // },

    {
        path: '*',
        redirect: '/home',
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach(async (to, from, next) => {
//     const access_token = localStorage.getItem('access_token');
//     if (to.meta.isAuthenticated && access_token === null)
//         next('/login');
//     else next();
// })

export default router
