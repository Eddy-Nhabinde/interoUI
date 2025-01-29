import React from "react";
import { Redirect } from "react-router-dom";
import { RequiredAuth } from "../utils/auth/RequiredAuth";
import { redirect } from "../utils/services/redirect";
import { Home } from "../pages/home";
import { Documentation } from "../pages/documentation";
import { Login } from "../pages/login";
import { UnauthorizedPage } from "../pages/unauthorized";
import UmmApp from "../modules/umm/app/App";
import CovidApp from "../modules/covid/app/App";
import CmamApp from "../modules/cmam/app/App";
import SircevApp from "../modules/sircerv/app/App";
import MflApp from "../modules/mfl/app/App";
import NoSession from "../components/layout/defaultLayout/NoSession";
import { DefaultLayout } from "../components/layout/defaultLayout";
import MflInternalApp from "../modules/mflInternal/app/App";
import SusApp from "../modules/sus/app/App";
import IMDVBGApp from "../modules/imd_vbg/app/App";
import SiimApp from "../modules/siim/app/app";

const routes = () => [
  {
    path: "/",
    exact: true,
    layout: NoSession,
    component: () => <Redirect to={redirect().redirectTo()} />,
  },
  {
    path: "/home",
    layout: DefaultLayout,
    isHomeLayout: true,
    exact: true,
    component: () => (
      <RequiredAuth>
        <Home />
      </RequiredAuth>
    ),
  },
  {
    path: "/documentation",
    layout: DefaultLayout,
    isHomeLayout: true,
    exact: true,
    component: () => (
      <RequiredAuth>
        <Documentation />
      </RequiredAuth>
    ),
  },
  {
    path: "/login",
    layout: NoSession,
    exact: true,
    component: Login,
  },
  {
    path: "/unauthorized",
    layout: NoSession,
    exact: true,
    component: UnauthorizedPage,
  },

  {
    path: "/umm",
    layout: NoSession,
    component: UmmApp,
  },
  {
    path: "/covid",
    layout: NoSession,
    component: CovidApp,
  },
  {
    path: "/cmam",
    layout: NoSession,
    component: CmamApp,
  },
  {
    path: "/sircev",
    layout: NoSession,
    component: SircevApp,
  },
  {
    path: "/mfl",
    layout: NoSession,
    component: MflApp,
  },
  {
    path: "/mfl-internal",
    layout: NoSession,
    component: MflInternalApp,
  },
  {
    path: "/sus",
    layout: NoSession,
    component: SusApp,
  },
  {
    path: "/imd-vbg",
    layout: NoSession,
    component: IMDVBGApp,
  },
  ,
  {
    path: "/siim",
    layout: NoSession,
    component: SiimApp,
  }
];
export { routes };
