import React from "react";
import { RequiredAuth } from "../../../utils/auth/RequiredAuth";
import { DefaultLayout } from "../../../components/layout/defaultLayout/index";
import { UMMLineList } from "../pages/lineList";
import { UMMRegistration } from "../pages/registration";
import { UMMHome } from "../pages/home";

const routes = () => [
  {
    path: "/:module/umm-home",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_umm"]}>
        <UMMHome />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/umm-linelist",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_umm"]}>
        <UMMLineList />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/user/:action",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_umm"]}>
        <UMMRegistration />
      </RequiredAuth>
    ),
  },
];
export { routes };
