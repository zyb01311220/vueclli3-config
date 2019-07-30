import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Table from "./views/Table.vue";
import List from "./views/List.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
        path: "/table",
        name: "table",
        component: Table
    },
    {
        path: "/list",
        name: "list",
        component: List
    }
  ]
});
