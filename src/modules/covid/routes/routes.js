import React from "react";
import { RequiredAuth } from "../../../utils/auth/RequiredAuth";
import { DefaultLayout } from "../../../components/layout/defaultLayout/index";
import { CovidHome } from "../pages/home";
import { ReportByUser } from "../pages/reportByUser";
import { ReportBySite } from "../pages/reportBySite";
import { CovidLineList } from "../pages/lineList";

const routes = () => [
  {
    path: "/:module/covid-home",
    exact: true,
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_covid"]}>
        <CovidHome />
      </RequiredAuth>
    ),
  },
  {
    path: "/:module/report-user",
    exact: true,
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_covid"]}>
        <ReportByUser />
      </RequiredAuth>
    ),
  },
  {
    path: `/:module/report-site`,
    exact: true,
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_covid"]}>
        <ReportBySite />
      </RequiredAuth>
    ),
  },
  {
    path: `/:module/covid-linelist`,
    exact: true,
    layout: DefaultLayout,
    component: () => (
      <RequiredAuth allowedRoles={["monitoring_covid"]}>
        <CovidLineList />
      </RequiredAuth>
    ),
  },
];
export { routes };
