import React from "react";
import { RequiredAuth } from "../../../utils/auth/RequiredAuth";
import { DefaultLayout } from "../../../components/layout/defaultLayout/index";
import { MFLHome } from "../pages/home";
import { OrgUnits } from "../pages/orgUnits";
import { APIDocumentation } from "../pages/apiDocumentation";
import { MFLHistory } from "../pages/history";
import { FacilityDetails } from "../pages/details";
import CreateSuggestion from "../pages/suggestion/CreateSuggestion";

const routes = () => [
  {
    path: "/:module/mfl-home",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["mfl_external"]}>
        <MFLHome />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/orgunits",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["mfl_external"]}>
        <OrgUnits />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/api-documentation",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["mfl_external"]}>
        <APIDocumentation />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/mfl-history",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["mfl_external"]}>
        <MFLHistory />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/mfl-details/:id",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["mfl_external"]}>
        <FacilityDetails />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/suggestion/:type",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["mfl_external"]}>
        <CreateSuggestion />
      </RequiredAuth>
    ),
  },
];
export { routes };
