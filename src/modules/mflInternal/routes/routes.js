import React from "react";
import { RequiredAuth } from "../../../utils/auth/RequiredAuth";
import { DefaultLayout } from "../../../components/layout/defaultLayout/index";
import { OrgUnits } from "../pages/orgUnits";
import { Linelist } from "../pages/linearlist";
import { Suggestions } from "../pages/suggestions";
import SuggestionsDetails from "../pages/suggestionsDetails/SuggestionsDetails";
import FacilityDetails from "../../mfl/pages/details/FacilityDetails";

const routes = () => [
  {
    path: "/:module/mfl-internal-home",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["mfl_internal"]}>
        <OrgUnits />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/orgunit-details/:id",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["mfl_internal"]}>
        <FacilityDetails />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/linelist",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["mfl_internal"]}>
        <Linelist />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/suggestions",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["mfl_internal"]}>
        <Suggestions />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/suggestions-details/:id",
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["mfl_internal"]}>
        <SuggestionsDetails />
      </RequiredAuth>
    ),
  },
];
export { routes };
