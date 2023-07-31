const routes = [
  {
    path: "/config",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/config-tpl/config-tpl.vue"),
      },
      { path: "test", component: () => import("pages/IndexPage.vue") },
    ],
  },
  {
    path: "/",
    component: () => import("pages/chain-list.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
