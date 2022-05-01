import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () =>
      import(/* webpackChunkName: "users" */ "../views/Users.vue"),
    children: [
      {
        path: "add",
        name: "AddUser",
        component: () =>
          import(/* webpackChunkName: "add_user" */ "../views/users/Add.vue"),
      },
    ],
  },
  {
    path: "/books",
    name: "Books",
    component: () =>
      import(/* webpackChunkName: "books" */ "../views/Books.vue"),
    children: [
      {
        path: "add",
        name: "AddBook",
        component: () =>
          import(/* webpackChunkName: "add_user" */ "../views/books/Add.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (document.querySelector(to.hash)) {
          return position;
        }
        return false;
      }
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.getters["Users/isAuthenticated"];
  if (to.name == "Login" && isAuthenticated) next({ name: "Home" });
  else if (to.name !== "Login" && !isAuthenticated) {
    next({ name: "Login", query: { next: to.name } });
  } else next();
});

export default router;
