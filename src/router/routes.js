const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "welcome",
        component: () => import("pages/Welcome.vue")
      },
      { path: "login", component: () => import("pages/Login.vue") },
      { path: "signup", component: () => import("pages/Signup.vue") },
      { path: "toDoList", component: () => import("pages/ToDoList.vue") },
      { path: "create", component: () => import("pages/CreateTodo.vue") },
      { path: "edit", component: () => import("pages/EditTodo.vue") },
    ]
  },
];

export default routes;
