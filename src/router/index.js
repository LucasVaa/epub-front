import Vue from "vue";
import Router from "vue-router";

const Login = resolve => require(["@/views/Login"], resolve);
const Book = resolve => require(["@/views/Book"], resolve);
const Reader = resolve => require(["@/views/Reader"], resolve);
const Editor = resolve => require(["@/views/Editor"], resolve);
const Error404 = resolve => require(["@/views/error/Error404"], resolve);

Vue.use(Router);

let routes = [
  {
    path: "/",
    component: Login
  },
  {
    path: "/book",
    component: Book,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/books/:id",
    component: Reader,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/editor",
    component: Editor,
    meta: {
      requireAuth: true
    }
  },
  {
    path: "*",
    component: Error404
  }
];

let router = new Router({
  mode: "history",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    };
  }
});

router.beforeEach(async (to, from, next) => {
  console.log(to.path);
  if (to.meta.requireAuth) {
    // 判断跳转的路由是否需要登录
    if (sessionStorage.getItem('isLogin')) {
      next(); // 已登录
    } else {
      next({
        path: "/",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    console.log(to.path);
    next();
  }
});

export default router;
