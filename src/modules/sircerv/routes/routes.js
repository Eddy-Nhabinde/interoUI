import React from "react";
import { RequiredAuth } from "../../../utils/auth/RequiredAuth";
import { DefaultLayout } from "../../../components/layout/defaultLayout/index";
import { SIRCEVHome } from "../pages/home";
import { SIRCEVLineList } from "../pages/lineList";

const routes = () => [
  {
    path: "/:module/sircev-home",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_sircev"]}>
        <SIRCEVHome />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/sircev-linelist",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_sircev"]}>
        <SIRCEVLineList />
      </RequiredAuth>
    ),
  },
];
export { routes };
