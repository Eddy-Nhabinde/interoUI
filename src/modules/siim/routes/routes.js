import React from "react";
import { RequiredAuth } from "../../../utils/auth/RequiredAuth";
import { DefaultLayout } from "../../../components/layout/defaultLayout/index";
import { SimmLineList } from "../pages/lineList";

const routes = () => [
  {
    path: "/:module/siim-home",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_sircev"]}>
        <SimmLineList />
      </RequiredAuth>
    ),
  },
];
export { routes };
