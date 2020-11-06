import Home from "@/views/Home";
export default [
  {
    path: "/",
    hidden: true,
    component: Home
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
    hidden: true
  }
  // {
  //   path: "/dict",
  //   component: Home,
  //   hidden: true,
  //   children: [
  //     {
  //       path: "type/data/:dictId(\\d+)",
  //       component: () => import(""),
  //       name: "Data",
  //       meta: { title: "字典数据", icon: "" }
  //     }
  //   ]
  // }
];
