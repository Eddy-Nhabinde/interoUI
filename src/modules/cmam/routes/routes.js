import React from "react";
import { RequiredAuth } from "../../../utils/auth/RequiredAuth";
import { DefaultLayout } from "../../../components/layout/defaultLayout/index";
import { CMAMHome } from "../pages/home";
import { CMAMLineList } from "../pages/lineList";
import { Products } from "../pages/products";
import { OrgUnits } from "../pages/orgUnits";

const routes = () => [
  {
    path: "/:module/settings",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_cmam"]}>
        <CMAMHome />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/cmam-home",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_cmam"]}>
        <CMAMLineList />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/product",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_cmam"]}>
        <Products />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/orgunit",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_cmam"]}>
        <OrgUnits />
      </RequiredAuth>
    ),
  },
];
export { routes };
