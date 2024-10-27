import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("@/pages/Landing.vue"),
  },
  {
    path: "/gamex",
    name: "Gamex",
    component: () => import("@/pages/Gamex.vue"),
  },
  {
    path: "/auth",
    name: "AuthLayout",
    component: () => import("@/Layout/AuthLayout.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/pages/auth/Login.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/pages/auth/Register.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/Layout/DashboardLayout.vue"),
    children: [
      {
        path: "",
        name: "wallet",
        component: () => import("@/pages/dashboard/Wallet.vue")
      },
    ],
  },
];
    
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
