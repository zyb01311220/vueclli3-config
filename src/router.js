import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component:()=>import("./views/Home.vue")
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
        component: ()=>import("./views/Table.vue")
    },
    {
        path: "/list",
        name: "list",
        component: ()=>import("./views/List.vue")
    },
      {
          path: "/move",
          name: "move",
          component: ()=>import("./views/Move.vue")
      }
  ]
});
