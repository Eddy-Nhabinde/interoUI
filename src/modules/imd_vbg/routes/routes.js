import React from "react";
import { RequiredAuth } from "../../../utils/auth/RequiredAuth";
import { DefaultLayout } from "../../../components/layout/defaultLayout/index";
import { OrgUnits } from "../pages/orgUnits";


const routes = () => [
  {
    path: "/:module/imd-home",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_sircev"]}>
        <OrgUnits />
      </RequiredAuth>
    ),
  },
];
export { routes };
